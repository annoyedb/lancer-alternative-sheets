<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";
    import { getLocalized } from "@/scripts/helpers";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { FlowClass } from "@/enums/FlowClass";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import EditButton, { HEADER_SECONDARY_STYLE as HEADER_SECONDARY_ICON_OPTION_STYLE } from "@/svelte/actor/button/EditButton.svelte";
    import CounterBox from "@/svelte/actor/CounterBox.svelte";

    const {
        actor,
        system,
    } = $props();
    let editButtonHover = $state(false);
    
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
<button type="button"
    class="mdi mdi-plus-circle-outline -fontsize3 -height2 -lineheight2 -glow-primary-hover -glow-header
        gen-control"
    data-path="system.bond_state.burdens"
    data-action="append"
    data-action-value="(struct)counter"
    data-tooltip={tooltipEnabled ? addBurdenTip : undefined}
    data-tooltip-class="clipped-bot la-tooltip"
    data-tooltip-direction={TooltipDirection.UP}
    aria-label={getLocalized("LA.pilot.bond.burden.add.tooltip")}
    onpointerenter={ event => sendToLog(event, getLocalized("LA.pilot.bond.burden.add.tooltip"), TextLogHook.PilotHeader) }
    onpointerleave={ event => resetLog(event, TextLogHook.PilotHeaderReset) }
    disabled={system.bond}
></button>
{/snippet}
<HeaderMain
    text={getLocalized("LA.pilot.bond.burden.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-weapon"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-weapon"]}
    
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
                    usesValue={burden.value}
                    usesMax={burden.max}
                    path={`system.bond_state.burdens.${index}`}
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
    <details class="la-details -widthfull la-combine-v"
    >
        <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1-l -widthfull">
            <div class="la-left la-combine-h">
                <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
                <span class="la-name__span -fontsize2">{getLocalized("LA.pilot.bond.burden.empty.label")}</span>
            </div>
        </summary>
        <div class="la-details__wrapper -bordersround -bordersoff">
            <div class="la-warn__span la-details__span la-text-repcap -padding3 -fontsize3 -textaligncenter -widthfull -upper">{getLocalized("LA.pilot.bond.burden.empty.subLabel")}</div>
        </div>
    </details>
{/if}
</HeaderMain>
{/if}