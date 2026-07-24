import { TextLogIntro } from "@/enums/TextLogIntro";
import { TextConsoleHook } from "@/enums/TextConsoleHook";
import { TextLogHook } from "@/enums/TextLogHook";
import {
    formatString,
    getFoundryVersion,
    getLancerVersion,
    getLocalized,
    getModuleVersion,
    photosensitiveStyling
} from "@/scripts/helpers";
import { trackHook } from "@/scripts/store/hooks";
import type { TextLogEntry } from "@/interfaces/actor/TextLogEntry";

const GLITCHY_CLASS = "horus--subtle";

function escapeHtml(text: string): string
{
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

type Action =
    | { kind: 'type'; text: string; charDelay: number; pos: number; className?: string }
    | { kind: 'pause'; ms: number }
    | { kind: 'break' }
    | { kind: 'append'; html: string };

interface TextWriterOptions
{
    cursor?: boolean;
    cursorChar?: string;
    speed?: number;
}

export class TextWriter
{
    private element: HTMLElement;
    private queue: Action[] = [];
    private running = false;
    private timer: ReturnType<typeof setTimeout> | null = null;
    private committedHTML = '';
    private currentSegment = '';
    private currentSegmentClass: string | undefined;
    private readonly showCursor: boolean;
    private readonly cursorChar: string;
    private readonly defaultSpeed: number;

    constructor(el: HTMLElement, options: TextWriterOptions = {})
    {
        this.element = el;
        this.showCursor = options.cursor ?? false;
        this.cursorChar = options.cursorChar ?? '_';
        this.defaultSpeed = options.speed ?? 25;
    }

    type(text: string, options: { delay?: number; className?: string } = {}): this
    {
        if (options.delay)
            this.queue.push({ kind: 'pause', ms: options.delay });
        this.queue.push({ kind: 'type', text, charDelay: this.defaultSpeed, pos: 0, className: options.className });
        return this;
    }

    break(): this
    {
        this.queue.push({ kind: 'break' });
        return this;
    }

    pause(ms: number): this
    {
        this.queue.push({ kind: 'pause', ms });
        return this;
    }

    start(): void
    {
        if (this.running) return;
        this.running = true;
        this.processNext();
    }

    resetAll(): void
    {
        this.reset('');
    }

    reset(html: string): void
    {
        if (this.timer !== null)
        {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.running = false;
        this.queue = [];
        this.committedHTML = html;
        this.currentSegment = '';
        this.currentSegmentClass = undefined;
        this.render();
    }

    setHTML(html: string): void
    {
        this.committedHTML = html;
        this.currentSegment = '';
        this.currentSegmentClass = undefined;
        this.render();
    }

    // Queued rather than applied immediately, so it can't race with an in-progress typewriter
    // animation (a direct/synchronous commit here would stomp on whatever the queue is mid-typing).
    appendHTML(html: string): this
    {
        this.queue.push({ kind: 'append', html });
        return this;
    }

    private render(): void
    {
        const content = this.committedHTML
            + (this.currentSegment ? `<span${this.classAttr(this.currentSegmentClass)}>${escapeHtml(this.currentSegment)}</span>` : '');
        const cursor = this.showCursor ? `<span class="la-textlog__cursor">${this.cursorChar}</span>` : '';
        this.element.innerHTML = content + cursor;
    }

    private classAttr(className: string | undefined): string
    {
        return className ? ` class="${className}"` : '';
    }

    private processNext(): void
    {
        if (!this.running || this.queue.length === 0)
        {
            this.running = false;
            return;
        }

        const item = this.queue[0];

        switch (item.kind)
        {
            case 'type':
            {
                if (item.text.length === 0)
                {
                    this.queue.shift();
                    this.processNext();
                    break;
                }
                this.currentSegment += item.text[item.pos++];
                this.currentSegmentClass = item.className;
                this.render();
                if (item.pos >= item.text.length)
                    this.queue.shift();
                this.timer = setTimeout(() => this.processNext(), item.charDelay);
                break;
            }

            case 'pause':
            {
                this.queue.shift();
                this.timer = setTimeout(() => this.processNext(), item.ms);
                break;
            }

            case 'break':
            {
                this.queue.shift();
                // Only commit if there's a pending segment to close off. Keeps break() safe to
                // call defensively (e.g. to flush leftover text before a new line) without ever
                // inserting a stray blank line.
                if (this.currentSegment)
                {
                    this.committedHTML += `<span${this.classAttr(this.currentSegmentClass)}>${escapeHtml(this.currentSegment)}</span><br>`;
                    this.currentSegment = '';
                    this.currentSegmentClass = undefined;
                    this.render();
                }
                // Already-committed content that just happens to not end in a break yet (e.g. a
                // persistent-only reset() back to buildFinishedHTML's output) still needs closing
                // off before whatever comes next in the queue.
                else if (this.committedHTML && !this.committedHTML.endsWith('<br>'))
                {
                    this.committedHTML += '<br>';
                    this.render();
                }
                this.processNext();
                break;
            }

            case 'append':
            {
                this.queue.shift();
                // Whatever was mid-typing (e.g. `runIntro`'s last line, which never gets a
                // trailing break()) needs to be closed off before we add anything after it.
                if (this.currentSegment)
                {
                    this.committedHTML += `<span${this.classAttr(this.currentSegmentClass)}>${escapeHtml(this.currentSegment)}</span><br>`;
                    this.currentSegment = '';
                    this.currentSegmentClass = undefined;
                }
                // For already-committed content that just happens to not end in a
                // break yet (e.g. `buildFinishedHTML`'s output).
                if (this.committedHTML && !this.committedHTML.endsWith('<br>'))
                    this.committedHTML += '<br>';
                this.committedHTML += item.html;
                this.render();
                this.processNext();
                break;
            }
        }
    }
}

export class TextConsoleWriter
{
    private writer: TextWriter;
    private hookID: TextConsoleHook;
    private hookResetID: TextConsoleHook;

    constructor(component: HTMLElement, hookID: TextConsoleHook, hookResetID: TextConsoleHook)
    {
        this.writer = new TextWriter(component, { cursor: true, cursorChar: '_', speed: 15 });
        this.hookID = hookID;
        this.hookResetID = hookResetID;
    }

    public registerHooks(uuid: string): void
    {
        // Dynamic, per-instance hook IDs (runtime strings) - outside fvtt-types' typed hook registry.
        //
        // hookID/hookResetID are shared by every open sheet of this type, so the emitted sourceUuid
        // must be checked against this instance's own uuid to avoid reacting to another sheet's event.
        trackHook(uuid, (Hooks.on as any)(this.hookID, (text: string, sourceUuid: string) =>
        {
            if (sourceUuid !== uuid)
                return;
            this.writer.resetAll();
            const lines = text.split(/<br\s*\/?>/i);
            lines.forEach((line, index) =>
            {
                this.writer.type(line);
                if (index < lines.length - 1)
                    this.writer.break();
            });
            this.writer.start();
        }), this.hookID);

        trackHook(uuid, (Hooks.on as any)(this.hookResetID, (sourceUuid: string) =>
        {
            if (sourceUuid !== uuid)
                return;
            this.writer.resetAll();
        }), this.hookResetID);
    }
}

export class TextLogWriter
{
    private writer: TextWriter;
    private hookID: TextLogHook;
    private hookResetID: TextLogHook;
    private introType: TextLogIntro | undefined;

    constructor(component: HTMLElement, hookID: TextLogHook, hookResetID: TextLogHook)
    {
        this.writer = new TextWriter(component, { cursor: false, speed: 25 });
        this.hookID = hookID;
        this.hookResetID = hookResetID;
    }

    public registerHooks(uuid: string): void
    {
        // Dynamic, per-instance hook IDs (runtime strings) - outside fvtt-types' typed hook registry.
        //
        // hookID/hookResetID are shared by every open sheet of this type, so the emitted sourceUuid
        // must be checked against this instance's own uuid to avoid reacting to another sheet's event.
        trackHook(uuid, (Hooks.on as any)(this.hookID, (text: string, sourceUuid: string, glitchy?: boolean) =>
        {
            if (sourceUuid !== uuid)
                return;
            // First break is for flushing, second break is an actual break
            this.writer.break().type(text, { className: glitchy ? photosensitiveStyling(GLITCHY_CLASS) : undefined }).break().start();
        }), this.hookID);

        trackHook(uuid, (Hooks.on as any)(this.hookResetID, (sourceUuid: string, all: boolean = false) =>
        {
            if (sourceUuid !== uuid)
                return;
            if (all)
                this.writer.resetAll();
            else
                this.writer.reset(this.buildFinishedHTML(this.introType!));
        }), this.hookResetID);
    }

    /**
     * Instantly renders entries previously sent via sendToTextLog, so a remounted sheet picks back up where it
     * left off instead of losing everything sent before.
     *
     * Queued via appendHTML rather than committed directly, so it plays after (not on top of) an
     * in-progress runIntro animation instead of corrupting it.
     * @param entries
     */
    public showPersistedEntries(entries: TextLogEntry[]): void
    {
        if (!entries.length)
            return;
        const html = entries.map(entry =>
        {
            const className = entry.glitchy ? photosensitiveStyling(GLITCHY_CLASS) : undefined;
            return `<span${className ? ` class="${className}"` : ''}>${escapeHtml(entry.text)}</span><br>`;
        }).join('');
        this.writer.appendHTML(html).start();
    }

    private getRandomDelay(): number
    {
        return Math.floor(Math.random() * 201);
    }

    private getFormattedText(introType: TextLogIntro): string
    {
        switch (introType)
        {
            case TextLogIntro.Version:
                const template = getLocalized("LA.mech.log.version");
                return formatString(template, getFoundryVersion(), getLancerVersion(), getModuleVersion());
            case TextLogIntro.Header:
                return getLocalized("LA.mech.log.cc.welcome");
        }
        return "";
    }

    public runIntro(introType: TextLogIntro): void
    {
        this.introType = introType;
        switch (introType)
        {
            case TextLogIntro.Header:
                this.writer
                    .type(formatString("COMPANION/CONCIERGE UNIT v{0}", getModuleVersion()))
                    .break()
                    .type("> INITIALIZING / INICIALIZANDO / 初期化中")
                    .type(" . ", { delay: 200 }).type(". ", { delay: 200 }).type(". ", { delay: 200 })
                    .pause(500)
                    .break()
                    .type(">> OMNINET", { delay: this.getRandomDelay() })
                    .pause(this.getRandomDelay())
                    .type(" . ", { delay: this.getRandomDelay() }).type(". ", { delay: this.getRandomDelay() }).type(". ", { delay: this.getRandomDelay() })
                    .type("CONNECTED")
                    .break()
                    .type(">> SYSTEMS", { delay: this.getRandomDelay() })
                    .pause(this.getRandomDelay())
                    .type(" . ", { delay: this.getRandomDelay() }).type(". ", { delay: this.getRandomDelay() }).type(". ", { delay: this.getRandomDelay() })
                    .type("ONLINE")
                    .break()
                    .type(">> WEAPONS", { delay: this.getRandomDelay() })
                    .pause(this.getRandomDelay())
                    .type(" . ", { delay: this.getRandomDelay() }).type(". ", { delay: this.getRandomDelay() }).type(". ", { delay: this.getRandomDelay() })
                    .type("ARMED")
                    .break()
                    .pause(500)
                    .type("INITIALIZATION COMPLETE / INICIALIZAÇÃO CONCLUÍDA / 初期化完了", { delay: 0 })
                    .break()
                    .type(this.getFormattedText(TextLogIntro.Version))
                    .break()
                    .pause(500)
                    .type(this.getFormattedText(introType))
                    .start();
                break;
        }
    }

    public setFinished(introType: TextLogIntro): void
    {
        this.introType = introType;
        this.writer.setHTML(this.buildFinishedHTML(introType));
    }

    private buildFinishedHTML(introType: TextLogIntro): string
    {
        switch (introType)
        {
            case TextLogIntro.Header:
                return [
                    formatString("COMPANION/CONCIERGE UNIT v{0}", getModuleVersion()),
                    "> INITIALIZING / INICIALIZANDO / 初期化中",
                    ">> OMNINET . . . CONNECTED",
                    ">> SYSTEMS . . . ONLINE",
                    ">> WEAPONS . . . ARMED",
                    "INITIALIZATION COMPLETE / INICIALIZAÇÃO CONCLUÍDA / 初期化完了",
                    this.getFormattedText(TextLogIntro.Version),
                    this.getFormattedText(introType),
                ].map(line => `<span>${escapeHtml(line)}</span>`).join('<br>');
        }
        return '';
    }
}