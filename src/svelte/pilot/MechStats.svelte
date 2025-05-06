<script lang="ts">
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { getLocalized } from "@/scripts/helpers";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import StatComboShort from "@/svelte/actor/StatComboShort.svelte";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";

    const {
        actor,
        selectedMech,
    } = $props();

    const tooltipEnabled = getPilotSheetTooltipEnabled();
    const collID = `${actor.uuid}.mechStats`;
</script>

<HeaderMain
    text={getLocalized("LA.tab.statistics.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-weapon"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-transparent", "la-bckg-card", "clipped-bot-alt"]}

    collapseID={collID}
    startCollapsed={true}
>
<div class="la-combine-v -widthfull clipped-bot-alt">
    <div class="la-combine-h -justifyevenly -widthfull lancer-bckg-darken-1 -padding0-tb">
        <StatComboShort
            icon={"cci cci-role-defender -alignselfcenter"}
            label={getLocalized("LA.armor.short")}
            value={selectedMech.system.armor}
            outerStyle={["la-text-text", "-fontsize5"]}
            innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}
    
            tooltipEnabled={tooltipEnabled}
            tooltip={getLocalized("LA.armor.tooltip")}
            tooltipDirection={TooltipDirection.LEFT}
        />
        <StatComboShort
            icon={"cci cci-evasion -alignselfcenter"}
            label={getLocalized("LA.evasion.short")}
            value={selectedMech.system.evasion}
            outerStyle={["la-text-text", "-fontsize5"]}
            innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}
    
            tooltipEnabled={tooltipEnabled}
            tooltip={getLocalized("LA.evasion.tooltip")}
            tooltipDirection={TooltipDirection.LEFT}
        />
        <StatComboShort
            icon={"cci cci-edef -alignselfcenter"}
            label={getLocalized("LA.edefense.short")}
            value={selectedMech.system.edef}
            outerStyle={["la-text-text", "-fontsize5"]}
            innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}
    
            tooltipEnabled={tooltipEnabled}
            tooltip={getLocalized("LA.edefense.tooltip")}
            tooltipDirection={TooltipDirection.LEFT}
        />
    </div>
    <div class="la-combine-h -justifyevenly -widthfull -padding1-tb -fontsize1 -bold">
        <StatComboShort
            icon={"mdi mdi-heart-flash -alignselfcenter"}
            label={getLocalized("LA.hitpoint.short")}
            value={selectedMech.system.hp.max}
            outerStyle={["la-text-text", "-fontsize4"]}
            innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}
    
            tooltipEnabled={tooltipEnabled}
            tooltip={getLocalized("LA.hitpoint.tooltip")}
            tooltipDirection={TooltipDirection.LEFT}
        />
        <StatComboShort
            icon={"cci cci-structure -alignselfcenter"}
            label={getLocalized("LA.structure.label")}
            value={selectedMech.system.structure.max}
            outerStyle={["la-text-text", "-fontsize5"]}
            innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}
    
            tooltipEnabled={tooltipEnabled}
            tooltip={getLocalized("LA.structure.tooltip")}
            tooltipDirection={TooltipDirection.LEFT}
        />
        <StatComboShort
            icon={"cci cci-heat -alignselfcenter"}
            label={getLocalized("LA.heat.label")}
            value={selectedMech.system.heat.max}
            outerStyle={["la-text-text", "-fontsize5"]}
            innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}
    
            tooltipEnabled={tooltipEnabled}
            tooltip={getLocalized("LA.heat.tooltip")}
            tooltipDirection={TooltipDirection.LEFT}
        />
        <StatComboShort
            icon={"cci cci-reactor -alignselfcenter"}
            label={getLocalized("LA.stress.label")}
            value={selectedMech.system.stress.max}
            outerStyle={["la-text-text", "-fontsize5"]}
            innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}
    
            tooltipEnabled={tooltipEnabled}
            tooltip={getLocalized("LA.stress.tooltip")}
            tooltipDirection={TooltipDirection.LEFT}
        />
    </div>
    <div class="la-combine-h -justifyevenly -widthfull lancer-bckg-darken-1 -padding0-tb">
        <StatComboShort
            icon={"cci cci-tech-full -alignselfcenter"}
            label={getLocalized("LA.tattack.short")}
            value={selectedMech.system.tech_attack}
            outerStyle={["la-text-text", "-fontsize5"]}
            innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

            tooltipEnabled={tooltipEnabled}
            tooltip={getLocalized("LA.tattack.tooltip")}
            tooltipDirection={TooltipDirection.LEFT}
        />
        <StatComboShort
            icon={"cci cci-save -alignselfcenter"}
            label={getLocalized("LA.save.short")}
            value={selectedMech.system.save}
            outerStyle={["la-text-text", "-fontsize5"]}
            innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

            tooltipEnabled={tooltipEnabled}
            tooltip={getLocalized("LA.save.tooltip")}
            tooltipDirection={TooltipDirection.LEFT}
        />
        <StatComboShort
            icon={"cci cci-sensor -alignselfcenter"}
            label={getLocalized("LA.sensor.short")}
            value={selectedMech.system.sensor_range}
            outerStyle={["la-text-text", "-fontsize5"]}
            innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

            tooltipEnabled={tooltipEnabled}
            tooltip={getLocalized("LA.sensor.tooltip")}
            tooltipDirection={TooltipDirection.LEFT}
        />
    </div>
</div>
</HeaderMain>