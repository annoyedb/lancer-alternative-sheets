// This is for logging strings to the TypeIt text logs, not actual logging
import Typed from "typed.js";
import TypeIt from "typeit";
import { TextLogIntro } from "@/enums/TextLogIntro";
import { TextLogHook } from "@/enums/TextLogHook";
import { formatString, getFoundryVersion, getLancerVersion, getLocalized, getModuleVersion } from "@/scripts/helpers";
import { trackHook } from "@/scripts/hooks";
import { writable } from "svelte/store";

export const introRun = writable<{
    [key: string]: {
        enabled: boolean,
    }
}>({});

export function setIntroRun(uuid: string, enabled: boolean)
{
    introRun.update(states =>
    {
        if (!states[uuid])
            states[uuid] = { enabled };
        else
            states[uuid].enabled = enabled;
        return states;
    });
    sessionStorage.setItem(`la-advanced-${uuid}`, enabled.toString());
}

export class TypedWriter
{
    private typed: Typed | null = null;
    private garbage: Typed | null = null;
    private component: HTMLElement;
    private hookID: TextLogHook;
    private hookResetID: TextLogHook;
    private typedOptions = {
        typeSpeed: 0,
        backSpeed: 0,
        showCursor: true,
        cursorChar: "_",
        loop: false,
    };

    constructor(component: HTMLElement, hookID: TextLogHook, hookResetID: TextLogHook)
    {
        this.component = component;
        this.hookID = hookID;
        this.hookResetID = hookResetID;
    }

    public registerHooks()
    {
        trackHook(Hooks.on(this.hookID, (text: string) =>
        {
            this.typed?.destroy();
            this.typed = new Typed(this.component, {
                strings: [text],
                ...this.typedOptions,
            });
        }), this.hookID);

        trackHook(Hooks.on(this.hookResetID, () =>
        {
            this.garbage = this.typed;
            this.typed = new Typed(this.component, {
                strings: [""],
                ...this.typedOptions,
            });
            this.garbage?.destroy(); // Typed.js does not do well cleaning up after itself
        }), this.hookResetID);
    }
}

export class TypeItWriter
{
    private instance: TypeIt;

    constructor(component: HTMLElement)
    {
        this.instance = new TypeIt(component, {
            speed: 25,
            lifeLike: false,
            cursor: false,
        });
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
                this.instance
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
                    .go();
        }
    }

    public getFinishedIntro(introType: TextLogIntro): string
    {
        switch (introType)
        {
            case TextLogIntro.Header:
                return `
                    <span>${formatString("COMPANION/CONCIERGE UNIT v{0}", getModuleVersion())}</span><br>
                    <span>> INITIALIZING / INICIALIZANDO / 初期化中</span><br>
                    <span>>> OMNINET . . . CONNECTED</span><br>
                    <span>>> SYSTEMS . . . ONLINE</span><br>
                    <span>>> WEAPONS . . . ARMED</span><br>
                    <span>INITIALIZATION COMPLETE / INICIALIZAÇÃO CONCLUÍDA / 初期化完了</span><br>
                    <span>${this.getFormattedText(TextLogIntro.Version)}</span><br>
                    <span>${this.getFormattedText(introType)}</span>
                `;
        }
        return '';
    }
}


export function sendToLog(event: PointerEvent, logText: string, type: TextLogHook)
{
    // TODO: from the event get the sheet's UUID and check the caller against the owner uuid
    event.stopPropagation();
    Hooks.call(type, logText);
}

export function resetLog(event: PointerEvent, type: TextLogHook)
{
    // TODO: from the event get the sheet's UUID and check the caller against the owner uuid
    event.stopPropagation();
    Hooks.call(type);
}