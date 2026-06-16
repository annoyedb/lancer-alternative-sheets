<script lang="ts">
    // This is effectively only used in `MacroDropBox.svelte`
    import { FlowClass } from "@/enums/FlowClass";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized } from "@/scripts/helpers";
    import FlowButton from "@/svelte/shared/button/FlowButton.svelte";

    interface SkillTriggerButtonProps
    {
        item: any;
        buttonStyle: Array<string>;
        buttonTextStyle: Array<string>;
    }

    const {
        item,
        buttonStyle,
        buttonTextStyle,

        tooltipEnabled,
        tooltipTheme,
        logType,
        logTypeReset,
    } : SkillTriggerButtonProps & TooltipProps & TextLogEventProps = $props();
</script>

<div class="la-skilltrigger la-flexrow -justifyend -widthfull">
    <FlowButton
        style={[...(buttonStyle || [])]}
        textStyle={[...(buttonTextStyle || [])]}
        text={item.name}
        flowClass={FlowClass.Skill}
        uuid={item.uuid}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={tooltipTheme}
        tooltipHeader={getLocalized("LA.pilot.skillTrigger.label")}
        tooltip={item.system.description}
        logText={item.system.description}
        logType={logType}
        logTypeReset={logTypeReset}
    />
    <span class="la-skilltrigger__span -bordersround-rtb -small la-brdr-secondary la-bckg-darken-2">
        <span class="la-skilltrigger__inner -bordersround-rtb -small la-brdr-darken-2 la-text-text -fontsize4 -fontface-stylized -textaligncenter -overflowhidden -padding0-lr">
        {#if item.system.curr_rank !== 0}
            {item.system.curr_rank > 0 ? `+${item.system.curr_rank * 2}` : `-${item.system.curr_rank * 2}`}
        {:else}
            &nbsp;0
        {/if}
        </span>
    </span>
</div>