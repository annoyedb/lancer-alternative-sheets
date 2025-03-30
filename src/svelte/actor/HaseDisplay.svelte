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
    const active = $derived($activeTabs[actor.uuid]?.active[ActiveTab.Secondary] || "statistics");
</script>

<!-- HASE Stats -->
{#if pilot && pilot.system.active_mech.value.uuid === actor.uuid}
<div class="la-hasegroup -positionabsolute -widthnone
        {active === "statistics" ? "" : "-displaynone"}"
>
    <div class="la-hase la-combine-v -justifybetween -heightnone">
        <div class="la-combine-h -aligncenter">
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
                
                outerStyle={["-grit"]}
                innerStyle={["la-text-header", "-positionabsolute", "-divider", "-thickness1", "la-anim-header"]}
                buttonStyle={["-widthfull", "-heightfull", "-positionabsolute", "-glow-primary-hover"]}
                outerTextStyle={["-widthfull", "-textaligncenter"]}
                innerTextStyle={["-fontsize4", "-lineheight11", "-glow-header"]}
            />
        </div>
        <div class="la-combine-h -aligncenter">
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

                outerStyle={["-agi"]}
                innerStyle={["la-text-header", "-positionabsolute", "-divider", "-thickness1", "la-anim-header"]}
                buttonStyle={["-widthfull", "-heightfull", "-positionabsolute", "-glow-primary-hover"]}
                outerTextStyle={["-widthfull", "-textaligncenter"]}
                innerTextStyle={["-fontsize3", "-lineheight10", "-glow-header"]}
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

                outerStyle={["-hull"]}
                innerStyle={["la-text-header", "-positionabsolute", "-divider", "-thickness1", "la-anim-header"]}
                buttonStyle={["-widthfull", "-heightfull", "-positionabsolute", "-glow-primary-hover"]}
                outerTextStyle={["-widthfull", "-textaligncenter"]}
                innerTextStyle={["-fontsize3", "-lineheight10", "-glow-header"]}
            />
        </div>
        <div class="la-combine-h -aligncenter">
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

                outerStyle={["-sys"]}
                innerStyle={["la-text-header", "-positionabsolute", "-divider", "-thickness1", "la-anim-header"]}
                buttonStyle={["-widthfull", "-heightfull", "-positionabsolute", "-glow-primary-hover"]}
                outerTextStyle={["-widthfull", "-textaligncenter"]}
                innerTextStyle={["-fontsize3", "-lineheight10", "-glow-header"]}
            />
        </div>
        <div class="la-combine-h -aligncenter">
            <div class="-eng -pointerdisable">&nbsp;</div>
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

                outerStyle={["-eng"]}
                innerStyle={["la-text-header", "-positionabsolute", "-divider", "-thickness1", "la-anim-header"]}
                buttonStyle={["-widthfull", "-heightfull", "-positionabsolute", "-glow-primary-hover"]}
                outerTextStyle={["-widthfull", "-textaligncenter"]}
                innerTextStyle={["-fontsize3", "-lineheight10", "-glow-header"]}
            />
        </div>
    </div>
</div>
{/if}