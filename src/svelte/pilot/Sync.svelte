<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { getBrightness } from "@/scripts/theme";
    import { getSheetStore } from "@/scripts/store/module-store";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import GlyphButton from "@/svelte/actor/button/GlyphButton.svelte";

    const {
        actor,
        system,
        pilotCache,
    } = $props();
    let cloudID = $state(system.cloud_id || "");

    const collID = `${actor.uuid}.sync`;
    const tooltipEnabled = getPilotSheetTooltipEnabled();

    function overridePilotIDWithCloudID(event: Event)
    {
        event.stopPropagation();

        cloudID = (event.target as HTMLSelectElement).value;
    }

    function getGlowColor()
    {
        return getBrightness(getSheetStore(actor.uuid).currentTheme) === "dark" ? "la-text-text" : "la-text-secondary";
    }
</script>

<HeaderMain
    text={getLocalized("LA.pilot.sync.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-primary"]}
    
    collapseID={collID}
    startCollapsed={false}
>
    <EffectBox
        name={getLocalized("LA.pilot.sync.download.label")}
    >
        <div class="la-combine-h -aligncenter -widthfull -gap1">
            <GlyphButton
                style={["la-combine-v", "mdi mdi-cloud-download", "-fontsize5", getGlowColor(), "-glow-header", "-glow-primary-hover", "-padding1-lr"]}
                flowClass={FlowClass.DownloadFromCloud}
                action="download"

                tooltipEnabled={tooltipEnabled}
                tooltip={getLocalized("LA.pilot.sync.download.tooltip")}
                tooltipDirection={TooltipDirection.LEFT}
                logText={getLocalized("LA.pilot.sync.download.tooltip")}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            >
                <span class="-fontsize0 -upper">
                    SYNC
                </span>
            </GlyphButton>
            <div class="la-combine-v -widthfull -gap0">
                {#if pilotCache?.length}
                <select
                    class="la-sync__select -textaligncenter la-bckg-transparent la-text-text la-brdr-text"
                    name="selectCloudId"
                    data-type="text"
                    onchange={event => overridePilotIDWithCloudID(event)}
                >
                {#each pilotCache as pilot}
                    <option value={pilot.id}
                        selected={pilot.id === cloudID}
                    >
                        {`${pilot.callsign} - ${pilot.name}`}
                    </option>
                {/each}
                </select>
                {/if}
                <input type="text"
                    class="-bordersround -small la-text-text -padding1-lr"
                    name="system.cloud_id"
                    value={cloudID}
                    data-dtype="string"
                    placeholder={getLocalized("LA.pilot.sync.download.subLabel")}
                />
            </div>
        </div>
    </EffectBox>
    <EffectBox
        name={getLocalized("LA.pilot.sync.import.label")}
    >
        <input type="file" 
            class="la-text-text
                lcp-up"
            id="pilot-json-import" 
            name="pilot-json-up" 
            accept=".json"
        >
    </EffectBox>
</HeaderMain>