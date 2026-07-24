import { TextLogIntro } from "@/enums/TextLogIntro";
import { TextConsoleHook } from "@/enums/TextConsoleHook";
import {
    formatString,
    getFoundryVersion,
    getLancerVersion,
    getLocalized,
    getModuleVersion
} from "@/scripts/helpers";
import { trackHook } from "@/scripts/store/hooks";

function escapeHtml(text: string): string
{
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

type Action =
    | { kind: 'type'; text: string; charDelay: number; pos: number }
    | { kind: 'pause'; ms: number }
    | { kind: 'break' };

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

    type(text: string, options: { delay?: number } = {}): this
    {
        if (options.delay)
            this.queue.push({ kind: 'pause', ms: options.delay });
        this.queue.push({ kind: 'type', text, charDelay: this.defaultSpeed, pos: 0 });
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

    reset(): void
    {
        if (this.timer !== null)
        {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.running = false;
        this.queue = [];
        this.committedHTML = '';
        this.currentSegment = '';
        this.render();
    }

    setHTML(html: string): void
    {
        this.committedHTML = html;
        this.currentSegment = '';
        this.render();
    }

    private render(): void
    {
        const content = this.committedHTML
            + (this.currentSegment ? `<span>${escapeHtml(this.currentSegment)}</span>` : '');
        const cursor = this.showCursor ? `<span class="la-textlog__cursor">${this.cursorChar}</span>` : '';
        this.element.innerHTML = content + cursor;
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
                this.currentSegment += item.text[item.pos++];
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
                this.committedHTML += this.currentSegment
                    ? `<span>${escapeHtml(this.currentSegment)}</span><br>`
                    : '<br>';
                this.currentSegment = '';
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
        // hookID/hookResetID are shared by every open sheet of this type, so the emitted sourceUuid
        // must be checked against this instance's own uuid to avoid reacting to another sheet's event.
        trackHook(uuid, (Hooks.on as any)(this.hookID, (text: string, sourceUuid: string) =>
        {
            if (sourceUuid !== uuid)
                return;
            this.writer.reset();
            this.writer.type(text).start();
        }), this.hookID);

        trackHook(uuid, (Hooks.on as any)(this.hookResetID, (sourceUuid: string) =>
        {
            if (sourceUuid !== uuid)
                return;
            this.writer.reset();
        }), this.hookResetID);
    }
}

export class TextLogWriter
{
    private writer: TextWriter;

    constructor(component: HTMLElement)
    {
        this.writer = new TextWriter(component, { cursor: false, speed: 25 });
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