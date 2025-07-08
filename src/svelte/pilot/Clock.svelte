<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { getLocalized } from "@/scripts/helpers";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { getDocumentTheme } from "@/scripts/theme";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { FlowClass } from "@/enums/FlowClass";
    import { CounterBoxType } from "@/enums/CounterBoxType";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import EditButton, { HEADER_SECONDARY_STYLE as HEADER_SECONDARY_ICON_OPTION_STYLE } from "@/svelte/actor/button/EditButton.svelte";
    import CounterBox from "@/svelte/actor/counter/CounterBox.svelte";
    import GlyphButton from "@/svelte/actor/button/GlyphButton.svelte";
    import EmptyBox from "@/svelte/actor/EmptyBox.svelte";

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
    style={["mdi mdi-plus-circle-outline", "-fontsize3", "-height2", "-lineheight2", "la-prmy-header -glow-prmy la-scdy-primary -glow-scdy-hover"]}

    flowClass={FlowClass.GeneralControl}
    path="system.bond_state.clocks"
    action="append"
    actionValue="(struct)counter"

    tooltipEnabled={tooltipEnabled}
    tooltipTheme={getDocumentTheme(actor.uuid)}
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
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
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
    <div class="la-combine-v -gap0 -widthfull">
    {#each clocks as clock, index}
        <div class="la-combine-v -widthfull">
        {#snippet outerContent()}
            <div class="-padding2-l">
                <CounterBox
                    type={CounterBoxType.Counter}
                    usesValue={clock.value}
                    usesMax={clock.max}
                    path="system.bond_state.clocks.{index}"
                    style={["clipped-bot-alt", "-widthfull", "la-bckg-header-anti"]}
                    
                    logType={TextLogHook.PilotHeader}
                    logTypeReset={TextLogHook.PilotHeaderReset}
                />
            </div>
        {/snippet}
        {#snippet headerSecondaryLeftOptions()}
            <i class="mdi mdi-progress-clock -fontsize3 -padding0"></i>
        {/snippet}
        {#snippet headerSecondaryRightOptions()}
            <EditButton
                flowClass={FlowClass.ContextMenu}
                path={getClockPath(index)}

                style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}

                onPointerEnter={() => {editButtonHover = true;}}
                onPointerLeave={() => {editButtonHover = false;}}
            />
        {/snippet}
            <HeaderSecondary
                text={clock.name}
                headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
                textStyle={["la-text-header", "la-prmy-header", "-fontsize2", "-overflowhidden"]}
                borderStyle={["-bordersoff"]}
                extensionTextFunction={() => {
                    if (editButtonHover)
                        return `--${getLocalized("LA.edit.extension")}`;
                    return undefined;
                }}

                itemID={clock.lid}
                uuid={clock.uuid}

                renderOutsideCollapse={outerContent}
                headerContentLeft={headerSecondaryLeftOptions}
                headerContentRight={headerSecondaryRightOptions}
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