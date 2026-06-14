<script lang="ts">
    import type { TemplateProps } from "@/interfaces/npc/TemplateProps";
    import { getLocalized } from "@/scripts/helpers";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { getExtraEffectsEnabled } from "@/scripts/settings";
    import { CLICKABLE_HOVER } from "@/svelte/shared/button/Button.svelte";

    const {
        uuid,
        name,
        path,
        editOption,

        tooltipEnabled,
        tooltipHeader,
        tooltip,
        tooltipDirection,
        tooltipClass,
        tooltipTheme,
    }: TemplateProps & TooltipProps = $props();

    const qualityMode = getExtraEffectsEnabled();
    const tip = $derived(TooltipFactory.buildTooltip(tooltip || getLocalized("LA.flow.tooltip"), tooltipHeader));
</script>

<div class="
        click-open ref set"
    data-uuid={uuid}
>
    <span class="-upper -fontsize4">{name}</span>
    <button type="button" 
        class="mdi mdi-pencil -fontsize3 -positionabsolute
            {editOption ? '' : '-displaynone'}
            {qualityMode ? CLICKABLE_HOVER() : ''}
            lancer-context-menu"
        data-path={path}
        data-tooltip={tooltipEnabled ? tip : undefined }
        data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
        data-tooltip-direction={tooltipDirection || 'DOWN'}

        aria-label={getLocalized("LA.edit.label")}
    ></button>
</div>