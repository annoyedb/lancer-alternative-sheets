<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { getLocalized } from "@/scripts/helpers";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
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
    
    const collID = `${actor.uuid}.burdens`;
    const burdens = system.bond_state.burdens;
    const addBurdenTip = TooltipFactory.buildTooltip(getLocalized("LA.pilot.bond.burden.add.tooltip"))
    const tooltipEnabled = getPilotSheetTooltipEnabled();
    
    function getBurdenPath(index: number)
    {
        return `system.bond_state.burdens.${index}`;
    }
</script>

{#if system.bond}
{#snippet headerContent()}
<GlyphButton
    style={["mdi mdi-plus-circle-outline", "-fontsize3", "-height2", "-lineheight2", "-glow-primary-hover", "-glow-header"]}

    flowClass={FlowClass.GeneralControl}
    path="system.bond_state.burdens"
    action="append"
    actionValue="(struct)counter"

    tooltipEnabled={tooltipEnabled}
    tooltip={addBurdenTip}
    tooltipDirection={TooltipDirection.UP}
    logText={getLocalized("LA.pilot.bond.burden.add.tooltip")}
    logType={TextLogHook.PilotHeader}
    logTypeReset={TextLogHook.PilotHeaderReset}

    disabled={system.bond === null}

    onPointerEnter={() => {addButtonHover = true;}}
    onPointerLeave={() => {addButtonHover = false;}}
/>
{/snippet}
<HeaderMain
    text={getLocalized("LA.pilot.bond.burden.label")}
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
{#if burdens.length}
    <div class="la-combine-v -gap0 -widthfull">
    {#each burdens as burden, index}
        <div class="la-combine-v -widthfull">
        {#snippet outerContent()}
            <div class="-padding2-l">
                <CounterBox
                    type={CounterBoxType.Counter}
                    usesValue={burden.value}
                    usesMax={burden.max}
                    path="system.bond_state.burdens.{index}"
                    style={["clipped-bot-alt", "-widthfull", "la-bckg-header-anti"]}
                    
                    logType={TextLogHook.PilotHeader}
                    logTypeReset={TextLogHook.PilotHeaderReset}
                />
            </div>
        {/snippet}
        {#snippet headerSecondaryLeftOptions()}
            <i class="mdi mdi-weather-night -fontsize3 -padding0"></i>
        {/snippet}
        {#snippet headerSecondaryRightOptions()}
            <EditButton
                flowClass={FlowClass.ContextMenu}
                path={getBurdenPath(index)}

                style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}

                onPointerEnter={() => {editButtonHover = true;}}
                onPointerLeave={() => {editButtonHover = false;}}
            />
        {/snippet}
            <HeaderSecondary
                text={burden.name}
                headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
                textStyle={["la-text-header", "la-anim-header", "-fontsize2", "-overflowhidden"]}
                borderStyle={["-bordersoff"]}
                extensionTextFunction={() => {
                    if (editButtonHover)
                        return `--${getLocalized("LA.edit.extension")}`;
                    return undefined;
                }}

                itemID={burden.lid}
                uuid={burden.uuid}

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
        label={getLocalized("LA.pilot.bond.burden.empty.label")}
        subLabel={getLocalized("LA.pilot.bond.burden.empty.subLabel")}
    />
{/if}
</HeaderMain>
{/if}