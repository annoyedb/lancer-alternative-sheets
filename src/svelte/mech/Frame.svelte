<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { getDocumentTheme, getManufacturerColor } from "@/scripts/theme";
    import { getMechSheetTooltipEnabled } from "@/scripts/mech/settings";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { CounterBoxType } from "@/enums/CounterBoxType";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import FrameActivePower from "@/svelte/mech/FrameActivePower.svelte";
    import FramePassivePower from "@/svelte/mech/FramePassivePower.svelte";
    import FrameTrait from "@/svelte/mech/FrameTrait.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE, H2_ICON_SIZE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import CounterBox from "@/svelte/actor/counter/CounterBox.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import EmptyBox from "@/svelte/actor/EmptyBox.svelte";

    const props: MechSheetProps = $props();  
    const {
        actor,
        system,
    } = props;
    let collapseAllButtonHover = $state(false);

    const tooltipEnabled = getMechSheetTooltipEnabled();
    const frame: any | undefined = system.loadout.frame?.value;
    const core: any = frame?.system.core_system;
    const frameName: string = frame
        ? `${frame.system.manufacturer} ${frame.name}`
        : getLocalized("LA.placeholder");
    const frameColorBckg: string = frame 
        ? getManufacturerColor(frame.system.manufacturer, "bckg")
        : "la-bckg-frame";
    const frameColorBrdr: string = frame 
        ? getManufacturerColor(frame.system.manufacturer, "brdr")
        : "la-brdr-frame";
    const collID = frame
        ? `${actor.uuid}.frame.${frame.id}`
        : `${actor.uuid}.frame.empty`;
</script>

{#snippet headerOptions()}
    <CollapseAllButton
        collapseID={collID}
        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getDocumentTheme(actor.uuid)}
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
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
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
    <div class="la-generated la-combine-v -widthfull -gap0">
        {#snippet outerContent()}
            {#if core.counters?.length}
            <div class="la-combine-v -widthfull -padding2-l">
            {#each core.counters as counter, index}
                <CounterBox
                    text={counter.name}
                    type={CounterBoxType.Counter}
                    usesValue={counter.value}
                    usesMax={counter.max}
                    path="system.loadout.frame.value.system.core_system.counters.{index}"
                    style={["clipped-bot-alt", "-widthfull", "la-bckg-header-anti"]}
                    
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
            textStyle={["-fontsize2"]}
            borderStyle={["-bordersoff"]}

            collapseID={`${collID}.core`}
            startCollapsed={true}

            renderOutsideCollapse={outerContent}
            contentLeft={headerSecondaryLeftOptions}
        >
            <div class="la-combine-v -widthfull -gap0">
                <FrameActivePower {...props} />
                <FramePassivePower {...props} />
            {#if core.tags?.length}
                <TagArray 
                    tags={core.tags}
                    path={"system.loadout.frame.value.system.core_system.tags"}
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