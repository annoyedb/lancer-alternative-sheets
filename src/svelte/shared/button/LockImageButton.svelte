<script lang="ts">
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized, handleToggleImageSync, isValidVideoContainer } from "@/scripts/helpers";
    import { getTokenImageLock } from "@/scripts/store/advanced";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";

    type LockImageButtonProps = {
        actor: any; 
        style: string; 
        setState: (uuid: string, value: boolean) => void;
    }

    const {
        actor,
        style,
        setState,

        tooltipEnabled,
        tooltipDirection,

        logging,
    } : LockImageButtonProps & TooltipProps & TextLogEventProps = $props();

    const isVideo = $derived(isValidVideoContainer(actor.prototypeToken?.texture.src));
    const tokenImageLocked = $derived(getTokenImageLock(actor.uuid));
    const theme = $derived(getCSSDocumentTheme(actor.uuid));
</script>

{#if tokenImageLocked}
    {#if isVideo}    
        <GlyphButton
            flowClass={FlowClass.None}
            style={["mdi mdi-link-variant-remove", style]}
            onClick={event => handleToggleImageSync(event, actor, setState)}
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={theme}
            tooltip={getLocalized("LA.advanced.link.error")}
            tooltipDirection={tooltipDirection || TooltipDirection.UP}
            logText={getLocalized("LA.advanced.link.error")}
            logging={logging}
        />
    {:else}
        <GlyphButton
            flowClass={FlowClass.None}
            style={["mdi mdi-link-variant", style]}
            onClick={event => handleToggleImageSync(event, actor, setState)}
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={theme}
            tooltip={getLocalized("LA.advanced.link.tooltip")}
            tooltipDirection={tooltipDirection || TooltipDirection.UP}
            logText={getLocalized("LA.advanced.link.tooltip")}
            logging={logging}
        />
    {/if}
{:else}
    <GlyphButton
        flowClass={FlowClass.None}
        style={["mdi mdi-link-variant-off", style]}
        onClick={event => handleToggleImageSync(event, actor, setState)}
        tooltipEnabled={tooltipEnabled}
        tooltipTheme={theme}
        tooltip={getLocalized("LA.advanced.unlink.tooltip")}
        tooltipDirection={tooltipDirection || TooltipDirection.UP}
        logText={getLocalized("LA.advanced.unlink.tooltip")}
        logging={logging}
    />
{/if}