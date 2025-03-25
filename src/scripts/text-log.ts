// This is for logging strings to the TypeIt text logs, not actual logging
import Typed from "typed.js";
import TypeIt from "typeit";
import { TextLogIntro } from "@/enums/TextLogIntro";
import { TextLogHook } from "@/enums/TextLogHook";
import { formatString, getFoundryVersion, getLancerVersion, getLocalized, getModuleVersion } from "@/scripts/helpers";

export function setupTyped(component: HTMLElement, hookID: string, hookResetID: string)
{
    let typed: Typed | null = null;
    let garbage: Typed | null = null;
    const typedOptions = {
        typeSpeed: 0,
        backSpeed: 0,
        showCursor: true,
        cursorChar: "_",
        loop: false,
    }

    function registerHooks()
    {
        // TODO: see sendToLog/resetLog
        Hooks.on(hookID, (text: string) => 
        {
            typed?.destroy();
            typed = new Typed(component, {
                strings: [text],
                ...typedOptions
            });
        });
        Hooks.on(hookResetID, () => 
        {
            garbage = typed;
            typed = new Typed(component, {
                strings: [""],
                ...typedOptions
            });
            garbage?.destroy(); // Typed.js does not do well cleaning up after itself
        });
    }

    return registerHooks;
}

export function setupTypeIt(component: HTMLElement )
{
    // Setup TypeIt
    return new TypeIt(component!, {
        speed: 25,
        lifeLike: false,
        cursor: false,
    });
}

function getRandomDelay()
{
    return Math.floor(Math.random() * 201);
}

function getFormattedText(introType: TextLogIntro)
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

export function runIntro(instance: TypeIt, introType: TextLogIntro)
{
    switch (introType)
    {
        case TextLogIntro.Header:
            instance
                .type(formatString("COMPANION/CONCIERGE UNIT v{0}", getModuleVersion()))
                .break()
                .type("> INITIALIZING / INICIALIZANDO / 初期化中")
                .type(" . ", {delay: 200}).type(". ", {delay: 200}).type(". ", {delay: 200})
                .pause(500)
                .break()
                .type(">> OMNINET", {delay: getRandomDelay()})
                .pause(getRandomDelay())
                .type(" . ", {delay: getRandomDelay()}).type(". ", {delay: getRandomDelay()}).type(". ", {delay: getRandomDelay()})
                .type("CONNECTED")
                .break()
                .type(">> SYSTEMS", {delay: getRandomDelay()})
                .pause(getRandomDelay())
                .type(" . ", {delay: getRandomDelay()}).type(". ", {delay: getRandomDelay()}).type(". ", {delay: getRandomDelay()})
                .type("ONLINE")
                .break()
                .type(">> WEAPONS", {delay: getRandomDelay()})
                .pause(getRandomDelay())
                .type(" . ", {delay: getRandomDelay()}).type(". ", {delay: getRandomDelay()}).type(". ", {delay: getRandomDelay()})
                .type("ARMED")
                .break()
                .pause(500)
                .type("INITIALIZATION COMPLETE / INICIALIZAÇÃO CONCLUÍDA / 初期化完了", {delay: 0})
                .break()
                .type(getFormattedText(TextLogIntro.Version))
                .break()
                .pause(500)
                .type(getFormattedText(introType))
                .go();
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