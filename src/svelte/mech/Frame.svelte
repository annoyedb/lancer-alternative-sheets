<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { getManufacturerColor } from "@/scripts/theme";
    import HeaderMain from "@/svelte/actor/HeaderMain.svelte";
    import FrameActivePower from "@/svelte/mech/FrameActivePower.svelte";
    import FramePassivePower from "./FramePassivePower.svelte";
    import FrameTrait from "./FrameTrait.svelte";
    import HeaderSecondary from "@/svelte/actor/HeaderSecondary.svelte";
    import CounterBox from "@/svelte/actor/CounterBox.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";

    const props: MechSheetProps = $props();  
    const {
        actor,
        collapse,
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
        ? `${actor.uuid}_${frame.id}`
        : `${actor.uuid}_frameempty`;

    //@ts-ignore
    function log(...args: any[])
    {
        console.log(args);
    }
</script>

<HeaderMain
    title={frame ? frameName : getLocalized("LA.placeholder")}
    headerStyle={[frameColorBckg, "clipped-top", "-padding0-tb", "-padding3-lr"]}
    headerFontStyle={["la-text-header", "-fontsize2"]}
    borderStyle={[frameColorBrdr]}

    collapse={collapse}
    collapseID={collID}
    startCollapsed={true}

    collapseAllOption={true}
>
{#if frame}
    <div class="la-generated la-combine-v -widthfull -gap0">
        <!-- FRAME POWER -->
        <HeaderSecondary
            title={core.name}
            headerStyle={[frameColorBckg, "clipped-bot-alt", "-padding0", "-padding3-r", "la-text-header"]}
            headerIconStyle={["cci", "cci-corebonus", "-fontsize5", "-lineheight3"]}
            borderStyle={["-bordersoff"]}
            collapse={collapse}
            collapseID={`${collID}_core`}
            startCollapsed={true}
        >
            <div class="la-generated la-combine-v -widthfull -gap0">
            {#if core.counters?.length}
            {#each core.counters as counter, index}
                <CounterBox
                    name={counter.name}
                    usesValue={counter.value}
                    usesMax={counter.max}
                    path={`system.loadout.frame.value.system.core_system.counters.${index}`}
                />
            {/each}
            {/if}
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