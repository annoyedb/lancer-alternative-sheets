<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/actor/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import HexButton from "@/svelte/actor/HexButton.svelte";
    import { FlowClass } from "@/enums/FlowClass";

    const {
        actor,
        system
    }: MechSheetProps = $props();
</script>

<!-- HASE Stats -->
<div class="la-hase">
    <HexButton
        name={getLocalized("LA.grit.short")}
        value={system.grit}
        tooltip={getLocalized("LA.grit.tooltip")}
        uuid={actor.uuid}
        flowClass={FlowClass.Roll}
        dataPath={"system.grit"}
        sign={true}
        style={["-grit"]}
    />
    <HexButton
        name={getLocalized("LA.hull.short")}
        value={system.hull}
        tooltip={getLocalized("LA.hull.tooltip")}
        uuid={actor.uuid}
        flowClass={FlowClass.HASE}
        dataPath={"system.hull"}
        sign={false}
        style={["-hull"]}
    />
    <HexButton
        name={getLocalized("LA.agility.short")}
        value={system.agi}
        tooltip={getLocalized("LA.agility.tooltip")}
        uuid={actor.uuid}
        flowClass={FlowClass.HASE}
        dataPath={"system.agi"}
        sign={false}
        style={["-agility"]}
    />
    <HexButton
        name={getLocalized("LA.systems.short")}
        value={system.sys}
        tooltip={getLocalized("LA.systems.tooltip")}
        uuid={actor.uuid}
        flowClass={FlowClass.HASE}
        dataPath={"system.sys"}
        sign={false}
        style={["-systems"]}
    />
    <HexButton
        name={getLocalized("LA.engineering.short")}
        value={system.eng}
        tooltip={getLocalized("LA.engineering.tooltip")}
        uuid={actor.uuid}
        flowClass={FlowClass.HASE}
        dataPath={"system.eng"}
        sign={false}
        style={["-engineering"]}
    />
</div>