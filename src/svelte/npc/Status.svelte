<script lang="ts">
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { getLocalized, logographicLanguage } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled, getSidebarExecutables, setSidebarExecutables } from "@/scripts/npc/settings";
    import { getAdvancedState } from "@/scripts/store/advanced";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import ActiveEffects from "@/svelte/shared/ActiveEffects.svelte";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import FlowButton, { FLOW_BUTTON_DEFAULT } from "@/svelte/shared/button/FlowButton.svelte";
    import CollapseAllButton from "@/svelte/shared/button/CollapseAllButton.svelte";
    import MacroDropBox from '@/svelte/shared/dragdrop/MacroDropBox.svelte';
    import StatusBar from "@/svelte/shared/StatusBar.svelte";
    import StatComboShort from "@/svelte/shared/StatComboShort.svelte";
    import { setActorContext } from "@/scripts/context";
    import { getCustomFlagPath, getCustomFlags } from "@/scripts/flags";
    import { CustomFlagKey } from "@/enums/CustomFlagKey";
    import { CustomFlagContentType } from "@/enums/CustomFlagContentType";
    import type { CustomFlag } from "@/interfaces/actor/CustomFlagData";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { resetTextConsole, sendToTextConsole } from "@/scripts/store/text-log";

    const props = $props();
    const {
        actor,
    }: NPCSheetProps = $derived(props);
    setActorContext(actor);
    let collapseAllButtonHover = $state(false);

    const logographic = logographicLanguage();
    const tooltipEnabled = getNPCSheetTooltipEnabled();
    const sidebarExes = $derived(getSidebarExecutables(actor.uuid));
    const advancedOptions = $derived(getAdvancedState(actor.uuid));
    const activeEffectsCollID = $derived(`${actor.uuid}.status.activeEffects`);
    const utilitiesCollID = $derived(`${actor.uuid}.status.utilities`);
    const macrosCollID = $derived(`${actor.uuid}.status.macros`);
    const customFlagsCollID = $derived(`${actor.uuid}.status.customFlags`);
    const theme = $derived(getCSSDocumentTheme(actor.uuid));
    const customFlagsEmptyTipMain = $derived(TooltipFactory.buildTooltip(getLocalized("LA.tab.custom.empty.tooltip.0")));
    const customFlagsEmptyTipAlt = $derived(TooltipFactory.buildTooltip(getLocalized("LA.tab.custom.empty.tooltip.1")));
    const customFlagsEmptyLog = $derived(advancedOptions ? getLocalized("LA.tab.custom.empty.tooltip.1") : getLocalized("LA.tab.custom.empty.tooltip.0"));
    const customFlags = $derived(getCustomFlags(actor, CustomFlagKey.NPC));
    const visibleCustomFlags = $derived(Object.values(customFlags).filter(flag => flag.showInSidebar));
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={activeEffectsCollID}
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={theme}

    onPointerEnter={() => {collapseAllButtonHover = true;}}
    onPointerLeave={() => {collapseAllButtonHover = false;}}
/>
{/snippet}
<HeaderMain 
    text={getLocalized("LA.tab.status.effects.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-pilot"]}
    textStyle={["la-text-header -fontsize4 -overflowhidden"]}
    borderStyle={["la-brdr-pilot"]}

    collapseID={activeEffectsCollID}
    startCollapsed={false}

    headerContent={headerOptions}
>
    <ActiveEffects { ...props }
        tooltipEnabled={tooltipEnabled}
        logging={true}
    />
</HeaderMain>

<HeaderMain 
    text={getLocalized("LA.npc.utilities.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-pilot"]}
    textStyle={["la-text-header -fontsize4 -overflowhidden"]}
    borderStyle={["la-brdr-pilot"]}
    extensionTextFunction={() => {
        if (collapseAllButtonHover)
            return `--${getLocalized("LA.collapseAll.extension")}`;
        return undefined;
    }}

    collapseID={utilitiesCollID}
    startCollapsed={false}
>
    <div class="la-flexcol -gap0 -widthfull">
        <FlowButton 
            style={["clipped-alt la-bckg-header-anti -padding0 -widthfull -overflowhidden -lineheight3"]}
            text={getLocalized("LA.npc.recharge.label")}
            
            flowClass={FlowClass.RechargeFeatures}

            tooltipEnabled={tooltipEnabled}
            tooltipTheme={theme}
            tooltipDirection={TooltipDirection.UP}
            tooltip={getLocalized("LA.npc.recharge.tooltip")}
            tooltipHeader={getLocalized("LA.action.startofturn.label")}
        />
        <div class="la-flexrow -wrapwrap -widthfull -gap0">
            <div class="la-flexcol -gap0 -flex1 -widthfull">
                <FlowButton 
                    style={["clipped-alt la-bckg-secondary -widthfull -overflowhidden -lineheight3"]}
                    text={getLocalized("LA.flow.rollAttack.label")}

                    uuid={actor.uuid}
                    flowClass={FlowClass.Standard}
                    flowType={"BasicAttack"}

                    tooltipEnabled={tooltipEnabled}
                    tooltipTheme={theme}
                    tooltipDirection={TooltipDirection.UP}
                    tooltip={getLocalized("LA.flow.rollAttack.tooltip")}
                />
                <FlowButton 
                    style={["clipped-alt la-bckg-secondary -widthfull -overflowhidden -lineheight3"]}
                    text={getLocalized("LA.flow.rollDamage.label")}

                    uuid={actor.uuid}
                    flowClass={FlowClass.Standard}
                    flowType={"Damage"}

                    tooltipEnabled={tooltipEnabled}
                    tooltipTheme={theme}
                    tooltipDirection={TooltipDirection.UP}
                    tooltip={getLocalized("LA.flow.rollDamage.tooltip")}
                />
            </div>
            <div class="la-flexcol -gap0 -flex1 -widthfull">
                <FlowButton 
                    style={["clipped la-bckg-secondary -widthfull -overflowhidden -lineheight3"]}
                    text={getLocalized("LA.flow.rollTechAttack.label")}

                    uuid={actor.uuid}
                    flowClass={FlowClass.Standard}
                    flowType={"TechAttack"}

                    tooltipEnabled={tooltipEnabled}
                    tooltipTheme={theme}
                    tooltipDirection={TooltipDirection.UP}
                    tooltip={getLocalized("LA.flow.rollTechAttack.tooltip")}
                />
                <FlowButton
                    style={["clipped la-bckg-secondary -widthfull -overflowhidden -lineheight3"]}
                    text={getLocalized("LA.flow.extinguish.label")}

                    uuid={actor.uuid}
                    flowClass={FlowClass.Standard}
                    flowType={"Burn"}

                    tooltipEnabled={tooltipEnabled}
                    tooltipTheme={theme}
                    tooltipDirection={TooltipDirection.UP}
                    tooltipHeader={getLocalized("LA.action.endofturn.label")}
                    tooltip={getLocalized("LA.flow.extinguish.tooltip")}
                />
            </div>
        </div>
    </div>
