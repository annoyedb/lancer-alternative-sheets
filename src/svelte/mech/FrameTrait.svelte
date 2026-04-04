<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { getMechSheetTooltipEnabled } from "@/scripts/mech/settings";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { CounterBoxType } from "@/enums/CounterBoxType";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    
    import ActionBox from "@/svelte/shared/ActionBox.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE, H2_ICON_SIZE } from "@/svelte/shared/header/HeaderSecondary.svelte";
    import DeployableBox from "@/svelte/shared/DeployableBox.svelte";
    import CounterBox from "@/svelte/shared/counter/CounterBox.svelte";
    import BonusBox from "@/svelte/shared/BonusBox.svelte";
    import EffectBox from "@/svelte/shared/EffectBox.svelte";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import { H2_BUTTON_ICON_STYLE } from "@/svelte/shared/button/Button.svelte";

    const {
        actor,
        system,
    }: MechSheetProps = $props();
    let messageButtonHover = $state(false);

    const frame = system.loadout.frame!.value;
    const tooltipEnabled = getMechSheetTooltipEnabled();

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
<GlyphButton
    style={[H2_BUTTON_ICON_STYLE]}
    flowClass={FlowClass.SendToChat}
    uuid={frame.uuid}
    type={"trait"}
    index={index}

    tooltipEnabled={tooltipEnabled}
    tooltipDirection={TooltipDirection.UP}
    tooltipTheme={getCSSDocumentTheme(actor.uuid)}
    tooltip={getLocalized("LA.chat.tooltip")}
    logText={getLocalized("LA.chat.tooltip")}
    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}

    onPointerEnter={() => {messageButtonHover = true;} }
    onPointerLeave={() => {messageButtonHover = false;} }
>
    <i class="mdi mdi-message"></i>
</GlyphButton>
{/snippet}

<!-- Frame Traits -->
<HeaderSecondary
    text={trait.name}
    headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
    textStyle={["-fontsize4"]}
    borderStyle={["-bordersoff"]}
    extensionTextFunction={() => {
        if (messageButtonHover)
            return `--${getLocalized("LA.chat.extension")}`;
        return undefined;
    }}
    
    collapseID={getCollapseID(index)}
    startCollapsed={true}

    contentLeft={headerSecondaryLeftOptions}
    contentRight={headerSecondaryRightOptions}
>
    <div class="la-generated -widthfull -gap2 la-flexcol">
        <EffectBox
            name={getLocalized("LA.mech.frame.trait.label")}
            effect={trait.description}

            tooltipEnabled={tooltipEnabled}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
        />
        <!-- Generated Content -->
    {#if trait.counters?.length}
    {#each trait.counters as counter, jndex}
        <CounterBox
            text={counter.name}
            type={CounterBoxType.Counter}
            usesValue={counter.value}
            usesMax={counter.max}
            path="system.loadout.frame.value.system.traits.{index}.counters.{jndex}"
            
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
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
        />
        <DeployableBox
            source={actor}
            lidSource={trait}
            uuid={frame.uuid}
            sheetUUID={actor.uuid}

            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
        />
    </div>
</HeaderSecondary>
{/each}
{/if}