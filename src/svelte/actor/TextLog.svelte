<script lang="ts">
    import { onMount } from "svelte";
    import { getMechSheetLogHeaderEnabled } from "@/scripts/mech/settings";
    import { TypeItWriter, TypedWriter, setIntroRun } from "@/scripts/store/text-log.js";
    import type { TextLogProps } from "@/interfaces/actor/TextLogProps";

    const props = $props();
    const {
        style,
        runIntro,
        introType,
        uuid,
        hookID,
        hookResetID,
    }: TextLogProps = props;
    let typeItComponent: HTMLElement | null = $state(null);
    let typedComponent: HTMLElement | null = $state(null);
    let typedWriter: TypedWriter | null = null;
    let typeItWriter: TypeItWriter | null = null;

    const enabled = getMechSheetLogHeaderEnabled();

    onMount(() => 
    {
        if (!enabled)
            return;
        // Setup Typed
        typedWriter = new TypedWriter(typedComponent!, hookID, hookResetID);
        typedWriter.registerHooks(uuid);
        typeItWriter = new TypeItWriter(typeItComponent!);
        if (runIntro)
        {
            typeItWriter.runIntro(introType);
            setIntroRun(uuid, true);
        }
        else
        {
            typeItComponent!.innerHTML = typeItWriter.getFinishedIntro(introType);
        }
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