</HeaderMain>

<HeaderMain
    text={getLocalized("LA.tab.custom.subLabel")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-pilot"]}
    textStyle={["la-text-header -fontsize4 -overflowhidden"]}
    borderStyle={["la-brdr-pilot"]}

    collapseID={customFlagsCollID}
    startCollapsed={false}
>
    {#if visibleCustomFlags.length}
    <div class="la-flags la-flexcol -gap1 -widthfull">
    {#snippet createFractionBar(data: CustomFlag)}
    <div class="la-flexcol -widthfull -fontface-stylized">
        <span class="-fontsizesmall -upper"
            data-tooltip={tooltipEnabled && data.tooltip ? TooltipFactory.buildTooltip(data.tooltip) : undefined}
            data-tooltip-class="clipped-bot la-tooltip {theme}"
            data-tooltip-direction={TooltipDirection.UP}
        >{data.name}</span>
        <div class="la-flexrow -widthfull">
            <div class="-width10"></div>
            <div class="-flex5" style="--la-flag-custom: {data.color};">
                <StatusBar
                    name={""}
                    nameStyle={[logographic ? "-fontsizemedium" : ""]}
                    dataName={getCustomFlagPath(CustomFlagKey.NPC, data.id, "value")}
                    currentValue={data.content.value}
                    maxValue={data.content.max}
                    barStyle={["la-bckg-custom"]}
                    barEditStyle={["la-bckg-custom"]}
                    textStyle={["la-text-text"]}
                    clipPath={"clipped-alt"}
                />
            </div>
            <div class="-width10"></div>
        </div>
    </div>
    {/snippet}

    {#snippet createValueGlyph(data: CustomFlag)}
    <div class="-widthfull">
        <StatComboShort
            icon="{data.icon ? data.icon : "mdi mdi-abacus" } -alignselfcenter"
            label={data.name}
            value={data.content.value}
            outerStyle={["la-text-text -fontsize6"]}
            innerStyle={["-divider -upper -fontface-stylized -fontsizemedium la-prmy-accent -textaligncenter", logographic ? "" : "-bold"]}

            tooltipEnabled={tooltipEnabled}
            tooltipTheme={theme}
            tooltip={data.tooltip}
            tooltipDirection={TooltipDirection.UP}
        />
    </div>
    {/snippet}

    {#each visibleCustomFlags as flag (flag.id)}
        {#if flag.contentType === CustomFlagContentType.Fraction}
            {@render createFractionBar(flag)}
        {:else}
            {@render createValueGlyph(flag)}
        {/if}
    {/each}
    </div>
    {:else}
    <details class="la-details -widthfull la-flexcol">
        <summary class="la-details__summary la-flexrow clipped-bot-alt la-bckg-repcap la-text-header -padding1-l -widthfull"
            data-tooltip={tooltipEnabled
                ? advancedOptions ? customFlagsEmptyTipAlt : customFlagsEmptyTipMain
                : undefined}
            data-tooltip-class="clipped-bot la-tooltip {theme}"
            data-tooltip-direction={TooltipDirection.UP}
            onpointerenter={ event => sendToTextConsole(event, customFlagsEmptyLog, actor.uuid) }
            onpointerleave={ event => resetTextConsole(event, actor.uuid) }
        >
            <span class="la-left la-flexrow">
                <i class="la-icon mdi mdi-card-off-outline -fontsize4 -margin1-lr"></i>
                <span class="la-name__span -fontsize4">
                    {getLocalized("LA.tab.custom.empty.label")}
                </span>
            </span>
        </summary>
    </details>
    {/if}
</HeaderMain>

<HeaderMain
    text={getLocalized("LA.npc.macros.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-pilot"]}
    textStyle={["la-text-header -fontsize4 -overflowhidden"]}
    borderStyle={["la-brdr-pilot"]}

    collapseID={macrosCollID}
    startCollapsed={false}
>
    <MacroDropBox
        uuid={actor.uuid}
        getExes={sidebarExes}
        setExes={setSidebarExecutables}
        hintDropArea={false}
        allowDrop={advancedOptions}
        buttonStyle={[FLOW_BUTTON_DEFAULT(), advancedOptions ? "-margin8-l" : ""]}
        innerStyle={["-gap0"]}
        tooltipEnabled={tooltipEnabled}
    />
</HeaderMain>