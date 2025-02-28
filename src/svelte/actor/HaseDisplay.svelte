<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import HexButton from "@/svelte/actor/HexButton.svelte";
    import { FlowClass } from "@/enums/FlowClass";

    const {
        pilot,
        actor,
        system,
    }: MechSheetProps = $props();
</script>

<!-- HASE Stats -->
{#if pilot && pilot.system.active_mech.value.uuid === actor.uuid}
<div class="la-hasegroup la-combine-v -positionabsolute -widthnone">
    <div class="la-hase -heightnone">
        <HexButton
            name={getLocalized("LA.grit.short")}
            value={system.grit}
            tooltip={getLocalized("LA.grit.tooltip")}
            uuid={actor.uuid}
            flowClass={FlowClass.Roll}
            dataPath={"system.grit"}
            sign={true}
            style={["-positionrelative", "-grit", "-fontsize13", "bold", "-right2"]}
            innerStyle={["-positionabsolute", "-left0", "-top5", "-divider", "-thickness1", "la-anim-header"]}
            buttonStyle={["-width7", "-height6", "-glow-primary-hover"]}
            outerTextStyle={["-lineheight0", "la-text-header", "la-text-header", "-width7", "-textaligncenter"]}
            innerTextStyle={["-glow-header", "la-text-header", "-fontsize4"]}
        />
        <HexButton
            name={getLocalized("LA.hull.short")}
            value={system.hull}
            tooltip={getLocalized("LA.hull.tooltip")}
            uuid={actor.uuid}
            flowClass={FlowClass.HASE}
            dataPath={"system.hull"}
            style={["-positionrelative", "-hull", "-fontsize11", "-bold"]}
            innerStyle={["-positionabsolute", "-left0", "-top4", "-width10", "-divider", "-thickness1", "la-anim-header"]}
            buttonStyle={["-width7", "-height6", "-glow-primary-hover"]}
            outerTextStyle={["-positionabsolute", "la-text-header", "-width6", "-textaligncenter"]}
            innerTextStyle={["-glow-header", "-fontsize4", "la-text-header", "-lineheight9"]}
        />
        <HexButton
            name={getLocalized("LA.systems.short")}
            value={system.sys}
            tooltip={getLocalized("LA.systems.tooltip")}
            uuid={actor.uuid}
            flowClass={FlowClass.HASE}
            dataPath={"system.sys"}
            style={["-positionrelative", "-systems", "-fontsize11", "-bold"]}
            innerStyle={["-positionabsolute", "-left0", "-top4", "-width10", "-divider", "-thickness1", "la-anim-header"]}
            buttonStyle={["-width7", "-height6", "-glow-primary-hover"]}
            outerTextStyle={["-positionabsolute", "la-text-header", "-width6", "-textaligncenter"]}
            innerTextStyle={["-glow-header", "-fontsize4", "la-text-header", "-lineheight9"]}
        />
        <HexButton
            name={getLocalized("LA.engineering.short")}
            value={system.eng}
            tooltip={getLocalized("LA.engineering.tooltip")}
            uuid={actor.uuid}
            flowClass={FlowClass.HASE}
            dataPath={"system.eng"}
            style={["-positionrelative", "-engineering", "-fontsize11", "-bold"]}
            innerStyle={["-positionabsolute", "-left0", "-top4", "-width10", "-divider", "-thickness1", "la-anim-header"]}
            buttonStyle={["-width7", "-height6", "-glow-primary-hover"]}
            outerTextStyle={["-positionabsolute", "la-text-header", "-width6", "-textaligncenter"]}
            innerTextStyle={["-glow-header", "-fontsize4", "la-text-header", "-lineheight9"]}
        />
        <HexButton
            name={getLocalized("LA.agility.short")}
            value={system.agi}
            tooltip={getLocalized("LA.agility.tooltip")}
            uuid={actor.uuid}
            flowClass={FlowClass.HASE}
            dataPath={"system.agi"}
            style={["-positionrelative", "-agility", "-fontsize11", "-bold"]}
            innerStyle={["-positionabsolute", "-left0", "-top4", "-width10", "-divider", "-thickness1", "la-anim-header"]}
            buttonStyle={["-width7", "-height6", "-glow-primary-hover"]}
            outerTextStyle={["-positionabsolute", "la-text-header", "-width6", "-textaligncenter"]}
            innerTextStyle={["-glow-header", "-fontsize4", "la-text-header", "-lineheight9"]}
        />
    </div>
</div>
{/if}