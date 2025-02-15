<script lang="ts">
    import type { MechSheetData } from "@/interfaces/actor/MechSheetData";
    import { getLocalized, randomExtension } from "@/scripts/helpers";
    import { id as moduleID } from '@/module.json';

    const { system, actor }: MechSheetData = $props();
    const frameItem = system.loadout.frame.value;
    const emptyObject = '{}';
</script>

<!-- Sidebar -->
<section class="la-sidebar la-bg-scroll la-shadow -soft -inset LA_SCROLL_SIDEBAR">
    <!-- Frame Name -->
    <div class="la-framename">
        <div class="la-flow la-bckg-primary la-text-header clipped-bot-alt" 
            data-uuid="{frameItem.uuid}">
            <span class="la-terminal la-text-header -fadein">>//: </span>
            {frameItem.system.manufacturer} {frameItem.name}
            <span class="la-extension la-text-header -lower -fadein">--{getLocalized("LA.scan.label")}</span><span class="la-cursor la-anim-header -fadein"></span>
        </div>
    </div>
    <!-- Mech Image -->
    <div class="la-mech">
        <div class="la-combine-v ">
        {#if system.size < 1}
            <i class="cci cci-size-half la-text-primary la-outl-background"></i>
        {:else}
            <i class="cci cci-size-{system.size} la-text-primary la-outl-background"></i>
        {/if}
            <div class="la-combine-h">
                <i class="mdi mdi-arrow-right-bold-hexagon-outline la-text-primary la-outl-background"></i>
                <span class="la-text-primary la-outl-background">{system.speed}</span>
            </div>
        </div>
        <img class="las-mech__img" 
            src="{actor.img}" data-edit="img" data-uuid="{actor.uuid}"
            alt={`modules/${moduleID}/assets/assets/nodata.png`}
        />
    </div>
    <!-- Mech Stats 1 -->
    <div class="la-stats">
        <div class="la-combine-h">
            <!-- the mdi shield is a bit larger than the cci icons -->
            <i class="mdi mdi-shield-half-full" style="font-size: 0.75em"></i>
            <div class="la-combine-v -divider">
                <span>{system.armor}</span>
                <span>{getLocalized("LA.armor.short")}</span>
            </div>
        </div>
        <div class="la-combine-h">
            <i class="cci cci-evasion"></i>
            <div class="la-combine-v -divider">
                <span>{system.evasion}</span>
                <span>{getLocalized("LA.evasion.short")}</span>
            </div>
        </div>
        <div class="la-combine-h">
            <i class="cci cci-edef"></i>
            <div class="la-combine-v -divider">
                <span>{system.edef}</span>
                <span>{getLocalized("LA.edefense.short")}</span>
            </div>
        </div>
    </div>
    <!-- Mech Bars -->
    <div class="la-damage">
        <div class="la-combine-h">
            <div class="la-visuals">
                <!-- HP, SHIELD (BAR) -->
                <div class="la-combine-h -fontsize1">
                    <span class="la-damage__span">{getLocalized("LA.hitpoint.short")}</span>
                    <div class="la-bar-h clipped la-bckg-bar-back -flex1">
                        <div class="la-bar-h-progress la-combine-h">
                            <input class="la-bar-h-progress__input -flex1"
                                type="number" name="system.hp.value"
                                data-dtype="Number" value="{system.hp.value}">
                            <span class="la-bar-h-progress__span -flex0">/</span>
                            <span class="la-bar-h-progress__span -flex1">{system.hp.max}</span>
                        </div>
                        <div class="la-bar-h-progress la-bar-h-current la-bckg-bar-health"
                            style="--percent:{system.hp.value / system.hp.max * 100}%"></div>
                        <div class="la-tempvalue -shield la-bar-h-progress la-bar-h-current la-bckg-bar-shield"
                            style="--percent:{system.overshield.value / system.hp.max * 100}%"></div>
                    </div>
                </div>
                <div class="la-spacer -tiny"></div>
                <!-- STRUCTURE -->
                <div class="la-combine-h -fontsize1">
                    <span class="la-damage__span">{getLocalized("LA.structure.label")}</span>
                    <div class="la-bar-h clipped-alt la-bckg-bar-back -flex1">
                        <div class="la-bar-h-progress la-combine-h">
                            <input class="la-bar-h-progress__input -flex1" 
                                type="number" name="system.structure.value" 
                                data-dtype="Number" value="{system.structure.value}">
                            <span class="la-bar-h-progress__span -flex0">/</span>
                            <span class="la-bar-h-progress__span -flex1">{system.structure.max}</span>
                        </div>
                        <div class="la-bar-h-progress la-bar-h-current la-bckg-bar-structure"
                            style="--percent:{system.structure.value / system.structure.max * 100}%"></div>
                    </div>
                </div>
            </div>
            <!-- SHIELD (VALUE) -->
            <div class="la-combine-v -divider -shield">
                <input class="la-damage__input" type="number" 
                    name="system.overshield.value" data-dtype="Number"
                    value="{system.overshield.value}">
                <span class="la-damage__span">{getLocalized("LA.overshield.short")}</span>
            </div>
        </div>

        <div class="la-spacer -large"></div>

        <div class="la-combine-h">
            <div class="la-visuals">
                <!-- HEAT -->
                <div class="la-combine-h -fontsize1">
                    <span class="la-damage__span">{getLocalized("LA.heat.label")}</span>
                    <div class="la-bar-h clipped la-bckg-bar-back -flex1">
                        <div class="la-bar-h-progress la-combine-h">
                            <input class="la-bar-h-progress__input -flex1" 
                                type="number" name="system.heat.value" 
                                data-dtype="Number" value="{system.heat.value}">
                            <span class="la-bar-h-progress__span -flex0">/</span>
                            <span class="la-bar-h-progress__span -flex1">{system.heat.max}</span>
                        </div>
                        <div class="la-bar-h-progress la-bar-h-current la-bckg-bar-heat"
                            style="--percent:{system.heat.value / system.heat.max * 100}%"></div>
                        <div class="la-tempvalue -burn la-bar-h-progress la-bar-h-current la-bckg-bar-burn"
                            style="--percent:{system.burn / system.heat.max * 100}%"></div>
                    </div>
                </div>
                <div class="la-spacer -tiny"></div>
                <!-- STRESS, BURN (BAR) -->
                <div class="la-combine-h -fontsize1">
                    <span class="la-damage__span">{getLocalized("LA.stress.label")}</span>
                    <div class="la-bar-h clipped-alt la-bckg-bar-back -flex1">
                        <div class="la-bar-h-progress la-combine-h">
                            <input class="la-bar-h-progress__input -flex1" 
                                type="number" name="system.stress.value" 
                                data-dtype="Number" value="{system.stress.value}">
                            <span class="la-bar-h-progress__span -flex0">/</span>
                            <span class="la-bar-h-progress__span -flex1">{system.stress.max}</span>
                        </div>
                        <div class="la-bar-h-progress la-bar-h-current la-bckg-bar-stress"
                            style="--percent:{system.stress.value / system.stress.max * 100}%"></div>
                    </div>
                </div>
            </div>
            <!-- BURN (VALUE) -->
            <div class="la-combine-v -divider -burn">
                <input class="la-damage__input" type="number" name="system.burn" data-dtype="Number"
                    value="{system.burn}">
                <span class="la-damage__span">{getLocalized("LA.burn.short")}</span>
            </div>
        </div>
    </div>
    <!-- Mech Stats 2 -->
    <div class="la-stats">
        <div class="la-combine-h">
            <i class="cci cci-tech-full"></i>
            <div class="la-combine-v -divider">
                <span>{system.tech_attack}</span>
                <span>{getLocalized("LA.tattack.short")}</span>
            </div>
        </div>
        <div class="la-combine-h">
            <i class="cci cci-save"></i>
            <div class="la-combine-v -divider">
                <span>{system.save}</span>
                <span>{getLocalized("LA.save.short")}</span>
            </div>
        </div>
        <div class="la-combine-h">
            <i class="cci cci-sensor"></i>
            <div class="la-combine-v -divider">
                <span>{system.sensor_range}</span>
                <span>{getLocalized("LA.sensor.short")}</span>
            </div>
        </div>
    </div>
    <!-- Macros/Flows -->
    <div class="la-spacer -large"></div>
    <div class="la-macroflows la-combine-v">
        <button type="button"
            class="la-flow la-button la-bckg-secondary la-text-header clipped-bot-alt 
                lancer-flow-button"
            data-flow-type="Stabilize" data-flow-args="{emptyObject}"
            data-tooltip="{getLocalized("LA.flow.stabilize.tooltip")}">
            <span class="la-terminal la-text-header -fadein">>//: </span>
            <span>{getLocalized("LA.flow.stabilize.label")}</span><span
                class="la-extension la-text-header -lower -fadein">{randomExtension()}</span><span
                class="la-cursor la-anim-header -fadein"></span>
        </button>
        <button type="button"
            class="la-flow la-button la-bckg-secondary la-text-header clipped-bot-alt 
                lancer-flow-button"
            data-uuid="{actor.uuid}" data-flow-type="Overcharge" data-flow-args="{emptyObject}"
            data-tooltip="{getLocalized("LA.flow.overcharge.tooltip")}">
            <span class="la-terminal la-text-header -fadein">>//: </span>
            <span>{getLocalized("LA.flow.overcharge.label")}</span><span
                class="la-extension la-text-header -lower -fadein">{randomExtension()}</span><span
                class="la-cursor la-anim-header -fadein"></span>
        </button>
        <button type="button"
            class="la-flow la-button la-bckg-secondary la-text-header clipped-bot-alt 
                roll-stat"
            data-uuid="{actor.uuid}" data-path="system.grit" data-flow-args=""
            data-tooltip="{getLocalized("LA.grit.tooltip")}">
            <span class="la-terminal la-text-header -fadein">>//: </span>
            <span>{getLocalized("LA.grit.label")}</span><span
                class="la-extension la-text-header -lower -fadein">{randomExtension()}</span><span
                class="la-cursor la-anim-header -fadein"></span>
        </button>
        <button type="button"
            class="la-flow la-button la-bckg-secondary la-text-header clipped-bot-alt 
                lancer-flow-button"
            data-uuid="{actor.uuid}" data-flow-type="BasicAttack" data-flow-args="{emptyObject}"
            data-tooltip="{getLocalized("LA.flow.rollAttack.tooltip")}">
            <span class="la-terminal la-text-header -fadein">>//: </span>
            <span>{getLocalized("LA.flow.rollAttack.label")}</span><span
                class="la-extension la-text-header -lower -fadein">{randomExtension()}</span><span
                class="la-cursor la-anim-header -fadein"></span>
        </button>
        <button type="button"
            class="la-flow la-button la-bckg-secondary la-text-header clipped-bot-alt 
                lancer-flow-button"
            data-uuid="{actor.uuid}" data-flow-type="Damage" data-flow-args="{emptyObject}"
            data-tooltip="{getLocalized("LA.flow.rollDamage.tooltip")}">
            <span class="la-terminal la-text-header -fadein">>//: </span>
            <span>{getLocalized("LA.flow.rollDamage.label")}</span><span
                class="la-extension la-text-header -lower -fadein">{randomExtension()}</span><span
                class="la-cursor la-anim-header -fadein"></span>
        </button>
        <button type="button"
            class="la-flow la-button la-bckg-secondary la-text-header clipped-bot-alt 
                lancer-flow-button"
            data-uuid="{actor.uuid}" data-flow-type="TechAttack" data-flow-args="{emptyObject}"
            data-tooltip="{getLocalized("LA.flow.rollTechAttack.tooltip")}">
            <span class="la-terminal la-text-header -fadein">>//: </span>
            <span>{getLocalized("LA.flow.rollTechAttack.label")}</span><span
                class="la-extension la-text-header -lower -fadein">{randomExtension()}</span><span
                class="la-cursor la-anim-header -fadein"></span>
        </button>
    </div>
</section>

<style lang="scss">
    @use "src/styles/mech/sidebar";
</style>