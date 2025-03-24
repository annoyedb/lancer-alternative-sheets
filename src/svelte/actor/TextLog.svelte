<script lang="ts">
    import { onMount } from "svelte";
    import { getMechSheetLogHeaderEnabled } from "@/scripts/settings/mech-sheet";
    import { runIntro, setupTyped, setupTypeIt } from "@/scripts/text-log.js";

    const props = $props();
    const {
        style,
        introType,
        hookID,
        hookResetID,
    } = props;
    let typeItComponent: HTMLElement | null = $state(null);
    let typedComponent: HTMLElement | null = $state(null);
    let enabled = getMechSheetLogHeaderEnabled();

    onMount(() => 
    {
        if (!enabled)
            return;
        // Setup Typed
        const registerHooks = setupTyped(typedComponent!, hookID, hookResetID);
        registerHooks();
        runIntro(setupTypeIt(typeItComponent!), introType);
    });
</script>

{#if enabled}
<div class="la-textlog la-combine-h -justifystart {style?.join(' ')}">
    <div class="la-combine-v -gap1 la-textlog-left -aligncontentend -overflowhidden -width2">
        <div class="la-textlog__ruler -flex1 -widthfull"></div>
        <div class="la-textlog-left__current -widthfull"></div>
    </div>
    <div class="la-combine-v la-textlog-left -justifyend -overflowhidden">
        <div
            class="la-textlog__typeit -flex1 -justifystart -aligncontentend -widthfull"
            bind:this={typeItComponent}
        ></div>
        <div class="la-textlog__typed la-combine-h -flex0 -justifystart -widthfull">
            >//:&nbsp;
            <div
                class=""
                bind:this={typedComponent}
            >&nbsp;</div>
        </div>
    </div>
    <div class="la-combine-v -gap1 la-textlog-right -aligncontentend -overflowhidden -width2">
        <div class="la-textlog__ruler -flex1 -widthfull"></div>
        <div class="la-textlog-right__current -widthfull"></div>
    </div>
</div>
{/if}