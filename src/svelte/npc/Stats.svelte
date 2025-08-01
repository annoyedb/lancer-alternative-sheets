<script lang="ts">
    import { id as moduleID } from "@/module.json";
    import { getDocumentTheme, getSidebarImageTheme } from "@/scripts/theme";
    import { getLocalized, handleRelativeDataInput } from "@/scripts/helpers";
    import { setThemeOverride } from "@/scripts/npc/settings";
    import { getAdvancedState } from "@/scripts/store/advanced";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { getSheetStore } from "@/scripts/store/module-store";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import StatusBar from "@/svelte/actor/StatusBar.svelte";
    import StatComboShort from "@/svelte/actor/StatComboShort.svelte";
    import HaseDisplay from "@/svelte/npc/HaseDisplay.svelte";
    import AdvancedButton from "@/svelte/actor/button/AdvancedButton.svelte";
    import ThemeOverrideButton from "@/svelte/actor/button/ThemeOverrideButton.svelte";

    const props = $props();
    const {
        actor,
        system,
    }: NPCSheetProps = props;
    let advancedOptions = $derived(getAdvancedState(actor.uuid));
    let editingBurn = $state(false);
    let editingShield = $state(false);
    const themeOverride = getSheetStore(actor.uuid).currentTheme;
    const tooltipEnabled = getNPCSheetTooltipEnabled();

    const sizeTip = TooltipFactory.buildTooltip(getLocalized("LA.size.tooltip"), `${getLocalized("LA.size.label")} ${system.size}`);
    const speedTip = TooltipFactory.buildTooltip(getLocalized("LA.speed.tooltip"), `${getLocalized("LA.speed.label")} ${system.speed}`);
    const activateTip = TooltipFactory.buildTooltip(getLocalized("LA.activate.tooltip"), `Activations ${system.activations}`);
    const tierTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.tier.tooltip"), `Tier ${system.tier}`);
    const setTierTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.tier.set.tooltip"))
    const rechargeTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.recharge.tooltip"), getLocalized("LA.action.startofturn.label"));
    const notesEditTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.notes.edit.tooltip"));
    const notesTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.notes.tooltip"));
    const notesContent = TooltipFactory.buildTooltip(system.notes, getLocalized("LA.npc.notes.label"));
    const shieldTip = TooltipFactory.buildTooltip(getLocalized('LA.overshield.tooltip'));
    const burnTip = TooltipFactory.buildTooltip(getLocalized('LA.burn.tooltip'));
    
    function handleShowNotes(event: MouseEvent)
    {
        event.stopPropagation();
        TooltipFactory.renderTooltip(
            event, 
            { 
                text: notesContent, 
                direction: TooltipDirection.RIGHT,
                locked: true,
            } 
        );
    }
</script>

