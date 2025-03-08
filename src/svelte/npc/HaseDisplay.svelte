<script lang="ts">
    import { FlowClass } from "@/enums/FlowClass";
    import HexButton from "@/svelte/actor/button/HexButton.svelte";
    import { getLocalized } from "@/scripts/helpers";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";

    const {
        actor,
        system,
    }: NPCSheetProps = $props();
</script>

<!-- Floating HASE -->
<div class="la-hasegroup la-combine-v -width2 -height0">
    <div class="la-hase">
        <HexButton
            text={getLocalized("LA.hull.short")}
            value={system.hull}
            tooltip={getLocalized("LA.hull.tooltip")}

            uuid={actor.uuid}
            flowClass={FlowClass.RollStat}
            path={"system.hull"}

            outerStyle={["-positionrelative", "-hull", "-fontsize10"]}
            innerStyle={["-positionabsolute", "-widthfull", "-left0", "-top5"]}
            buttonStyle={["-width5", "-height5", "-glow-primary-hover"]}
            outerTextStyle={["-lineheight1", "-positionabsolute", "la-text-header"]}
            innerTextStyle={["-glow-header", "-fontsize3", "la-text-header"]}
        />
    </div>
    <div class="la-hase">
        <HexButton
            text={getLocalized("LA.agility.short")}
            value={system.agi}
            tooltip={getLocalized("LA.agility.tooltip")}

            uuid={actor.uuid}
            flowClass={FlowClass.RollStat}
            path={"system.agi"}

            outerStyle={["-positionrelative", "-agility", "-fontsize10"]}
            innerStyle={["-positionabsolute", "-widthfull", "-left0", "-top5"]}
            buttonStyle={["-width5", "-height5", "-glow-primary-hover"]}
            outerTextStyle={["-lineheight1", "-positionabsolute", "la-text-header"]}
            innerTextStyle={["-glow-header", "-fontsize3", "la-text-header"]}
        />
    </div>
    <div class="la-hase">
        <HexButton
            text={getLocalized("LA.systems.short")}
            value={system.sys}
            tooltip={getLocalized("LA.systems.tooltip")}

            uuid={actor.uuid}
            flowClass={FlowClass.RollStat}
            path={"system.sys"}

            outerStyle={["-positionrelative", "-systems", "-fontsize10"]}
            innerStyle={["-positionabsolute", "-widthfull", "-left0", "-top5"]}
            buttonStyle={["-width5", "-height5", "-glow-primary-hover"]}
            outerTextStyle={["-lineheight1", "-positionabsolute", "la-text-header"]}
            innerTextStyle={["-glow-header", "-fontsize3", "la-text-header"]}
        />
    </div>
    <div class="la-hase">
        <HexButton
            text={getLocalized("LA.engineering.short")}
            value={system.eng}
            tooltip={getLocalized("LA.engineering.tooltip")}

            uuid={actor.uuid}
            flowClass={FlowClass.RollStat}
            path={"system.eng"}
            
            outerStyle={["-positionrelative", "-engineering", "-fontsize10"]}
            innerStyle={["-positionabsolute", "-widthfull", "-left0", "-top5"]}
            buttonStyle={["-width5", "-height5", "-glow-primary-hover"]}
            outerTextStyle={["-lineheight1", "-positionabsolute", "la-text-header"]}
            innerTextStyle={["-glow-header", "-fontsize3", "la-text-header"]}
        />
    </div>
</div>