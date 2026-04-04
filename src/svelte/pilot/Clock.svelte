<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { getLocalized } from "@/scripts/helpers";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { FlowClass } from "@/enums/FlowClass";
    import { CounterBoxType } from "@/enums/CounterBoxType";
    
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE } from "@/svelte/shared/header/HeaderSecondary.svelte";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import CounterBox from "@/svelte/shared/counter/CounterBox.svelte";
    import EmptyBox from "@/svelte/shared/EmptyBox.svelte";
    import { H2_BUTTON_ICON_STYLE } from "@/svelte/shared/button/Button.svelte";

    const {
        actor,
        system,
    } = $props();
    let editButtonHover = $state(false);
    let addButtonHover = $state(false);
    
    const collID = `${actor.uuid}.clocks`;
    const clocks = system.bond_state.clocks;
    const addClockTip = TooltipFactory.buildTooltip(getLocalized("LA.pilot.bond.clock.add.tooltip"))
    const tooltipEnabled = getPilotSheetTooltipEnabled();
    
    function getClockPath(index: number)
    {
        return `system.bond_state.clocks.${index}`;
    }
</script>

{#snippet headerContent()}
<GlyphButton
    style={["mdi mdi-plus-circle-outline -fontsize5 -height4 -lineheight4 la-prmy-header -glow-prmy la-scdy-primary -glow-scdy-hover"]}

    flowClass={FlowClass.GeneralControl}
    path="system.bond_state.clocks"
    action="append"
    actionValue="(struct)counter"

    tooltipEnabled={tooltipEnabled}
    tooltipTheme={getCSSDocumentTheme(actor.uuid)}
    tooltip={addClockTip}
    tooltipDirection={TooltipDirection.UP}
    logText={getLocalized("LA.pilot.bond.clock.add.tooltip")}
    logType={TextLogHook.PilotHeader}
    logTypeReset={TextLogHook.PilotHeaderReset}

    onPointerEnter={() => {addButtonHover = true;}}
    onPointerLeave={() => {addButtonHover = false;}}
/>
{/snippet}
<HeaderMain
    text={getLocalized("LA.pilot.bond.clock.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-weapon"]}
    textStyle={["la-text-header -fontsize4 -overflowhidden"]}
    borderStyle={["la-brdr-weapon"]}
    extensionTextFunction={() => {
        if (addButtonHover)
            return `--${getLocalized("LA.add.extension")}`;
        return undefined;
    }}
    
    collapseID={collID}
    startCollapsed={true}

    headerContent={headerContent}
>
{#if clocks.length}
    <div class="la-flexcol -gap0 -widthfull">
    {#each clocks as clock, index}
        <div class="la-flexcol -widthfull">
        {#snippet outerContent()}
            <div class="-padding2-l">
                <CounterBox
                    type={CounterBoxType.Counter}
                    usesValue={clock.value}
                    usesMax={clock.max}
                    path="system.bond_state.clocks.{index}"
                    style={["clipped-bot-alt -widthfull la-bckg-header-anti"]}
                    
                    logType={TextLogHook.PilotHeader}
                    logTypeReset={TextLogHook.PilotHeaderReset}
                />
            </div>
        {/snippet}
        {#snippet headerSecondaryLeftOptions()}
            <i class="mdi mdi-progress-clock -fontsize5 -padding0"></i>
        {/snippet}
        {#snippet headerSecondaryRightOptions()}
            <!-- Edit -->
            <GlyphButton
                style={[H2_BUTTON_ICON_STYLE, "-padding0-lr"]}
                flowClass={FlowClass.ContextMenu}
                path={getClockPath(index)}

                tooltipEnabled={tooltipEnabled}
                tooltipDirection={TooltipDirection.UP}
                tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                tooltip={getLocalized("LA.edit.tooltip")}
                logText={getLocalized("LA.edit.tooltip")}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}

                onPointerEnter={() => {editButtonHover = true;} }
                onPointerLeave={() => {editButtonHover = false;} }
            >
                <i class="fas fa-ellipsis-v"></i>
            </GlyphButton>
        {/snippet}
            <HeaderSecondary
                text={clock.name}
                headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
                textStyle={["la-text-header la-prmy-header -fontsize4 -overflowhidden"]}
                borderStyle={["-bordersoff"]}
                extensionTextFunction={() => {
                    if (editButtonHover)
                        return `--${getLocalized("LA.edit.extension")}`;
                    return undefined;
                }}

                itemID={clock.lid}
                uuid={clock.uuid}

                renderOutsideCollapse={outerContent}
                contentLeft={headerSecondaryLeftOptions}
                contentRight={headerSecondaryRightOptions}
            >
            </HeaderSecondary>
        </div>
    {/each}
    </div>
{:else}
    <EmptyBox
        label={getLocalized("LA.pilot.bond.clock.empty.label")}
        subLabel={getLocalized("LA.pilot.bond.clock.empty.subLabel")}
    />
{/if}
</HeaderMain>