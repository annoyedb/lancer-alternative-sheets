<script lang="ts">
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized, handleToggleImageSync, isValidVideoContainer } from "@/scripts/helpers";
    import { getTokenImageLock } from "@/scripts/store/advanced";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import GlyphButton from "@/svelte/actor/button/GlyphButton.svelte";

    const {
        actor,
        style,
        setState,

        tooltipEnabled,
        tooltipDirection,

        logType,
        logTypeReset,
    } : {actor: any; style: string; setState: (uuid: string, value: boolean) => void;} & TooltipProps & TextLogEventProps = $props();
    let tokenImageLocked = $derived(getTokenImageLock(actor.uuid));
    
    const isVideo = isValidVideoContainer(actor.prototypeToken?.texture.src);
</script>

{#if tokenImageLocked}
    {#if isVideo}    
        <GlyphButton
            flowClass={FlowClass.None}
            style={["mdi mdi-link-variant-remove", style]}
            onClick={event => handleToggleImageSync(event, actor, setState)}
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            tooltip={getLocalized("LA.advanced.link.error")}
            tooltipDirection={tooltipDirection || TooltipDirection.UP}
            logText={getLocalized("LA.advanced.link.error")}
            logType={logType}
            logTypeReset={logTypeReset}
        />
    {:else}
        <GlyphButton
            flowClass={FlowClass.None}
            style={["mdi mdi-link-variant", style]}
            onClick={event => handleToggleImageSync(event, actor, setState)}
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            tooltip={getLocalized("LA.advanced.link.tooltip")}
            tooltipDirection={tooltipDirection || TooltipDirection.UP}
            logText={getLocalized("LA.advanced.link.tooltip")}
            logType={logType}
            logTypeReset={logTypeReset}
        />
    {/if}
{:else}
    <GlyphButton
        flowClass={FlowClass.None}
        style={["mdi mdi-link-variant-off", style]}
        onClick={event => handleToggleImageSync(event, actor, setState)}
        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltip={getLocalized("LA.advanced.unlink.tooltip")}
        tooltipDirection={tooltipDirection || TooltipDirection.UP}
        logText={getLocalized("LA.advanced.unlink.tooltip")}
        logType={logType}
        logTypeReset={logTypeReset}
    />
{/if}