<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import HeaderSecondary from "@/svelte/actor/HeaderSecondary.svelte";
    import DeployableBox from "@/svelte/actor/DeployableBox.svelte";
    import CounterBox from "@/svelte/actor/CounterBox.svelte";
    import BonusBox from "../actor/BonusBox.svelte";
    import EffectBox from "../actor/EffectBox.svelte";

    const {
        actor,
        collapse,
        system,
    }: MechSheetProps = $props();

    let frame: any = system.loadout.frame!.value;

    function getCollapseID(index: number)
    {
        return `${actor.uuid}_${frame.id}_trait_${index}`;
    }
    function getActionCollapseID(index: number)
    {
        return `${actor.uuid}_${frame.id}_trait_${index}_action`;
    }
</script>

{#if frame.system.traits.length}
{#each frame.system.traits as trait, index}
<!-- Frame Traits -->
<HeaderSecondary
    title={trait.name}
    headerStyle={["la-bckg-pilot", "clipped-bot-alt", "-justifybetween", "-padding0", "-padding3-r", "la-text-header"]}
    headerIconStyle={["cci", "cci-frame", "-fontsize5", "-lineheight3"]}
    borderStyle={["-bordersoff"]}
    collapse={collapse}
    collapseID={getCollapseID(index)}
    messageOption={true}
    messageUUID={frame.uuid}
    messageType="trait"
    messageIndex={index}
    startCollapsed={true}
>
    <div class="la-generated -widthfull -gap2 la-combine-v">
        <EffectBox
            name={getLocalized("LA.mech.frame.trait.label")}
            effect={trait.description}
        />
        <!-- Generated Content -->
    {#if trait.counters?.length}
    {#each trait.counters as counter}
        <CounterBox
            name={counter.name}
            usesValue={counter.value}
            usesMax={counter.max}
            path={`system.traits.${index}.counters`}
        />
    {/each}
    {/if}
        <BonusBox    
            bonuses={trait.bonuses}
            bonusPath={`system.traits.${index}.bonuses`}
        />
        <ActionBox
            uuid={frame.uuid}
            actions={trait.actions}
            path={`system.traits.${index}.actions`}
            collapse={collapse}
            collapseID={getActionCollapseID(index)}
            startCollapsed={false}
        />
        <DeployableBox
            source={actor}
            lidSource={trait}
            collapse={collapse}
        />
    </div>
</HeaderSecondary>
{/each}
{/if}