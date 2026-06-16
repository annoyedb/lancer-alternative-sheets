<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { getCSSDocumentTheme, getManufacturerColor } from "@/scripts/theme";
    import { getMechSheetTooltipEnabled } from "@/scripts/mech/settings";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { CounterBoxType } from "@/enums/CounterBoxType";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import FrameActivePower from "@/svelte/mech/FrameActivePower.svelte";
    import FramePassivePower from "@/svelte/mech/FramePassivePower.svelte";
    import FrameTrait from "@/svelte/mech/FrameTrait.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE, H2_ICON_SIZE, H2_TEXT_SIZE } from "@/svelte/shared/header/HeaderSecondary.svelte";
    import CounterBox from "@/svelte/shared/counter/CounterBox.svelte";
    import TagArray from "@/svelte/shared/TagArray.svelte";
    import CollapseAllButton from "@/svelte/shared/button/CollapseAllButton.svelte";
    import EmptyBox from "@/svelte/shared/EmptyBox.svelte";

    const props: MechSheetProps = $props();  
    const {
        actor,
        system,
    } = $derived(props);
    let collapseAllButtonHover = $state(false);

    const tooltipEnabled = getMechSheetTooltipEnabled();
    const frame = $derived(system.loadout.frame?.value);
    const core = $derived(frame?.system.core_system);
    const frameName: string = $derived(frame
        ? `${frame.system.manufacturer} ${frame.name}`
        : getLocalized("LA.placeholder"));
    const frameColorBckg: string = $derived(frame
        ? getManufacturerColor(frame.system.manufacturer, "bckg")
        : "la-bckg-frame");
    const frameColorBrdr: string = $derived(frame
        ? getManufacturerColor(frame.system.manufacturer, "brdr")
        : "la-brdr-frame");
    const collID = $derived(frame
        ? `${actor.uuid}.frame.${frame.id}`
        : `${actor.uuid}.frame.empty`);
    const theme = $derived(getCSSDocumentTheme(actor.uuid));
</script>

{#snippet headerOptions()}
    <CollapseAllButton
        collapseID={collID}
        tooltipEnabled={tooltipEnabled}
        tooltipTheme={theme}
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}

        onPointerEnter={() => {collapseAllButtonHover = true;}}
        onPointerLeave={() => {collapseAllButtonHover = false;}}
    />
{/snippet}
{#snippet headerSecondaryLeftOptions()}
    <i class="{H2_ICON_SIZE} cci cci-corebonus"></i>
{/snippet}

<HeaderMain
    text={frame ? frameName : getLocalized("LA.placeholder")}
    headerStyle={[MAIN_HEADER_STYLE, frameColorBckg, "-upper"]}
    textStyle={["la-text-header -fontsize4 -overflowhidden"]}
    borderStyle={[frameColorBrdr]}
    extensionTextFunction={() => {
        if (collapseAllButtonHover)
            return `--${getLocalized("LA.collapseAll.extension")}`;
        return undefined;
    }}

    collapseID={collID}
    startCollapsed={true}

    headerContent={headerOptions}
>
{#if frame}
    <div class="la-generated -widthfull -gap1 la-flexcol">
        {#snippet outerContent()}
            {#if core.counters?.length}
            <div class="la-flexcol -widthfull -padding2-l">
            {#each core.counters as counter, index}
                <CounterBox
                    text={counter.name}
                    type={CounterBoxType.Counter}
                    usesValue={counter.value}
                    usesMax={counter.max}
                    path="system.loadout.frame.value.system.core_system.counters.{index}"
                    style={["clipped-bot-alt -widthfull la-bckg-header-anti"]}
                    
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}
                />
            {/each}
            </div>
            {/if}
        {/snippet}
        <!-- FRAME POWER -->
        <HeaderSecondary
            text={core.name}
            headerStyle={[H2_HEADER_STYLE, frameColorBckg]}
            textStyle={[H2_TEXT_SIZE, "-fontface-stylized"]}
            borderStyle={["-bordersoff"]}

            collapseID={`${collID}.core`}
            startCollapsed={true}

            renderOutsideCollapse={outerContent}
            contentLeft={headerSecondaryLeftOptions}
        >
            <div class="la-flexcol -widthfull -gap0">
                <FrameActivePower {...props} />
                <FramePassivePower {...props} />
            {#if core.tags?.length}
                <TagArray
                    tags={core.tags}

                    tooltipEnabled={tooltipEnabled}
                    tooltipTheme={theme}
                />
            {/if}
            </div>
        </HeaderSecondary>
        <FrameTrait {...props} />
    </div>
{:else}
    <EmptyBox
        label={getLocalized("LA.mech.frame.empty.label")}
        subLabel={getLocalized("LA.mech.frame.empty.subLabel")}
    />
{/if}
</HeaderMain>