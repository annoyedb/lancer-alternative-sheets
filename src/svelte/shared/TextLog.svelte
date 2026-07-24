<!--TODO: translations and add API functionality-->
<script lang="ts">
    import { onMount } from "svelte";
    import { getMechSheetLogHeaderEnabled } from "@/scripts/mech/settings";
    import { setIntroRun } from "@/scripts/store/text-log.js";
    import { TextLogWriter, TextConsoleWriter } from "@/scripts/text-writer.js";
    import type { TextLogProps } from "@/interfaces/actor/TextLogProps";

    const props = $props();
    const {
        style,
        runIntro,
        introType,
        uuid,
        hookID,
        hookResetID,
    }: TextLogProps = $derived(props);
    let consoleComponent: HTMLElement | null = $state(null);
    let logComponent: HTMLElement | null = $state(null);
    let consoleWriter: TextConsoleWriter | null = null;
    let logWriter: TextLogWriter | null = null;

    const enabled = getMechSheetLogHeaderEnabled();

    onMount(() => 
    {
        if (!enabled)
            return;
        // Setup Typed
        consoleWriter = new TextConsoleWriter(consoleComponent!, hookID, hookResetID);
        consoleWriter.registerHooks(uuid);
        logWriter = new TextLogWriter(logComponent!);
        if (runIntro)
        {
            logWriter.runIntro(introType);
            setIntroRun(uuid, true);
        }
        else
        {
            logWriter.setFinished(introType);
        }
    });
</script>

{#if enabled}
<div class="la-textlog la-flexrow -justifystart {style?.join(' ')}">
    <div class="la-flexcol -gap1 la-textlog-left -aligncontentend -overflowhidden -width4">
        <div class="la-textlog__ruler -flex1 -widthfull {introType ? '' : '-visibilityhidden'}"></div>
        <div class="la-textlog-left__current -widthfull"></div>
    </div>
    <div class="la-flexcol la-textlog-left -justifyend -overflowhidden">
        <div
            class="la-textlog__log -flex1 -justifystart -aligncontentend -widthfull"
            bind:this={logComponent}
        ></div>
        <div class="la-textlog__console la-flexrow -flex0 -justifystart -widthfull">
            >//:&nbsp;
            <div
                class=""
                bind:this={consoleComponent}
            >&nbsp;</div>
        </div>
    </div>
    <div class="la-flexcol -gap1 la-textlog-right -aligncontentend -overflowhidden -width4">
        <div class="la-textlog__ruler -flex1 -widthfull {introType ? '' : '-visibilityhidden'}"></div>
        <div class="la-textlog-right__current -widthfull"></div>
    </div>
</div>
{/if}