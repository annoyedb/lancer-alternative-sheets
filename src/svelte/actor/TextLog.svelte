<script lang="ts">
    import TypeIt from "typeit";
    import { onMount } from "svelte";
    import { TextLogIntro } from "@/enums/TextLogIntro";
    import { formatString, getFoundryVersion, getLancerVersion, getLocalized } from "@/scripts/helpers";
    import { getMechSheetLogHeader } from "@/scripts/settings/mech-sheet";

    const props = $props();
    const {
        style,
        speed,
        introType,
        hookID,
    } = props;
    let enabled = getMechSheetLogHeader();
    let typeIt: any = null;
    let currentBufferLength = 0;

    onMount(() => 
    {
        if (!enabled)
            return;
        typeIt = new TypeIt(`#${hookID}`, 
        {
            speed: speed || 25,
            cursor: true,
            nextStringDelay: speed || 25,
            waitUntilVisible: true,
        });
        typeIt
            .type("<--- COMPANION/CONCIERGE UNIT INITIALIZING --->")
            .break()
            .type("OMNINET", {delay: getRandomDelay()}).type(".", {delay: getRandomDelay()}).type(".", {delay: getRandomDelay()}).type(".", {delay: getRandomDelay()}).type("CONNECTED")
            .break()
            .type("SYSTEMS", {delay: getRandomDelay()}).type(".", {delay: getRandomDelay()}).type(".", {delay: getRandomDelay()}).type(".", {delay: getRandomDelay()}).type("ONLINE")
            .break()
            .type("WEAPONS", {delay: getRandomDelay()}).type(".", {delay: getRandomDelay()}).type(".", {delay: getRandomDelay()}).type(".", {delay: getRandomDelay()}).type("ARMED")
            .break()
            .type("<---------- INITIALIZATION COMPLETE ---------->")
            .break()
            .pause(500)
            .type(getIntro(TextLogIntro.Version))
            .break()
            .pause(500)
            .type(getIntro(introType))
            .break()
            .go();
        Hooks.on(hookID, (text: string) => 
        {
            type(text);
        });
    });

    function getRandomDelay()
    {
        return Math.floor(Math.random() * 151);
    }
    
    function type(text: string)
    {
        console.log("Typing");
        if (!typeIt)
        {
            console.error("Lancer Alternative Sheets: TypeIt not initialized.");
            return;
        }
        currentBufferLength = text.length
        typeIt
            .delete("br")
            .type(text)
            .go();
    }

    function getIntro(introType: TextLogIntro | any)
    {
        console.log("Getting intro");
        switch (introType)
        {
            case TextLogIntro.Version:
                const template = getLocalized("LA.mech.log.version");
                return formatString(template, getFoundryVersion(), getLancerVersion());
            case TextLogIntro.Header:
                return getLocalized("LA.mech.log.cc.welcome");
        }

        return "";
    }
</script>

{#if enabled}
<div class="la-textlog la-combine-h {style?.join(' ')}">
    <div class="la-combine-v -gap1 la-textlog-left -aligncontentend -overflowhidden -width2">
        <div class="la-textlog__ruler -flex1 -widthfull"></div>
        <div class="la-textlog-left__current -widthfull"></div>
    </div>
    <div id={hookID} class="la-textlog__content -aligncontentend -widthfull">
    </div>
    <div class="la-combine-v -gap1 la-textlog-right -aligncontentend -overflowhidden -width2">
        <div class="la-textlog__ruler -flex1 -widthfull"></div>
        <div class="la-textlog-right__current -widthfull"></div>
    </div>
</div>
{/if}