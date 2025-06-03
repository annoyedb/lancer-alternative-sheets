<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { getSheetStore, setSheetStore } from "@/scripts/store/module-store";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";
    import { getDocumentTheme, getSidebarImageTheme } from "@/scripts/theme";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import MechStats from "@/svelte/pilot/MechStats.svelte";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import EmptyBox from "@/svelte/actor/EmptyBox.svelte";
    
    const props = $props();
    const {
        actor,
        system,
    } = props;
    const ownedMechs: any[] = game.actors?.filter((mech: any) => 
        mech.type === "mech" && 
        mech.system.pilot?.status === "resolved" && 
        mech.system.pilot.value.id === actor.id) ?? [];
    let selectedMechIndex = $state(getSheetStore(actor.uuid).selectedMech);

    const qualityMode = true; // TODO: change to a setting
    const themeOverride = getSheetStore(actor.uuid).currentTheme;
    const collID = `${actor.uuid}.mechStorage`;
    const tooltipEnabled = getPilotSheetTooltipEnabled();
    const activateTip = TooltipFactory.buildTooltip(getLocalized("LA.pilot.mechStorage.activate.tooltip"));
    const deactivateTip = TooltipFactory.buildTooltip(getLocalized("LA.pilot.mechStorage.deactivate.tooltip"));

    function isInactive()
    {
        return !system.active_mech || system.active_mech.id !== ownedMechs[selectedMechIndex].uuid;
    }
    
    function getGlowColor()
    {
        return isInactive() ? "la-prmy-system" : "la-prmy-text";
    }

    function getSizeTip()
    {
        return TooltipFactory.buildTooltip(getLocalized("LA.size.tooltip"), `${getLocalized("LA.size.label")} ${ownedMechs[selectedMechIndex].system.size}`);
    }

    function getSpeedTip()
    {
        return TooltipFactory.buildTooltip(getLocalized("LA.speed.tooltip"), `${getLocalized("LA.speed.label")} ${ownedMechs[selectedMechIndex].system.speed}`);
    }

    function handleMechSelect(event: Event, index: number)
    {
        event.stopPropagation();

        selectedMechIndex = index;
        setSheetStore(actor.uuid, {
            selectedMech: index
        });
    }

    function setActiveMech(event: Event)
    {
        event.stopPropagation();

        if (system.active_mech && system.active_mech.id === ownedMechs[selectedMechIndex].uuid)
        {
            actor.update({
                ["system.active_mech"]: null
            })
        }
        else
        {
            ownedMechs[selectedMechIndex].update({
                ["system.pilot"]: actor.uuid
            });
            actor.update({
                ["system.active_mech"]: ownedMechs[selectedMechIndex].uuid
            })
        }
    }
</script>