<div class="la-bg-scroll la-bckg-background la-shadow -medium -inset -widthfull -heightfull">
    <div class="la-combine-h la-dropshadow -justifyevenly">
    <!-- Left Side -->
        <div class="la-combine-v -gap1">
            <!-- Tier Options -->
            <div class="la-combine-h -height2 ">
                <div class="">
                    <button type="button"
                        class="la-bckg-secondary -width2
                            clicker-minus-button input-update"
                        data-tooltip={tooltipEnabled ? setTierTip : undefined}
                        data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                        data-tooltip-direction={"UP"}
                        aria-label={getLocalized("LA.subtract.label")}
                    >-</button><!--
                ---><input
                        class="-height2 la-shadow -medium -inset la-text-text
                            lancer-stat minor"
                        type={"number"}
                        data-dtype={"Number"}
                        value={`${system.tier}`}
                        name={`system.tier`}
                        data-tooltip={tooltipEnabled ? setTierTip : undefined}
                        data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                        data-tooltip-direction={"UP"}
                    /><!--
                ---><button type="button"
                        class="la-bckg-secondary -width2
                            clicker-plus-button input-update"
                        data-tooltip={tooltipEnabled ? setTierTip : undefined}
                        data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                        data-tooltip-direction={"UP"}
                        aria-label={getLocalized("LA.add.label")}
                    >+</button>
                </div>
            </div>
            <div class="la-combine-h -widthfull -heightfull">
                <!-- Left Side Floating Stats -->
                <div class="la-stat__island -positionrelative la-dropshadow">
                    <div class="la-combine-v -positionabsolute -top0 -left0 -fontsize9">
                        <i class="cci cci-npc-tier-{system.tier} {getSidebarImageTheme("text", themeOverride)} la-outl-shadow"
                            data-tooltip={tooltipEnabled ? tierTip : undefined}
                            data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                            data-tooltip-direction={TooltipDirection.RIGHT}></i>
                    {#if system.size < 1}
                        <i class="cci cci-size-half {getSidebarImageTheme("text", themeOverride)} la-outl-shadow"
                            data-tooltip={tooltipEnabled ? sizeTip : undefined}
                            data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                            data-tooltip-direction={TooltipDirection.RIGHT}></i>
                    {:else}
                        <i class="cci cci-size-{system.size} {getSidebarImageTheme("text", themeOverride)} la-outl-shadow"
                            data-tooltip={tooltipEnabled ? sizeTip : undefined}
                            data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                            data-tooltip-direction={TooltipDirection.RIGHT}></i>
                    {/if}
                        <div class="la-combine-h" 
                            data-tooltip={tooltipEnabled ? speedTip : undefined}
                            data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                            data-tooltip-direction={TooltipDirection.RIGHT}>
                            <i class="mdi mdi-arrow-right-bold-hexagon-outline {getSidebarImageTheme("text", themeOverride)} la-outl-shadow -fontsize6"></i>
                            <span class="{getSidebarImageTheme("text", themeOverride)} la-outl-shadow -fontsize6 -bold">{system.speed}</span>
                        </div>
                        <div class="la-combine-h -aligncenter" 
                            data-tooltip={tooltipEnabled ? activateTip : undefined}
                            data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                            data-tooltip-direction={TooltipDirection.RIGHT}>
                            <i class="cci cci-activate {getSidebarImageTheme("text", themeOverride)} la-outl-shadow -fontsize6"></i>
                            <span class="{getSidebarImageTheme("text", themeOverride)} la-outl-shadow -fontsize6 -bold">{system.activations}</span>
                        </div>
                        <div class="la-recharge -lineheight3 -width6 -height6 la-prmy-primary -glow-prmy-hover">
                            <button type="button"
                                class="mdi mdi-refresh-circle la-text-secondary -fontsize6
                                    charge-macro"
                                data-tooltip={tooltipEnabled ? rechargeTip : undefined}
                                data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                                data-tooltip-direction={TooltipDirection.RIGHT}
                                aria-label={getLocalized("LA.npc.recharge.tooltip")}
                            >
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Actor Image -->
                <img class="la-npc__img
                        profile-img ref set"
                    src="{actor.img}"
                    alt={`modules/${moduleID}/assets/nodata.png`}
                    data-edit="img" 
                    data-uuid="{actor.uuid}"
                />
                <HaseDisplay {...props} />
            </div>
        </div>
        <!-- Right Side -->
        <div class="la-combine-h -padding1-r">
            <div class="la-combine-v -gap1">
                <div class="la-combine-h -height2 -justifybetween -widthfull">
                    <!-- Advanced options, theme override, notes, etc -->
                    <div class="la-combine-h -gap1">
                        <AdvancedButton
                            uuid={actor.uuid}
                            style={["-lineheight3", "la-prmy-primary -glow-prmy-hover"]}
                            iconStyle={["-fontsize5"]}

                            tooltipEnabled={getPilotSheetTooltipEnabled()}
                            tooltipTheme={getDocumentTheme(actor.uuid)}
                            tooltipDirection={TooltipDirection.UP}
                        />
                    {#if advancedOptions}
                        <ThemeOverrideButton
                            uuid={actor.uuid}
                            style={["-lineheight3"]}
                            iconStyle={["-fontsize2"]}
                            setOverride={setThemeOverride}

                            tooltipEnabled={getPilotSheetTooltipEnabled()}
                            tooltipTheme={getDocumentTheme(actor.uuid)}
                            tooltipDirection={TooltipDirection.UP}
                        />
                    {/if}
                    </div>
                    <div class="la-combine-h -gap1">
                        <button type="button"
                            class="mdi mdi-note-edit -fontsize2 la-prmy-primary -glow-prmy-hover {advancedOptions ? "" : "-visibilityhidden"}
                                popout-text-edit-button"
                            data-tooltip={notesEditTip}
                            data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                            data-tooltip-direction={TooltipDirection.UP}
                            aria-label={getLocalized("LA.npc.notes.tooltip")}
                            data-path={`system.notes`}
                        >
                        </button>
                        <button type="button"
                            class="mdi mdi-information -fontsize2 la-prmy-primary -glow-prmy-hover"
                            data-tooltip={notesTip}
                            data-tooltip-class="clipped-bot la-tooltip -scrollbar {getDocumentTheme(actor.uuid)}"
                            data-tooltip-direction={TooltipDirection.UP}
                            aria-label={getLocalized("LA.npc.notes.label")}
                            onclick={(event) => handleShowNotes(event)}
                        >
                        </button>
                    </div>
                </div>
                <div class="-flex1">
                    <!-- Mech Stats 1 -->
                    <div class="la-stats la-combine-h -justifyevenly">
                        <StatComboShort
                            icon={"cci cci-role-defender"}
                            label={getLocalized("LA.armor.short")}
                            value={system.armor}
                            outerStyle={["-fontsize5"]}
                            innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getDocumentTheme(actor.uuid)}
                            tooltip={getLocalized("LA.armor.tooltip")}
                            tooltipDirection={TooltipDirection.LEFT}
                            />
                        <StatComboShort
                            icon={"cci cci-evasion"}
                            label={getLocalized("LA.evasion.short")}
                            value={system.evasion}
                            outerStyle={["-fontsize5"]}
                            innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getDocumentTheme(actor.uuid)}
                            tooltip={getLocalized("LA.evasion.tooltip")}
                            tooltipDirection={TooltipDirection.LEFT}
                        />
                        <StatComboShort
                            icon={"cci cci-edef"}
                            label={getLocalized("LA.edefense.short")}
                            value={system.edef}
                            outerStyle={["-fontsize5"]}
                            innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getDocumentTheme(actor.uuid)}
                            tooltip={getLocalized("LA.edefense.tooltip")}
                            tooltipDirection={TooltipDirection.LEFT}
                        />
                    </div>
                    <!-- Mech Bars -->
                    <div class="la-damage -margin0-lr -margin2-tb">
                        <div class="la-combine-h -gap2">
                            <div class="la-visuals -flex5">
                                <!-- HP, SHIELD (BAR) -->
                                <StatusBar
                                    name={getLocalized("LA.hitpoint.short")}
                                    dataName="system.hp.value"
                                    currentValue={system.hp.value}
                                    maxValue={system.hp.max}
                                    barStyle={["la-bckg-bar-health"]}
                                    barEditStyle={["la-prmy-bar-health"]}
                                    currentValueSecondary={system.overshield.value}
                                    maxValueSecondary={system.hp.max}
                                    barStyleSecondary={["la-bckg-bar-shield", "-shield"]}
                                    barEditStyleSecondary={["la-prmy-bar-shield"]}
                                    textStyle={["la-text-text"]}
                                    clipPath={"clipped"}
                                    editSecondary={editingShield}
                                    
                                    tooltipEnabled={tooltipEnabled}
                                    tooltipTheme={getDocumentTheme(actor.uuid)}
                                    tooltipDirection={TooltipDirection.LEFT}
                                    tooltip={getLocalized("LA.hitpoint.tooltip")}
                                />
                                <div class="la-spacer -tiny"></div>
                                <!-- STRUCTURE -->
                                <StatusBar
                                    name={getLocalized("LA.structure.label")}
                                    dataName="system.structure.value"
                                    currentValue={system.structure.value}
                                    maxValue={system.structure.max}
                                    textStyle={["la-text-text"]}
                                    barStyle={["la-bckg-bar-structure"]}
                                    barEditStyle={["la-prmy-bar-structure"]}
                                    clipPath={"clipped-alt"}

                                    tooltipEnabled={tooltipEnabled}
                                    tooltipTheme={getDocumentTheme(actor.uuid)}
                                    tooltipDirection={TooltipDirection.LEFT}
                                    tooltip={getLocalized("LA.structure.tooltip")}
                                />
                            </div>
                            <!-- SHIELD (VALUE) -->
                            <div class="la-combine-v -divider la-prmy-bar-shield -flex0 -width3ch -textaligncenter la-prmy-bar-shield -glow-prmy">
                                <input type="number" 
                                    class="la-damage__input la-shadow -medium -inset la-text-text -width5 -heightfull -bordersround-lrt -small -bordersoff"
                                    name="system.overshield.value" 
                                    data-dtype="Number"
                                    value="{system.overshield.value}"
                                    onfocus={(event) => {event.currentTarget.select(); editingShield = true;}}
                                    onblur={() => {editingShield = false;}}
                                    onchange={(event) => handleRelativeDataInput(event, system.overshield.value)}
                                >
                                <span class="la-damage__span -fontsize0 -heightfull -lineheight1"
                                    data-tooltip={tooltipEnabled ? shieldTip : undefined}
                                    data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                                    data-tooltip-direction="LEFT"
                                ><!--
                                --->{getLocalized("LA.overshield.short")}<!--
                            ---></span>
                            </div>
                        </div>

                        <div class="la-spacer -large"></div>

                        <div class="la-combine-h -gap2">
                            <div class="la-visuals -flex5">
                                <!-- HEAT -->
                                <StatusBar
                                    name={getLocalized("LA.heat.label")}
                                    dataName="system.heat.value"
                                    currentValue={system.heat.value}
                                    maxValue={system.heat.max}
                                    barStyle={["la-bckg-bar-heat"]}
                                    barEditStyle={["la-prmy-bar-heat"]}
                                    currentValueSecondary={system.burn}
                                    maxValueSecondary={system.heat.max}
                                    barStyleSecondary={["la-bckg-bar-burn", "-burn"]}
                                    barEditStyleSecondary={["la-prmy-bar-burn"]}
                                    textStyle={["la-text-text"]}
                                    clipPath={"clipped"}
                                    editSecondary={editingBurn}

                                    tooltipEnabled={tooltipEnabled}
                                    tooltipTheme={getDocumentTheme(actor.uuid)}
                                    tooltipDirection={TooltipDirection.LEFT}
                                    tooltip={getLocalized("LA.heat.tooltip")}
                                />
                                <div class="la-spacer -tiny"></div>
                                <!-- STRESS, BURN (BAR) -->
                                <StatusBar
                                    name={getLocalized("LA.stress.label")}
                                    dataName="system.stress.value"
                                    currentValue={system.stress.value}
                                    maxValue={system.stress.max}
                                    textStyle={["la-text-text"]}
                                    barStyle={["la-bckg-bar-stress"]}
                                    barEditStyle={["la-prmy-bar-stress"]}
                                    clipPath={"clipped-alt"}

                                    tooltipEnabled={tooltipEnabled}
                                    tooltipTheme={getDocumentTheme(actor.uuid)}
                                    tooltipDirection={TooltipDirection.LEFT}
                                    tooltip={getLocalized("LA.stress.tooltip")}
                                />
                            </div>
                            <!-- BURN (VALUE) -->
                            <div class="la-combine-v -divider la-prmy-bar-burn -flex0 -width3ch -textaligncenter la-prmy-bar-burn -glow-prmy">
                                <input type="number" 
                                    class="la-damage__input la-shadow -medium -inset la-text-text -width5 -heightfull -bordersround-lrt -small -bordersoff"
                                    name="system.burn" 
                                    data-dtype="Number"
                                    value="{system.burn}"
                                    onfocus={(event) => {event.currentTarget.select(); editingBurn = true;}}
                                    onblur={() => {editingBurn = false;}}
                                    onchange={(event) => handleRelativeDataInput(event, system.burn)}
                                >
                                <span class="la-damage__span -fontsize0 -heightfull -lineheight1"
                                    data-tooltip={tooltipEnabled ? burnTip : undefined}
                                    data-tooltip-class="clipped-bot la-tooltip {getDocumentTheme(actor.uuid)}"
                                    data-tooltip-direction="LEFT"
                                ><!--
                                --->{getLocalized("LA.burn.short")}<!--
                            ---></span>
                            </div>
                        </div>
                    </div>
                    <!-- Mech Stats 2 -->
                    <div class="la-stats la-combine-h -justifyevenly">
                        <StatComboShort
                            icon={"cci cci-tech-full"}
                            label={getLocalized("LA.tattack.short")}
                            value={system.tech_attack}
                            outerStyle={["-fontsize5"]}
                            innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getDocumentTheme(actor.uuid)}
                            tooltip={getLocalized("LA.tattack.tooltip")}
                            tooltipDirection={TooltipDirection.LEFT}
                        />
                        <StatComboShort
                            icon={"cci cci-save"}
                            label={getLocalized("LA.save.short")}
                            value={system.save}
                            outerStyle={["-fontsize5"]}
                            innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getDocumentTheme(actor.uuid)}
                            tooltip={getLocalized("LA.save.tooltip")}
                            tooltipDirection={TooltipDirection.LEFT}
                        />
                        <StatComboShort
                            icon={"cci cci-sensor"}
                            label={getLocalized("LA.sensor.short")}
                            value={system.sensor_range}
                            outerStyle={["-fontsize5"]}
                            innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getDocumentTheme(actor.uuid)}
                            tooltip={getLocalized("LA.sensor.tooltip")}
                            tooltipDirection={TooltipDirection.LEFT}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>