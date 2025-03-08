<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import HeaderSecondary, { SECONDARY_HEADER_STYLE, SECONDARY_ICON_STYLE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import DeployableBox from "@/svelte/actor/DeployableBox.svelte";
    import CounterBox from "@/svelte/actor/CounterBox.svelte";
    import BonusBox from "@/svelte/actor/BonusBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";
    import { FlowClass } from "@/enums/FlowClass";

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

{#snippet headerSecondaryLeftOptions()}
<i class="{SECONDARY_ICON_STYLE} cci cci-frame"></i>
{/snippet}
{#snippet headerSecondaryRightOptions()}
<MessageButton
    flowClass={FlowClass.SendToChat}
    uuid={frame.uuid}
    type="trait"
    index={index}
/>
{/snippet}

<!-- Frame Traits -->
<HeaderSecondary
    text={trait.name}
    headerStyle={[SECONDARY_HEADER_STYLE, "la-bckg-pilot", "la-anim-header"]}
    textStyle={["-fontsize2"]}
    borderStyle={["-bordersoff"]}
    
    collapseID={getCollapseID(index)}
    startCollapsed={true}

    headerContentLeft={headerSecondaryLeftOptions}
    headerContentRight={headerSecondaryRightOptions}
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