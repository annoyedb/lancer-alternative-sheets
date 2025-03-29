<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import HexButton from "@/svelte/actor/button/HexButton.svelte";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { activeTabs } from "@/scripts/advanced";
    import { ActiveTab } from "@/enums/ActiveTab";

    const {
        pilot,
        actor,
        system,
    }: MechSheetProps = $props();
    const active = $derived($activeTabs[actor.uuid]?.active[ActiveTab.Secondary] || "statistics")
    
    $effect(() => {
        console.log(active);
    });
</script>

<!-- HASE Stats -->
{#if pilot && pilot.system.active_mech.value.uuid === actor.uuid}
<div class="la-hasegroup -positionabsolute -widthnone
        {active === "statistics" ? "la-combine-v" : "-displaynone"}"
>
    <div class="la-hase -heightnone">
        <HexButton
            text={getLocalized("LA.grit.short")}
            value={system.grit}
            
            tooltip={getLocalized("LA.grit.tooltip")}
            logText={getLocalized("LA.grit.tooltip")}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}

            uuid={actor.uuid}
            flowClass={FlowClass.RollStat}
            path={"system.grit"}
            sign={true}
            
            outerStyle={["-positionrelative", "-grit", "-fontsize13", "-bold", "-right2"]}
            innerStyle={["-positionabsolute", "-widthfull", "-left0", "-top5", "-divider", "-thickness1", "la-anim-header"]}
            buttonStyle={["-width7", "-height6", "-glow-primary-hover"]}
            outerTextStyle={["-lineheight0", "la-text-header", "la-text-header", "-width7", "-textaligncenter"]}
            innerTextStyle={["-glow-header", "la-text-header", "-fontsize4"]}
        />
        <HexButton
            text={getLocalized("LA.hull.short")}
            value={system.hull}

            tooltip={getLocalized("LA.hull.tooltip")}
            logText={getLocalized("LA.hull.tooltip")}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}

            uuid={actor.uuid}
            flowClass={FlowClass.RollHASE}
            path={"system.hull"}

            outerStyle={["-positionrelative", "-hull", "-fontsize11", "-bold"]}
            innerStyle={["-positionabsolute", "-left0", "-top4", "-width10", "-divider", "-thickness1", "la-anim-header"]}
            buttonStyle={["-width7", "-height6", "-glow-primary-hover"]}
            outerTextStyle={["-positionabsolute", "la-text-header", "-width6", "-textaligncenter"]}
            innerTextStyle={["-glow-header", "-fontsize4", "la-text-header", "-lineheight9"]}
        />
        <HexButton
            text={getLocalized("LA.systems.short")}
            value={system.sys}

            tooltip={getLocalized("LA.systems.tooltip")}
            logText={getLocalized("LA.systems.tooltip")}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}

            uuid={actor.uuid}
            flowClass={FlowClass.RollHASE}
            path={"system.sys"}

            outerStyle={["-positionrelative", "-systems", "-fontsize11", "-bold"]}
            innerStyle={["-positionabsolute", "-left0", "-top4", "-width10", "-divider", "-thickness1", "la-anim-header"]}
            buttonStyle={["-width7", "-height6", "-glow-primary-hover"]}
            outerTextStyle={["-positionabsolute", "la-text-header", "-width6", "-textaligncenter"]}
            innerTextStyle={["-glow-header", "-fontsize4", "la-text-header", "-lineheight9"]}
        />
        <HexButton
            text={getLocalized("LA.engineering.short")}
            value={system.eng}

            tooltip={getLocalized("LA.engineering.tooltip")}
            logText={getLocalized("LA.engineering.tooltip")}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}

            uuid={actor.uuid}
            flowClass={FlowClass.RollHASE}
            path={"system.eng"}

            outerStyle={["-positionrelative", "-engineering", "-fontsize11", "-bold"]}
            innerStyle={["-positionabsolute", "-left0", "-top4", "-width10", "-divider", "-thickness1", "la-anim-header"]}
            buttonStyle={["-width7", "-height6", "-glow-primary-hover"]}
            outerTextStyle={["-positionabsolute", "la-text-header", "-width6", "-textaligncenter"]}
            innerTextStyle={["-glow-header", "-fontsize4", "la-text-header", "-lineheight9"]}
        />
        <HexButton
            text={getLocalized("LA.agility.short")}
            value={system.agi}

            tooltip={getLocalized("LA.agility.tooltip")}
            logText={getLocalized("LA.agility.tooltip")}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}

            uuid={actor.uuid}
            flowClass={FlowClass.RollHASE}
            path={"system.agi"}

            outerStyle={["-positionrelative", "-agility", "-fontsize11", "-bold"]}
            innerStyle={["-positionabsolute", "-left0", "-top4", "-width10", "-divider", "-thickness1", "la-anim-header"]}
            buttonStyle={["-width7", "-height6", "-glow-primary-hover"]}
            outerTextStyle={["-positionabsolute", "la-text-header", "-width6", "-textaligncenter"]}
            innerTextStyle={["-glow-header", "-fontsize4", "la-text-header", "-lineheight9"]}
        />
    </div>
</div>
{/if}