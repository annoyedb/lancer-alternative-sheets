<script lang="ts">
    import StatusBar from "@/svelte/actor/StatusBar.svelte";
    import StatComboShort from "@/svelte/actor/StatComboShort.svelte";
    import HaseDisplay from "@/svelte/npc/HaseDisplay.svelte";
    import { getSidebarImageTheme } from "@/scripts/theme";
    import { id as moduleID } from "@/module.json";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { getLocalized } from "@/scripts/helpers";

    const props = $props();
    const {
        actor,
        system,
    }: NPCSheetProps = props;

    let sizeTip = TooltipFactory.buildTooltip(getLocalized("LA.size.tooltip"), `Size ${system.size}`);
    let speedTip = TooltipFactory.buildTooltip(getLocalized("LA.speed.tooltip"), `Speed ${system.speed}`);
    let activTip = TooltipFactory.buildTooltip(getLocalized("LA.activate.tooltip"), `Activations ${system.activations}`);
    let tierTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.tier.tooltip"), `Tier ${system.tier}`);
    let setTierTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.tier.set.tooltip"))
    let rechargeTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.recharge.tooltip"), getLocalized("LA.action.startofturn.label"));
</script>

<div class="la-bckg-background la-shadow -medium -inset la-bg-scroll -widthfull -heightfull">
    <!-- Left Side Floating Stats -->
    <div class="la-stat__island -positionrelative la-dropshadow">
        <div class="la-combine-v -positionabsolute -top0 -left0 -fontsize9">
            <i class="cci cci-npc-tier-{system.tier} {getSidebarImageTheme("text")} la-outl-shadow"
                data-tooltip={tierTip}
                data-tooltip-class="clipped-bot la-tooltip"
                data-tooltip-direction="RIGHT"></i>
        {#if system.size < 1}
            <i class="cci cci-size-half {getSidebarImageTheme("text")} la-outl-shadow"
                data-tooltip={sizeTip}
                data-tooltip-class="clipped-bot la-tooltip"
                data-tooltip-direction="RIGHT"></i>
        {:else}
            <i class="cci cci-size-{system.size} {getSidebarImageTheme("text")} la-outl-shadow"
                data-tooltip={sizeTip}
                data-tooltip-class="clipped-bot la-tooltip"
                data-tooltip-direction="RIGHT"></i>
        {/if}
            <div class="la-combine-h" 
                data-tooltip={speedTip}
                data-tooltip-class="clipped-bot la-tooltip"
                data-tooltip-direction="RIGHT">
                <i class="mdi mdi-arrow-right-bold-hexagon-outline {getSidebarImageTheme("text")} la-outl-shadow -fontsize6"></i>
                <span class="{getSidebarImageTheme("text")} la-outl-shadow -fontsize6 -bold">{system.speed}</span>
            </div>
            <div class="la-combine-h -aligncenter" 
                data-tooltip={activTip}
                data-tooltip-class="clipped-bot la-tooltip"
                data-tooltip-direction="RIGHT">
                <i class="cci cci-activate {getSidebarImageTheme("text")} la-outl-shadow -fontsize6"></i>
                <span class="{getSidebarImageTheme("text")} la-outl-shadow -fontsize6 -bold">{system.activations}</span>
            </div>
            <div class="la-recharge -lineheight3 -width6 -height6 -glow-primary-hover">
                <button type="button"
                    class="mdi mdi-refresh-circle la-text-secondary -fontsize6
                        charge-macro"
                    data-tooltip={rechargeTip}
                    data-tooltip-class="clipped-bot la-tooltip"
                    data-tooltip-direction="RIGHT"
                    aria-label={getLocalized("LA.npc.recharge.tooltip")}
                >
                </button>
            </div>
        </div>
    </div>
    <div class="la-combine-h la-dropshadow -justifyevenly">
    <!-- Left Side -->
        <div class="la-combine-v -flex0">
            <!-- Tier Options -->
            <div class="la-combine-h -height2 ">
                <div class="">
                    <button type="button"
                        class="la-bckg-secondary -width2
                            clicker-minus-button input-update"
                        data-tooltip={setTierTip}
                        data-tooltip-class={"clipped-bot la-tooltip"}
                        data-tooltip-direction={"UP"}
                        aria-label={getLocalized("LA.subtract.label")}
                    >-</button><!--
                ---><input
                        class="-height2 la-shadow -medium -inset
                            lancer-stat minor"
                        type={"number"}
                        data-dtype={"Number"}
                        value={`${system.tier}`}
                        name={`system.tier`}
                        data-tooltip={setTierTip}
                        data-tooltip-class={"clipped-bot la-tooltip"}
                        data-tooltip-direction={"UP"}
                    /><!--
                ---><button type="button"
                        class="la-bckg-secondary -width2
                            clicker-plus-button input-update"
                        data-tooltip={setTierTip}
                        data-tooltip-class={"clipped-bot la-tooltip"}
                        data-tooltip-direction={"UP"}
                        aria-label={getLocalized("LA.add.label")}
                    >+</button>
                </div>
            </div>
            <!-- Actor Image -->
            <img class="la-npc__img
                    profile-img ref set"
                src="{actor.img}"
                alt={`modules/${moduleID}/assets/assets/nodata.png`}
                data-edit="img" 
                data-uuid="{actor.uuid}"
            />
        </div>
        <HaseDisplay {...props} />
        <!-- Right Side -->
        <div class="la-combine-h">
            <div class="la-combine-v -flex1">
                <div class="la-combine-h -height2 -justifyend -gap1 -widthfull">
                    <button type=button
                        class="mdi mdi-note-edit -fontsize2
                            popout-text-edit-button"
                        data-tooltip={TooltipFactory.buildTooltip(getLocalized("LA.npc.notes.tooltip"))}
                        data-tooltip-class="clipped-bot la-tooltip"
                        data-tooltip-direction="UP"
                        aria-label={getLocalized("LA.npc.notes.tooltip")}
                        data-path={`system.notes`}
                    >
                    </button>
                    <i class="mdi mdi-information -fontsize2"
                        data-tooltip={TooltipFactory.buildTooltip(system.notes, getLocalized("LA.npc.notes.label"))}
                        data-tooltip-class="clipped-bot la-tooltip"
                        data-tooltip-direction="RIGHT"
                    ></i>
                </div>
                <div class="-flex1">
                    <!-- Mech Stats 1 -->
                    <div class="la-stats la-combine-h -justifyevenly">
                        <StatComboShort
                            icon={"cci cci-role-defender"}
                            label={getLocalized("LA.armor.short")}
                            value={system.armor}
                            outerStyle={["-fontsize5"]}
                            innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

                            tooltip={getLocalized("LA.armor.tooltip")}
                            tooltipDirection="LEFT"
                        />
                        <StatComboShort
                            icon={"cci cci-evasion"}
                            label={getLocalized("LA.evasion.short")}
                            value={system.evasion}
                            outerStyle={["-fontsize5"]}
                            innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

                            tooltip={getLocalized("LA.evasion.tooltip")}
                            tooltipDirection="LEFT"
                        />
                        <StatComboShort
                            icon={"cci cci-edef"}
                            label={getLocalized("LA.edefense.short")}
                            value={system.edef}
                            outerStyle={["-fontsize5"]}
                            innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

                            tooltip={getLocalized("LA.edefense.tooltip")}
                            tooltipDirection="LEFT"
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
                                    styleClass={["la-bckg-bar-health"]}
                                    currentValueAlt={system.overshield.value}
                                    maxValueAlt={system.hp.max}
                                    styleClassAlt={["la-bckg-bar-shield", "-shield"]}
                                    clipPath={"clipped"}
                                    
                                    tooltip={getLocalized("LA.hitpoint.tooltip")}
                                    tooltipDirection="LEFT"
                                />
                                <div class="la-spacer -tiny"></div>
                                <!-- STRUCTURE -->
                                <StatusBar
                                    name={getLocalized("LA.structure.label")}
                                    dataName="system.structure.value"
                                    currentValue={system.structure.value}
                                    maxValue={system.structure.max}
                                    styleClass={["la-bckg-bar-structure"]}
                                    clipPath={"clipped-alt"}

                                    tooltip={getLocalized("LA.structure.tooltip")}
                                    tooltipDirection="LEFT"
                                />
                            </div>
                            <!-- SHIELD (VALUE) -->
                            <div class="la-combine-v -divider la-anim-bar-shield -flex0 -width3ch -textaligncenter -glow-shield">
                                <input class="la-damage__input la-shadow -medium -inset -heightfull -bordersround-lrt -small -bordersoff"
                                    type="number" 
                                    name="system.overshield.value" 
                                    data-dtype="Number"
                                    value="{system.overshield.value}">
                                <span class="la-damage__span -fontsize0 -heightfull -lineheight1"
                                    data-tooltip="{TooltipFactory.buildTooltip(getLocalized('LA.overshield.tooltip'))}"
                                    data-tooltip-class="clipped-bot la-tooltip"
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
                                    styleClass={["la-bckg-bar-heat"]}
                                    currentValueAlt={system.burn}
                                    maxValueAlt={system.heat.max}
                                    styleClassAlt={["la-bckg-bar-burn", "-burn"]}
                                    clipPath={"clipped"}

                                    tooltip={getLocalized("LA.heat.tooltip")}
                                    tooltipDirection="LEFT"
                                />
                                <div class="la-spacer -tiny"></div>
                                <!-- STRESS, BURN (BAR) -->
                                <StatusBar
                                    name={getLocalized("LA.stress.label")}
                                    dataName="system.stress.value"
                                    currentValue={system.stress.value}
                                    maxValue={system.stress.max}
                                    styleClass={["la-bckg-bar-stress"]}
                                    clipPath={"clipped-alt"}

                                    tooltip={getLocalized("LA.stress.tooltip")}
                                    tooltipDirection="LEFT"
                                />
                            </div>
                            <!-- BURN (VALUE) -->
                            <div class="la-combine-v -divider la-anim-bar-burn -flex0 -width3ch -textaligncenter -glow-burn">
                                <input class="la-damage__input la-shadow -medium -inset -heightfull -bordersround-lrt -small -bordersoff"
                                    type="number" 
                                    name="system.burn" 
                                    data-dtype="Number"
                                    value="{system.burn}">
                                <span class="la-damage__span -fontsize0 -heightfull -lineheight1"
                                    data-tooltip="{TooltipFactory.buildTooltip(getLocalized('LA.burn.tooltip'))}"
                                    data-tooltip-class="clipped-bot la-tooltip"
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
                            innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

                            tooltip={getLocalized("LA.tattack.tooltip")}
                            tooltipDirection="LEFT"
                        />
                        <StatComboShort
                            icon={"cci cci-save"}
                            label={getLocalized("LA.save.short")}
                            value={system.save}
                            outerStyle={["-fontsize5"]}
                            innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

                            tooltip={getLocalized("LA.save.tooltip")}
                            tooltipDirection="LEFT"
                        />
                        <StatComboShort
                            icon={"cci cci-sensor"}
                            label={getLocalized("LA.sensor.short")}
                            value={system.sensor_range}
                            outerStyle={["-fontsize5"]}
                            innerStyle={["-divider", "-fontsize1", "la-anim-accent", "-textaligncenter", "-bold"]}

                            tooltip={getLocalized("LA.sensor.tooltip")}
                            tooltipDirection="LEFT"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>