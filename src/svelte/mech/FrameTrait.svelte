<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { getMechSheetTipEnabled } from "@/scripts/mech/settings";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE, H2_ICON_SIZE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import DeployableBox from "@/svelte/actor/DeployableBox.svelte";
    import CounterBox from "@/svelte/actor/CounterBox.svelte";
    import BonusBox from "@/svelte/actor/BonusBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";

    const {
        actor,
        system,
    }: MechSheetProps = $props();
    let messageButtonHover = $state(false);

    const frame = system.loadout.frame!.value;
    const tooltipEnabled = getMechSheetTipEnabled();

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
<i class="{H2_ICON_SIZE} cci cci-frame"></i>
{/snippet}
{#snippet headerSecondaryRightOptions()}
<MessageButton
    flowClass={FlowClass.SendToChat}
    uuid={frame.uuid}
    type={"trait"}
    index={index}
    
    tooltipEnabled={tooltipEnabled}
    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}

    onPointerEnter={() => {messageButtonHover = true;}}
    onPointerLeave={() => {messageButtonHover = false;}}
/>
{/snippet}

<!-- Frame Traits -->
<HeaderSecondary
    text={trait.name}
    headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
    textStyle={["-fontsize2"]}
    borderStyle={["-bordersoff"]}
    extensionTextFunction={() => {
        if (messageButtonHover)
            return `--${getLocalized("LA.chat.extension")}`;
        return undefined;
    }}
    
    collapseID={getCollapseID(index)}
    startCollapsed={true}

    headerContentLeft={headerSecondaryLeftOptions}
    headerContentRight={headerSecondaryRightOptions}
>
    <div class="la-generated -widthfull -gap2 la-combine-v">
        <EffectBox
            name={getLocalized("LA.mech.frame.trait.label")}
            effect={trait.description}

            tooltipEnabled={tooltipEnabled}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
        />
        <!-- Generated Content -->
    {#if trait.counters?.length}
    {#each trait.counters as counter}
        <CounterBox
            name={counter.name}
            usesValue={counter.value}
            usesMax={counter.max}
            path={`system.loadout.frame.value.system.traits.${index}.counters`}
            
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
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

            collapseID={getActionCollapseID(index)}
            startCollapsed={false}

            tooltipEnabled={tooltipEnabled}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
        />
        <DeployableBox
            source={actor}
            lidSource={trait}
            uuid={frame.uuid}
            sheetUUID={actor.uuid}

            tooltipEnabled={tooltipEnabled}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
        />
    </div>
</HeaderSecondary>
{/each}
{/if}