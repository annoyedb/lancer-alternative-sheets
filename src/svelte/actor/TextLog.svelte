<script lang="ts">
    import { onMount } from "svelte";
    import { getMechSheetLogHeaderEnabled } from "@/scripts/mech/settings";
    import { TypeItWriter, TypedWriter } from "@/scripts/text-log.js";
    import type { TextLogProps } from "@/interfaces/actor/TextLogProps";

    const props = $props();
    const {
        style,
        introType,
        hookID,
        hookResetID,
    }: TextLogProps = props;
    let typeItComponent: HTMLElement | null = $state(null);
    let typedComponent: HTMLElement | null = $state(null);
    let enabled = getMechSheetLogHeaderEnabled();
    let typedWriter: TypedWriter | null = null;
    let typeItWriter: TypeItWriter | null = null;

    onMount(() => 
    {
        if (!enabled)
            return;
        // Setup Typed
        typedWriter = new TypedWriter(typedComponent!, hookID, hookResetID);
        typedWriter.registerHooks();
        typeItWriter = new TypeItWriter(typeItComponent!);
        typeItWriter.runIntro(introType);
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