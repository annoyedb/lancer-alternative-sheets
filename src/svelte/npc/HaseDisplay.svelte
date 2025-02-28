<script lang="ts">
    import { FlowClass } from "@/enums/FlowClass";
    import HexButton from "@/svelte/actor/HexButton.svelte";
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
            name={getLocalized("LA.hull.short")}
            value={system.hull}
            tooltip={getLocalized("LA.hull.tooltip")}
            uuid={actor.uuid}
            flowClass={FlowClass.Roll}
            dataPath={"system.hull"}
            style={["-positionrelative", "-hull", "-fontsize10", "-bold"]}
            innerStyle={["-positionabsolute", "-left0", "-top5"]}
            buttonStyle={["-width5", "-height5"]}
            outerTextStyle={["-lineheight1", "-positionabsolute", "la-text-header"]}
            innerTextStyle={["-glow-header", "-glow-primary-hover", "-fontsize3", "la-text-header"]}
        />
    </div>
    <div class="la-hase">
        <HexButton
            name={getLocalized("LA.agility.short")}
            value={system.agi}
            tooltip={getLocalized("LA.agility.tooltip")}
            uuid={actor.uuid}
            flowClass={FlowClass.Roll}
            dataPath={"system.agi"}
            style={["-positionrelative", "-agility", "-fontsize10", "-bold"]}
            innerStyle={["-positionabsolute", "-left0", "-top5"]}
            buttonStyle={["-width5", "-height5"]}
            outerTextStyle={["-lineheight1", "-positionabsolute", "la-text-header"]}
            innerTextStyle={["-glow-header", "-glow-primary-hover", "-fontsize3", "la-text-header"]}
        />
    </div>
    <div class="la-hase">
        <HexButton
            name={getLocalized("LA.systems.short")}
            value={system.sys}
            tooltip={getLocalized("LA.systems.tooltip")}
            uuid={actor.uuid}
            flowClass={FlowClass.Roll}
            dataPath={"system.sys"}
            style={["-positionrelative", "-systems", "-fontsize10", "-bold"]}
            innerStyle={["-positionabsolute", "-left0", "-top5"]}
            buttonStyle={["-width5", "-height5"]}
            outerTextStyle={["-lineheight1", "-positionabsolute", "la-text-header"]}
            innerTextStyle={["-glow-header", "-glow-primary-hover", "-fontsize3", "la-text-header"]}
        />
    </div>
    <div class="la-hase">
        <HexButton
            name={getLocalized("LA.engineering.short")}
            value={system.eng}
            tooltip={getLocalized("LA.engineering.tooltip")}
            uuid={actor.uuid}
            flowClass={FlowClass.Roll}
            dataPath={"system.eng"}
            style={["-positionrelative", "-engineering", "-fontsize10", "-bold"]}
            innerStyle={["-positionabsolute", "-left0", "-top5"]}
            buttonStyle={["-width5", "-height5"]}
            outerTextStyle={["-lineheight1", "-positionabsolute", "la-text-header"]}
            innerTextStyle={["-glow-header", "-glow-primary-hover", "-fontsize3", "la-text-header"]}
        />
    </div>
</div>