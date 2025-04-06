<script lang="ts">
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { getLocalized } from "@/scripts/helpers";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import HexButton from "@/svelte/actor/button/HexButton.svelte";

    const {
        actor,
        system,
    }: NPCSheetProps = $props();
</script>

<!-- Floating HASE -->
<div class="la-haseposition -positionrelative">
    <div class="la-hasegroup -positionabsolute -widthnone">
        <div class="la-hase la-combine-v -justifybetween -heightnone">
            <div class="la-combine-h -aligncenter">
                <HexButton
                    text={getLocalized("LA.hull.short")}
                    value={system.hull}

                    tooltip={getLocalized("LA.hull.tooltip")}
                    logText={getLocalized("LA.hull.tooltip")}
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}

                    uuid={actor.uuid}
                    flowClass={FlowClass.RollStat}
                    path={"system.hull"}

                    outerStyle={["-hull"]}
                    innerStyle={["la-text-header", "-positionabsolute", "-divider", "-thickness1", "la-anim-header"]}
                    buttonStyle={["-widthfull", "-heightfull", "-positionabsolute", "-glow-primary-hover"]}
                    outerTextStyle={["-widthfull", "-textaligncenter"]}
                    innerTextStyle={["-fontsize3", "-lineheight10", "-glow-header"]}
                />
            </div>
            <div class="la-combine-h -aligncenter -pointerdisable">
                <div class="-agi">&nbsp;</div>
                <HexButton
                    text={getLocalized("LA.agility.short")}
                    value={system.agi}

                    tooltip={getLocalized("LA.agility.tooltip")}
                    logText={getLocalized("LA.agility.tooltip")}
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}

                    uuid={actor.uuid}
                    flowClass={FlowClass.RollStat}
                    path={"system.agi"}

                    outerStyle={["-agi"]}
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
                    flowClass={FlowClass.RollStat}
                    path={"system.sys"}

                    outerStyle={["-sys"]}
                    innerStyle={["la-text-header", "-positionabsolute", "-divider", "-thickness1", "la-anim-header"]}
                    buttonStyle={["-widthfull", "-heightfull", "-positionabsolute", "-glow-primary-hover"]}
                    outerTextStyle={["-widthfull", "-textaligncenter"]}
                    innerTextStyle={["-fontsize3", "-lineheight10", "-glow-header"]}
                />
            </div>
            <div class="la-combine-h -aligncenter -pointerdisable">
                <div class="-eng">&nbsp;</div>
                <HexButton
                    text={getLocalized("LA.engineering.short")}
                    value={system.eng}

                    tooltip={getLocalized("LA.engineering.tooltip")}
                    logText={getLocalized("LA.engineering.tooltip")}
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}

                    uuid={actor.uuid}
                    flowClass={FlowClass.RollStat}
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
</div>