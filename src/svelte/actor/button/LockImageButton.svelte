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
            style={["mdi mdi-lock-alert", style]}
            onClick={event => handleToggleImageSync(event, actor, setState)}
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            tooltip={getLocalized("LA.advanced.lock.error")}
            tooltipDirection={tooltipDirection || TooltipDirection.UP}
            logText={getLocalized("LA.advanced.lock.error")}
            logType={logType}
            logTypeReset={logTypeReset}
        />
    {:else}
        <GlyphButton
            flowClass={FlowClass.None}
            style={["mdi mdi-lock", style]}
            onClick={event => handleToggleImageSync(event, actor, setState)}
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            tooltip={getLocalized("LA.advanced.lock.tooltip")}
            tooltipDirection={tooltipDirection || TooltipDirection.UP}
            logText={getLocalized("LA.advanced.lock.tooltip")}
            logType={logType}
            logTypeReset={logTypeReset}
        />
    {/if}
{:else}
    <GlyphButton
        flowClass={FlowClass.None}
        style={["mdi mdi-lock-off", style]}
        onClick={event => handleToggleImageSync(event, actor, setState)}
        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltip={getLocalized("LA.advanced.unlock.tooltip")}
        tooltipDirection={tooltipDirection || TooltipDirection.UP}
        logText={getLocalized("LA.advanced.unlock.tooltip")}
        logType={logType}
        logTypeReset={logTypeReset}
    />
{/if}