{#if ownedMechs.length}
<div class="la-bg-scroll-alt la-combine-v -widthfull -margin1-b -padding1-tb la-reveal-hover">
    <div class="-positionrelative -widthfull la-reveal">
        <span class="la-selected-mech__active -positionabsolute {isInactive() ? "la-text-error" : "la-text-system"} la-outl-header -bold -textaligncenter -letterspacing1 -widthfull -height3 -lineheight3 la-bckg-darken-2">
        {#if isInactive()}
            {getLocalized("LA.pilot.mechstorage.inactive.label")}
        {:else}
            {getLocalized("LA.pilot.mechstorage.active.label")}
        {/if}
        </span>
    </div>
    <button 
        class="-fontsize4 -letterspacing1 -upper -glow-hover-primary
            ref set click-open"
        data-uuid={ownedMechs[selectedMechIndex].uuid}
        onpointerenter={ event => sendToLog(event, getLocalized("LA.pilot.mechStorage.open.tooltip"), TextLogHook.PilotHeader) }
        onpointerleave={ event => resetLog(event, TextLogHook.PilotHeaderReset) }
        draggable={true}
    >
        {ownedMechs[selectedMechIndex].name}
    </button>
    <span class="-fontsize1 -letterspacing0 -upper">
        {ownedMechs[selectedMechIndex].system.loadout.frame?.value.system.manufacturer || 
        getLocalized("LA.placeholder")}
    </span>
    <img
        class="la-selected-mech__img"
        src={ ownedMechs[selectedMechIndex].img === "systems/lancer/assets/icons/mech.svg" ? "modules/lancer-alternative-sheets/assets/nodata.png" : ownedMechs[selectedMechIndex].img }
        alt={getLocalized("LA.placeholder")}
    />
    <div class="la-combine-v -positionabsolute -right0">
        <div class=" -fontsize13">
        {#if ownedMechs[selectedMechIndex].system.size < 1}
            <i class="cci cci-size-half {getSidebarImageTheme("text", themeOverride)} la-outl-shadow"
                data-tooltip={tooltipEnabled ? getSizeTip() : undefined}
                data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                data-tooltip-direction={TooltipDirection.LEFT}></i>
        {:else}
            <i class="cci cci-size-{ownedMechs[selectedMechIndex].system.size} {getSidebarImageTheme("text", themeOverride)} la-outl-shadow"
                data-tooltip={tooltipEnabled ? getSizeTip() : undefined}
                data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                data-tooltip-direction={TooltipDirection.LEFT}></i>
        {/if}
        </div>
        <div class=" la-combine-h -fontsize7" 
            data-tooltip={tooltipEnabled ? getSpeedTip() : undefined}
            data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
            data-tooltip-direction={TooltipDirection.LEFT}>
            <i class="mdi mdi-arrow-right-bold-hexagon-outline {getSidebarImageTheme("text", themeOverride)} la-outl-shadow"></i>
            <span class="{getSidebarImageTheme("text", themeOverride)} la-outl-shadow -bold">{ownedMechs[selectedMechIndex].system.speed}</span>
        </div>
    </div>
    <div class="-positionrelative">
        <button type="button"
            class="la-combine-h -widthfull -fontsize10 -positionabsolute -bottom0 
                {isInactive() ? "cci cci-activate la-text-system" : "cci cci-deactivate la-text-weapon"} 
                {qualityMode ? "-glow-prmy la-prmy-primary -glow-prmy-hover " + getGlowColor() : ""}"
            data-tooltip={tooltipEnabled 
                ? isInactive() ? activateTip : deactivateTip 
                : undefined}
            data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
            data-tooltip-direction={TooltipDirection.DOWN}
            onpointerenter={ event => sendToLog(event, isInactive()
                    ? getLocalized("LA.pilot.mechStorage.activate.tooltip") 
                    : getLocalized("LA.pilot.mechStorage.deactivate.tooltip"), 
                TextLogHook.PilotHeader) }
            onpointerleave={ event => resetLog(event, TextLogHook.PilotHeaderReset) }
            aria-label={isInactive() ? activateTip : deactivateTip }
            onclick={setActiveMech}
        ></button>
    </div>
</div>
<!-- Selectable Mechs -->
<HeaderMain
    text={getLocalized("LA.tab.mechs.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-transparent", "la-bckg-card", "clipped-bot-alt"]}

    collapseID={collID}
    startCollapsed={true}
>
    <div class="la-combine-v -widthfull">
        <div class="la-available-mechs__list"
            onpointerenter={ event => sendToLog(event, getLocalized("LA.pilot.mechStorage.select.tooltip"), TextLogHook.PilotHeader) }
            onpointerleave={ event => resetLog(event, TextLogHook.PilotHeaderReset) }
        >
            <div class=" la-combine-h -justifystart -padding0-b">
            {#each ownedMechs as mech, index}
                <button type="button"
                    class="la-combine-v -bordersround {selectedMechIndex === index ? "la-brdr-accent" : "la-brdr-transparent"}"
                    onclick={event => handleMechSelect(event, index)}
                    aria-label={getLocalized("LA.pilot.mechStorage.select.tooltip")}
                >
                    <img 
                        class="la-available-mechs__img"
                        src={mech.img}
                        alt={getLocalized("LA.placeholder")}
                    >
                    <span class="-fontsize0">
                        {mech.name}
                    </span>
                </button>
            {/each}
            </div>
        </div>
    </div>
</HeaderMain>
<!-- Mech Stats -->
<MechStats
    actor={actor}
    selectedMech={ownedMechs[selectedMechIndex]}
/>
{:else}
    <EmptyBox
        label={getLocalized("LA.pilot.mechStorage.empty.label")}
        subLabel={getLocalized("LA.pilot.mechStorage.empty.subLabel")}
    />
{/if}