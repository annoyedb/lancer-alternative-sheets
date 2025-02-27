<script lang="ts">
    import { id as moduleID } from '@/module.json';
    import { TooltipFactory } from '@/classes/TooltipFactory';
    import { getLocalized } from "@/scripts/helpers";
    import { FlowClass } from '@/enums/FlowClass';
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import Template from "@/svelte/npc/Template.svelte";
    import HexButton from '@/svelte/actor/HexButton.svelte';
    import StatusBar from "@/svelte/actor/StatusBar.svelte";
    import StatComboShort from "@/svelte/actor/StatComboShort.svelte";

    const props = $props();
    const {
        actor,
        system,
        itemTypes,
    }: NPCSheetProps = props;

    let templates = itemTypes.npc_template;
    let sizeTip = TooltipFactory.buildTooltip(getLocalized("LA.size.tooltip"), `Size ${system.size}`);
    let speedTip = TooltipFactory.buildTooltip(getLocalized("LA.speed.tooltip"), `Speed ${system.speed}`);
    let activTip = TooltipFactory.buildTooltip(getLocalized("LA.activate.tooltip"), `Activations ${system.activations}`);
    let tierTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.tier.tooltip"), `Tier ${system.tier}`);
    let setTierTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.tier.set.tooltip"))
</script>

<div class="la-combine-v -widthfull -heightfull">
    <div class="la-bckg-primary la-bg-scroll -widthfull -height10">
        <div class="la-combine-v -widthfull -heightfull -padding1-lr">
            <input 
                class="la-mechname__input la-text-header -upper -fontsize4 -textaligncenter"
                name="name" type="text" value="{actor.name}" 
                placeholder="{getLocalized("LA.namePlaceholder")}"
            />
            <div class="la-combine-h -gap5 la-text-header -widthfull -textaligncenter -padding0-tb">
            {#each templates as template, index}
                <Template
                    name={template.name}
                    uuid={template.uuid}
                    path={`itemTypes.npc_template.${index}`}
                />
            {/each}
                <Template
                    name={system.class.name}
                    uuid={system.class.uuid}
                    path={`system.class`}
                />
            </div>
        </div>
    </div>
    <div class="la-bckg-background la-shadow -medium -inset la-bg-scroll -widthfull -heightfull">
        <!-- Left Side Floating Stats -->
        <div class="la-stat__island -positionrelative la-dropshadow">
            <div class="la-combine-v -positionabsolute -top0 -left0 -fontsize9">
                <i class="cci cci-npc-tier-{system.tier} la-text-primary la-outl-background"
                    data-tooltip={tierTip}
                    data-tooltip-class="clipped-bot la-tooltip"
                    data-tooltip-direction="RIGHT"></i>
            {#if system.size < 1}
                <i class="cci cci-size-half la-text-primary la-outl-background"
                    data-tooltip={sizeTip}
                    data-tooltip-class="clipped-bot la-tooltip"
                    data-tooltip-direction="RIGHT"></i>
            {:else}
                <i class="cci cci-size-{system.size} la-text-primary la-outl-background"
                    data-tooltip={sizeTip}
                    data-tooltip-class="clipped-bot la-tooltip"
                    data-tooltip-direction="RIGHT"></i>
            {/if}
                <div class="la-combine-h" 
                    data-tooltip={speedTip}
                    data-tooltip-class="clipped-bot la-tooltip"
                    data-tooltip-direction="RIGHT">
                    <i class="mdi mdi-arrow-right-bold-hexagon-outline la-text-primary la-outl-background -fontsize6"></i>
                    <span class="la-text-primary la-outl-background -fontsize6 -bold">{system.speed}</span>
                </div>
                <div class="la-combine-h -aligncenter" 
                    data-tooltip={activTip}
                    data-tooltip-class="clipped-bot la-tooltip"
                    data-tooltip-direction="RIGHT">
                    <i class="cci cci-activate la-text-primary la-outl-background -fontsize6"></i>
                    <span class="la-text-primary la-outl-background -fontsize6 -bold">{system.activations}</span>
                </div>
            </div>
        </div>
        <div class="la-combine-h la-dropshadow">
        <!-- Left Side -->
            <div class="la-combine-v -flex1">
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
                <!-- Floating Overlay Bottom -->
                <div class="la-combine-h">
                    <div class="la-hase">
                        <HexButton
                            name={getLocalized("LA.hull.short")}
                            value={system.hull}
                            tooltip={getLocalized("LA.hull.tooltip")}
                            uuid={actor.uuid}
                            flowClass={FlowClass.Roll}
                            dataPath={"system.hull"}
                            style={["-fontsize9", "-positionrelative", "-bold"]}
                            innerStyle={["-positionabsolute", "-left0"]}
                            outerTextStyle={["-fontsize0", "-positionabsolute", "lancer-text-dark"]}
                            innerTextStyle={["-glow-header", "-glow-primary-hover", "-fontsize3", "-lineheight9", "la-text-header"]}
                        />
                    </div>
                    <div class="la-hase">
                        <HexButton
                            name={getLocalized("LA.agility.short")}
                            value={system.agi}
                            tooltip={getLocalized("LA.agility.tooltip")}
                            uuid={actor.uuid}
                            flowClass={FlowClass.Roll}
                            dataPath={"system.agi"}
                            style={["-fontsize9", "-positionrelative", "-bold"]}
                            innerStyle={["-positionabsolute", "-left0"]}
                            outerTextStyle={["-fontsize0", "-positionabsolute", "lancer-text-dark"]}
                            innerTextStyle={["-glow-header", "-glow-primary-hover", "-fontsize3", "-lineheight9", "la-text-header"]}
                        />
                    </div>
                    <div class="la-hase">
                        <HexButton
                            name={getLocalized("LA.systems.short")}
                            value={system.sys}
                            tooltip={getLocalized("LA.systems.tooltip")}
                            uuid={actor.uuid}
                            flowClass={FlowClass.Roll}
                            dataPath={"system.sys"}
                            style={["-fontsize9", "-positionrelative", "-bold"]}
                            innerStyle={["-positionabsolute", "-left0"]}
                            outerTextStyle={["-fontsize0", "-positionabsolute", "lancer-text-dark"]}
                            innerTextStyle={["-glow-header", "-glow-primary-hover", "-fontsize3", "-lineheight9", "la-text-header"]}
                        />
                    </div>
                    <div class="la-hase">
                        <HexButton
                            name={getLocalized("LA.engineering.short")}
                            value={system.eng}
                            tooltip={getLocalized("LA.engineering.tooltip")}
                            uuid={actor.uuid}
                            flowClass={FlowClass.Roll}
                            dataPath={"system.eng"}
                            style={["-fontsize9", "-positionrelative", "-bold"]}
                            innerStyle={["-positionabsolute", "-left0"]}
                            outerTextStyle={["-fontsize0", "-positionabsolute", "lancer-text-dark"]}
                            innerTextStyle={["-glow-header", "-glow-primary-hover", "-fontsize3", "-lineheight9", "la-text-header"]}
                        />
                    </div>
                </div>
            </div>
        <!-- Right Side -->
            <div class="la-combine-v -flex1">
                <div class="la-combine-h -height2 -justifyend -widthfull">
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