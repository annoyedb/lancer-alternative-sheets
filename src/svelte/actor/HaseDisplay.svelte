<script lang="ts">
    // import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    // import type { PilotSheetProps } from "@/interfaces/pilot/PilotSheetProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { getLocalized } from "@/scripts/helpers";
    import { getActiveTab } from "@/scripts/store/advanced";
    import { FlowClass } from "@/enums/FlowClass";
    import { ActiveTab } from "@/enums/ActiveTab";
    import HexButton from "@/svelte/actor/button/HexButton.svelte";
    import { TooltipDirection } from "@/enums/TooltipDirection";

    const {
        pilot,
        actor,
        system,

        tooltipEnabled,
        tooltipDirection,

        logType,
        logTypeReset,
    }: {pilot?: any; actor: any; system: any} & TooltipProps & TextLogEventProps = $props();
    let active = $derived(getActiveTab(actor.uuid, ActiveTab.Secondary) || "statistics");
    let qualityMode = true; // TODO: change this to a setting
</script>

<!-- HASE Stats -->
{#if actor.type === "pilot" || pilot && pilot.system.active_mech?.value.uuid === actor.uuid}
<div class="la-hasegroup -positionabsolute -widthnone
        {active === "statistics" ? "" : "-displaynone"}"
>
    <div class="la-hase la-combine-v -justifybetween -heightnone">
        <div class="la-combine-h -aligncenter">
            <HexButton
                text={getLocalized("LA.grit.short")}
                value={system.grit}
                
                tooltipEnabled={tooltipEnabled}
                tooltip={getLocalized("LA.grit.tooltip")}
                tooltipDirection={tooltipDirection || TooltipDirection.LEFT}
                logText={getLocalized("LA.grit.tooltip")}
                logType={logType}
                logTypeReset={logTypeReset}

                uuid={actor.uuid}
                flowClass={FlowClass.RollStat}
                path={"system.grit"}
                sign={true}
                
                outerStyle={["-grit"]}
                innerStyle={["la-text-header", "-positionabsolute", "-divider", "-thickness1", "la-anim-header"]}
                buttonStyle={["-widthfull", "-heightfull", "-positionabsolute", "-glow-primary-hover"]}
                outerTextStyle={["-widthfull", "-textaligncenter"]}
                innerTextStyle={["-fontsize4", "-lineheight11", `${qualityMode ? "la-pulse-glow-color la-anim-header" : "-glow-header"}`]}
            />
        </div>
        <div class="la-combine-h -aligncenter">
            <HexButton
                text={getLocalized("LA.agility.short")}
                value={system.agi}

                tooltipEnabled={tooltipEnabled}
                tooltip={getLocalized("LA.agility.tooltip")}
                tooltipDirection={tooltipDirection || TooltipDirection.LEFT}
                logText={getLocalized("LA.agility.tooltip")}
                logType={logType}
                logTypeReset={logTypeReset}

                uuid={actor.uuid}
                flowClass={FlowClass.RollHASE}
                path={"system.agi"}

                outerStyle={["-agi"]}
                innerStyle={["la-text-header", "-positionabsolute", "-divider", "-thickness1", "la-anim-header"]}
                buttonStyle={["-widthfull", "-heightfull", "-positionabsolute", "-glow-primary-hover"]}
                outerTextStyle={["-widthfull", "-textaligncenter"]}
                innerTextStyle={["-fontsize3", "-lineheight10", `${qualityMode ? "la-pulse-glow-color la-anim-header" : "-glow-header"}`]}
            />
            <HexButton
                text={getLocalized("LA.hull.short")}
                value={system.hull}

                tooltipEnabled={tooltipEnabled}
                tooltip={getLocalized("LA.hull.tooltip")}
                tooltipDirection={tooltipDirection || TooltipDirection.LEFT}
                logText={getLocalized("LA.hull.tooltip")}
                logType={logType}
                logTypeReset={logTypeReset}

                uuid={actor.uuid}
                flowClass={FlowClass.RollHASE}
                path={"system.hull"}

                outerStyle={["-hull"]}
                innerStyle={["la-text-header", "-positionabsolute", "-divider", "-thickness1", "la-anim-header"]}
                buttonStyle={["-widthfull", "-heightfull", "-positionabsolute", "-glow-primary-hover"]}
                outerTextStyle={["-widthfull", "-textaligncenter"]}
                innerTextStyle={["-fontsize3", "-lineheight10", `${qualityMode ? "la-pulse-glow-color la-anim-header" : "-glow-header"}`]}
            />
        </div>
        <div class="la-combine-h -aligncenter">
            <HexButton
                text={getLocalized("LA.systems.short")}
                value={system.sys}

                tooltipEnabled={tooltipEnabled}
                tooltip={getLocalized("LA.systems.tooltip")}
                tooltipDirection={tooltipDirection || TooltipDirection.LEFT}
                logText={getLocalized("LA.systems.tooltip")}
                logType={logType}
                logTypeReset={logTypeReset}

                uuid={actor.uuid}
                flowClass={FlowClass.RollHASE}
                path={"system.sys"}

                outerStyle={["-sys"]}
                innerStyle={["la-text-header", "-positionabsolute", "-divider", "-thickness1", "la-anim-header"]}
                buttonStyle={["-widthfull", "-heightfull", "-positionabsolute", "-glow-primary-hover"]}
                outerTextStyle={["-widthfull", "-textaligncenter"]}
                innerTextStyle={["-fontsize3", "-lineheight10", `${qualityMode ? "la-pulse-glow-color la-anim-header" : "-glow-header"}`]}
            />
        </div>
        <div class="la-combine-h -aligncenter">
            <div class="-eng -pointerdisable">&nbsp;</div>
            <HexButton
                text={getLocalized("LA.engineering.short")}
                value={system.eng}

                tooltipEnabled={tooltipEnabled}
                tooltip={getLocalized("LA.engineering.tooltip")}
                tooltipDirection={tooltipDirection || TooltipDirection.LEFT}
                logText={getLocalized("LA.engineering.tooltip")}
                logType={logType}
                logTypeReset={logTypeReset}

                uuid={actor.uuid}
                flowClass={FlowClass.RollHASE}
                path={"system.eng"}

                outerStyle={["-eng"]}
                innerStyle={["la-text-header", "-positionabsolute", "-divider", "-thickness1", "la-anim-header"]}
                buttonStyle={["-widthfull", "-heightfull", "-positionabsolute", "-glow-primary-hover"]}
                outerTextStyle={["-widthfull", "-textaligncenter"]}
                innerTextStyle={["-fontsize3", "-lineheight10", `${qualityMode ? "la-pulse-glow-color la-anim-header" : "-glow-header"}`]}
            />
        </div>
    </div>
</div>
{/if}