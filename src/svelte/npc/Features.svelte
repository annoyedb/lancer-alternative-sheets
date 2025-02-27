<script lang="ts">
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import Weapons from "./Weapons.svelte";

    const props = $props();
    const {
        itemTypes,
    }: NPCSheetProps = props;

    const traits: Array<any> = [];
    const systems: Array<any> = [];
    const reactions: Array<any> = [];
    const weapons: Array<any> = [];
    itemTypes.npc_feature.forEach((feature: { system: { type: any; }; }) => {
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
{/if}