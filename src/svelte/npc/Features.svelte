<script lang="ts">
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import Weapons from "@/svelte/npc/Weapons.svelte";
    import Systems from "@/svelte/npc/Systems.svelte";
    import Traits from "@/svelte/npc/Traits.svelte";
    import Reactions from "./Reactions.svelte";

    const props = $props();
    const {
        itemTypes,
    }: NPCSheetProps = props;

    const traits: Array<any> = [];
    const systems: Array<any> = [];
    const reactions: Array<any> = [];
    const weapons: Array<any> = [];
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
        }
    });

    //@ts-ignore
    function log(any: any)
    {
        console.log(any);
    }
</script>

{#if itemTypes.npc_feature.length}
<Weapons 
    weapons={weapons}
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
{/if}