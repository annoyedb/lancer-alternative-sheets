<script lang="ts">
    import { FlowClass } from "@/enums/FlowClass";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized } from "@/scripts/helpers";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";

    const {
        item,

        tooltipEnabled,
        logType,
        logTypeReset,
    } : {item : any} & TooltipProps & TextLogEventProps = $props();
</script>

<div class="la-skilltrigger la-combine-h -justifyend">
    <FlowButton
        text={item.name}
        flowClass={FlowClass.Skill}
        uuid={item.uuid}

        tooltipEnabled={tooltipEnabled}
        tooltip={item.system.description}
        tooltipHeader={getLocalized("LA.pilot.skillTrigger.label")}
        logText={item.system.description}
        logType={logType}
        logTypeReset={logTypeReset}
    />
    <span class="la-skilltrigger__span -bordersround-rtb -small la-brdr-secondary lancer-bckg-darken-2">
        <div class="la-skilltrigger__inner -bordersround-rtb -small lancer-brdr-darken-2 la-text-text -fontsize2 -textaligncenter -overflowhidden -height3">
        {#if item.system.curr_rank !== 0}
            {item.system.curr_rank > 0 ? `+${item.system.curr_rank * 2}` : `${item.system.curr_rank * 2}`}
        {:else}
            0
        {/if}
        </div>
    </span>
</div>