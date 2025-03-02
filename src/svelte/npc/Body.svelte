<script lang="ts">
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import Weapons from "@/svelte/npc/Weapons.svelte";
    import Systems from "@/svelte/npc/Systems.svelte";
    import Traits from "@/svelte/npc/Traits.svelte";
    import Reactions from "./Reactions.svelte";
    import { getLocalized } from "@/scripts/helpers";
    import TechAttack from "./TechAttack.svelte";


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

    //@ts-ignore
    function log(any: any)
    {
        console.log(any);
    }
</script>

{#if !system.class}
<details class="la-details -widthfull la-combine-v">
    <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1-l -widthfull">
        <div class="la-left la-combine-h">
            <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
            <span class="la-name__span -fontsize2">{getLocalized("LA.npc.empty.label")}</span>
        </div>
    </summary>
    <div class="la-details__wrapper -bordersround -bordersoff">
        <div class="la-warn__span la-details__span la-text-repcap -padding3 -fontsize3 -textaligncenter -widthfull">{getLocalized("LA.npc.empty.subLabel")}</div>
    </div>
</details>
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