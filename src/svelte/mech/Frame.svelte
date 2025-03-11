<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { getManufacturerColor } from "@/scripts/theme";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import FrameActivePower from "@/svelte/mech/FrameActivePower.svelte";
    import FramePassivePower from "./FramePassivePower.svelte";
    import FrameTrait from "./FrameTrait.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE, H2_ICON_SIZE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import CounterBox from "@/svelte/actor/CounterBox.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";

    const props: MechSheetProps = $props();  
    const {
        actor,
        system,
    } = props;

    let frame: any | undefined = system.loadout.frame?.value;
    let core: any = frame?.system.core_system;
    let frameName: string = frame
        ? `${frame.system.manufacturer.toUpperCase()} ${frame.name.toUpperCase()}`
        : getLocalized("LA.placeholder");
    let frameColorBckg: string = frame 
        ? getManufacturerColor(frame.system.manufacturer, "bckg")
        : "la-bckg-frame";
    let frameColorBrdr: string = frame 
        ? getManufacturerColor(frame.system.manufacturer, "brdr")
        : "la-brdr-frame";
    let collID = frame
        ? `${actor.uuid}.frame.${frame.id}`
        : `${actor.uuid}.frame.empty`;

    //@ts-ignore
    function log(...args: any[])
    {
        console.log(args);
    }
</script>

{#snippet headerOptions()}
    <CollapseAllButton
        collapseID={collID}
    />
{/snippet}
{#snippet headerSecondaryLeftOptions()}
    <i class="{H2_ICON_SIZE} cci cci-corebonus"></i>
{/snippet}

<HeaderMain
    text={frame ? frameName : getLocalized("LA.placeholder")}
    headerStyle={[MAIN_HEADER_STYLE, frameColorBckg]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={[frameColorBrdr]}

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
                    name={counter.name}
                    usesValue={counter.value}
                    usesMax={counter.max}
                    path={`system.loadout.frame.value.system.core_system.counters.${index}`}
                    style={["clipped-bot-alt", "-widthfull", "la-bckg-header-anti"]}
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
            headerContentLeft={headerSecondaryLeftOptions}
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
    <details class="la-details -widthfull la-combine-v -empty">
        <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -widthfull">
            <div class="la-left la-combine-h">
                <i class="la-icon mdi mdi-card-off-outline -fontsize2"></i>
                <span class="la-name__span -fontsize2">{getLocalized("LA.mech.frame.empty.label")}</span>
            </div>
        </summary>
        <div class="la-details__wrapper -bordersround -bordersoff">
            <div class="la-warn__span la-details__span la-text-repcap -padding3 -fontsize3 -textaligncenter -widthfull">{getLocalized("LA.mech.frame.empty.subLabel")}</div>
        </div>
    </details>
{/if}
</HeaderMain>