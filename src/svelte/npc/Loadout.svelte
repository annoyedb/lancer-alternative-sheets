<script lang="ts">
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import Weapons from "@/svelte/npc/Weapons.svelte";
    import Systems from "@/svelte/npc/Systems.svelte";
    import Traits from "@/svelte/npc/Traits.svelte";
    import Reactions from "@/svelte/npc/Reactions.svelte";
    import TechAttack from "@/svelte/npc/TechAttack.svelte";
    import EmptyBox from "@/svelte/actor/EmptyBox.svelte";


    const props = $props();
    const {
        system,
        itemTypes,
    }: NPCSheetProps = props;

    const traits: Array<any> = [];
    const systems: Array<any> = [];
    const reactions: Array<any> = [];
    const weapons: Array<any> = [];
    const techs: Array<any> = [];
    itemTypes.npc_feature.forEach((feature: { system: { type: any; }; }, index: number) => {
        // @ts-expect-error Add index to the npc feature so that it can be used to resolve the correct path
        feature.index = index;
        switch (feature.system.type) {
            case "Trait":
                traits.push(feature);
                break;
            case "System":
                systems.push(feature);
                break;
            case "Reaction":
                reactions.push(feature);
                break;
            case "Weapon":
                weapons.push(feature);
                break;
            case "Tech":
                techs.push(feature);
                break;
        }
    });
</script>

{#if !system.class}
<EmptyBox
    label={getLocalized("LA.npc.empty.label")}
    subLabel={getLocalized("LA.npc.empty.subLabel")}
/>
{/if}
{#if itemTypes.npc_feature.length}
<div class="la-combine-v -widthfull">
    <Weapons 
        weapons={weapons}
        {...props}
    />
    <TechAttack
        techs={techs}
        {...props}
    />
    <Reactions
        reactions={reactions}
        {...props}
    />
    <Systems 
        systems={systems}
        {...props}
    />
    <Traits
        traits={traits}
        {...props}
    />
</div>
{/if}