<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/actor/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { getManufacturerColor } from "@/scripts/theme";
    import HeaderMain from "@/svelte/actor/HeaderMain.svelte";
    import FrameActivePower from "@/svelte/mech/FrameActivePower.svelte";
    import FramePassivePower from "./FramePassivePower.svelte";
    import FrameTrait from "./FrameTrait.svelte";
    import HeaderSecondary from "../actor/HeaderSecondary.svelte";

    const props: MechSheetProps = $props();  
    const {
        actor,
        collapse,
        system,
    } = props;

    let frame: any | undefined = system.loadout.frame?.value;
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
</script>

<HeaderMain
    title={frame ? frameName : getLocalized("LA.placeholder")}
    headerStyle={[frameColorBckg, "clipped-top", "-padding0-tb", "-padding3-lr"]}
    borderStyle={[frameColorBrdr]}
    collapse={collapse}
    collapseID={collID}
    startCollapsed={true}
>
    <div class="la-combine-h clipped-alt la-bckg-pilot la-text-header -padding0 -aligncenter">
        <span class="-fontsize1"><!--
        --->{system.core_energy ? getLocalized("LA.mech.core.online.label") : getLocalized("LA.mech.core.offline.label")}<!--
    ---></span>
        <input 
            name="system.core_energy" 
            class="core-power-toggle mdi mdi-battery-outline la-text-repcap -fontsize5" 
            type="checkbox" 
            data-dtype="Boolean"
            bind:checked={system.core_energy}
        />
    </div>
    {#if frame}
    <div class="la-generated la-combine-v -widthfull -gap1">
        <!-- FRAME POWER -->
        <HeaderSecondary
            title={frame.system.core_system.name}
            rootStyle={["-margin0-t"]}
            headerStyle={[frameColorBckg, "clipped-bot-alt", "-margin1-b", "-padding0", "-padding3-r", "la-text-header"]}
            headerIconStyle={["cci", "cci-corebonus", "-fontsize5", "-lineheight3"]}
            borderStyle={["-borderoff"]}
            collapse={collapse}
            collapseID={`${collID}_core`}
            startCollapsed={false}
        >
            <FrameActivePower {...props} />
            <FramePassivePower {...props} />
            <!-- TODO: TAGS -->
        </HeaderSecondary>
        <FrameTrait {...props} />
    </div>
    {:else}
    <details class="la-details -widthfull la-combine-v -empty">
        <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header">
            <div class="la-left la-combine-h">
                <i class="la-icon mdi mdi-card-off-outline -fontsize2"></i>
                <span class="la-name__span -fontsize2">{getLocalized("LA.mech.frame.empty.label")}</span>
            </div>
        </summary>
        <div class="la-details-wrapper -borderoff">
            <span class="la-warn__span la-details__span la-text-repcap la-locked -fontsize3">{getLocalized("LA.mech.frame.empty.subLabel")}</span>
        </div>
    </details>
    {/if}
</HeaderMain>