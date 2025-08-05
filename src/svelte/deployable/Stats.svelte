<script lang="ts">
    import { onMount } from "svelte";
    import { getBrightness, getCSSDocumentTheme } from "@/scripts/theme";
    import { 
        browseActorImage, 
        browseActorImageSync, 
        browseTokenImage, 
        getLocalized, 
        handleRelativeDataInput
    } from "@/scripts/helpers";
    import { getActorTokenSync, setActorTokenSync, setThemeOverride } from "@/scripts/deployable/settings";
    import { getAdvancedState, getTokenImageLock, setTokenImageLock } from "@/scripts/store/advanced";
    import { getDeployableSheetTooltipEnabled } from "@/scripts/deployable/settings";
    import { getThemeKey } from "@/scripts/store/theme";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { EditMode } from "@/enums/EditMode";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import type { DeployableSheetProps } from "@/interfaces/deployable/DeployableSheetProps";
    import StatusBar from "@/svelte/actor/StatusBar.svelte";
    import StatComboShort from "@/svelte/actor/StatComboShort.svelte";
    import AdvancedButton from "@/svelte/actor/button/AdvancedButton.svelte";
    import ThemeOverrideButton from "@/svelte/actor/button/ThemeOverrideButton.svelte";
    import ImageVideo from "@/svelte/actor/ImageVideo.svelte";
    import GlyphButton from "@/svelte/actor/button/GlyphButton.svelte";
    import LockImageButton from "@/svelte/actor/button/LockImageButton.svelte";

    const props = $props();
    const {
        document,
        actor,
        system,
    }: DeployableSheetProps = props;
    let advancedOptions = $derived(getAdvancedState(actor.uuid));
    let tokenImageLocked = $derived(getTokenImageLock(actor.uuid));
    let editingBurn = $state(false);
    let editingShield = $state(false);
    
    const isInstanced = actor.parent && actor.type === "deployable";
    const themeOverride = getBrightness(getThemeKey(actor.uuid)) === 'light' ? 'la-text-primary' : 'la-text-text';
    const tooltipEnabled = getDeployableSheetTooltipEnabled();

    const sizeTip = TooltipFactory.buildTooltip(getLocalized("LA.size.tooltip"), `${getLocalized("LA.size.label")} ${system.stats.size}`);
    const speedTip = TooltipFactory.buildTooltip(getLocalized("LA.speed.tooltip"), `${getLocalized("LA.speed.label")} ${system.stats.speed}`);
    const shieldTip = TooltipFactory.buildTooltip(getLocalized('LA.overshield.tooltip'));
    const burnTip = TooltipFactory.buildTooltip(getLocalized('LA.burn.tooltip'));
    const tokenErrorTip = TooltipFactory.buildTooltip(getLocalized("LA.edit.token.error"));

    onMount(() => {
        setTokenImageLock(actor.uuid, getActorTokenSync(actor.uuid));
    });

    function handleEditStat(event: MouseEvent, value: number, valuePath: string, mod: EditMode)
    {
        event.stopPropagation();

        switch(mod)
        {
            case EditMode.Subtract:
                document.update({
                    [valuePath]: Math.max(value--, 0)
                });
                break;
            case EditMode.Add:
                document.update({
                    [valuePath]: value++
                });
                break;
        }
    }

    function handleEditToken(event: MouseEvent & { currentTarget: EventTarget & HTMLElement })
    {
        event.stopPropagation();
        
        if (tokenImageLocked)
            browseActorImageSync(event, actor);
        else
            browseTokenImage(event, actor);
    }
</script>

<div class="la-bg-scroll la-bckg-background la-shadow -medium -inset -widthfull -heightfull">
    <div class="la-combine-h la-dropshadow -justifyevenly">
    <!-- Left Side -->
        <div class="la-combine-v -gap1">
            <!-- Options -->
            <div class="la-combine-h -height2 ">
            </div>
            <div class="la-combine-h -widthfull -heightfull">
                <!-- Left Side Floating Stats -->
                <div class="la-stat__island -positionrelative la-dropshadow">
                    <div class="la-combine-v -positionabsolute -top0 -left0 -fontsize10 -heightfull -margin3-t">
                        <!-- Size -->
                        <div class="{advancedOptions ? "-displaynone" : ""}">
                        {#if system.stats.size < 1}
                            <i class="cci cci-size-half {themeOverride} la-outl-shadow"
                                data-tooltip={tooltipEnabled ? sizeTip : undefined}
                                data-tooltip-class="clipped-bot la-tooltip {getCSSDocumentTheme(actor.uuid)}"
                                data-tooltip-direction={TooltipDirection.RIGHT}></i>
                        {:else}
                            <i class="cci cci-size-{system.stats.size} {themeOverride} la-outl-shadow"
                                data-tooltip={tooltipEnabled ? sizeTip : undefined}
                                data-tooltip-class="clipped-bot la-tooltip {getCSSDocumentTheme(actor.uuid)}"
                                data-tooltip-direction={TooltipDirection.RIGHT}></i>
                        {/if}
                        </div>
                        <div class="{advancedOptions ? "" : "-displaynone"}">
                            <!-- Edit Size -->
                            <StatComboShort
                                icon={""}
                                label={getLocalized("LA.size.short")}
                                value={system.stats.size}
                                valuePath="system.stats.size"
                                outerStyle={["-fontsize5"]}
                                innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

                                tooltipEnabled={tooltipEnabled}
                                tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                                tooltip={getLocalized("LA.size.tooltip")}
                                tooltipDirection={TooltipDirection.LEFT}

                                editable={advancedOptions}
                                onPointerClick={handleEditStat}
                            />
                        </div>
                        <div class="{advancedOptions ? "-displaynone" : ""}">
                            <!-- Speed -->
                            <div class="la-combine-h" 
                                data-tooltip={tooltipEnabled ? speedTip : undefined}
                                data-tooltip-class="clipped-bot la-tooltip {getCSSDocumentTheme(actor.uuid)}"
                                data-tooltip-direction={TooltipDirection.RIGHT}>
                                <i class="mdi mdi-arrow-right-bold-hexagon-outline {themeOverride} la-outl-shadow -fontsize6"></i>
                                <span class="{themeOverride} la-outl-shadow -fontsize6 -bold">{system.stats.speed}</span>
                            </div>
                        </div>
                        <div class="{advancedOptions ? "" : "-displaynone"}">
                            <!-- Edit Speed -->
                            <StatComboShort
                                icon={""}
                                label={getLocalized("LA.speed.short")}
                                value={system.stats.speed}
                                valuePath="system.stats.speed"
                                outerStyle={["-fontsize5"]}
                                innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

                                tooltipEnabled={tooltipEnabled}
                                tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                                tooltip={getLocalized("LA.speed.tooltip")}
                                tooltipDirection={TooltipDirection.LEFT}

                                editable={advancedOptions}
                                onPointerClick={handleEditStat}
                            />
                        </div>
                    </div>
                </div>
                <!-- Actor Image -->
                <div
                    class="la-deployable__img -aligncontentcenter
                        ref set"
                    data-uuid="{actor.uuid}"
                >
                    <ImageVideo
                        actor={actor}
                        editDisabled={isInstanced}
                        tooltipEnabled={tooltipEnabled}
                        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                        onPointerClick={handleEditToken}
                    />
                </div>
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

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                            tooltipDirection={TooltipDirection.UP}
                        />
                    {#if advancedOptions && !isInstanced}
                        <LockImageButton
                            style="-fontsize2 la-text-text la-prmy-primary -glow-prmy-hover"
                            actor={actor}
                            setState={setActorTokenSync}
                            tooltipEnabled={tooltipEnabled}
                        />
                    {/if}
                    {#if !isInstanced}
                        {#if !tokenImageLocked}
                            <GlyphButton
                                flowClass={FlowClass.None}
                                style={["mdi mdi-image-edit", "-fontsize2 la-text-text la-prmy-primary -glow-prmy-hover"]}
                                onClick={event => browseActorImage(event, actor)}
                                tooltipEnabled={tooltipEnabled}
                                tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                                tooltip={getLocalized("LA.edit.image.actor.tooltip")}
                                tooltipDirection={TooltipDirection.UP}
                            />
                        {/if}
                    {:else}
                        <i class="mdi mdi-creation la-text-text -fontsize2 la-prmy-warning -glow-prmy"
                            data-tooltip={tooltipEnabled ? tokenErrorTip : undefined}
                            data-tooltip-class="clipped-bot la-tooltip {getCSSDocumentTheme(actor.uuid)}"
                            data-tooltip-direction={TooltipDirection.DOWN}></i>
                    {/if}
                    {#if advancedOptions}
                        <ThemeOverrideButton
                            uuid={actor.uuid}
                            style={["-lineheight3"]}
                            iconStyle={["-fontsize2"]}
                            setOverride={setThemeOverride}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                            tooltipDirection={TooltipDirection.UP}
                        />
                    {/if}
                    </div>
                    <div class="la-combine-h -gap1">
                        <!-- Options -->
                    </div>
                </div>
                <div class="-flex1">
                    <!-- Mech Stats 1 -->
                    <div class="la-stats la-combine-h -justifyevenly">
                        <StatComboShort
                            icon={"cci cci-role-defender"}
                            label={getLocalized("LA.armor.short")}
                            value={system.stats.armor}
                            valuePath="system.stats.armor"
                            outerStyle={["-fontsize5"]}
                            innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                            tooltip={getLocalized("LA.armor.tooltip")}
                            tooltipDirection={TooltipDirection.LEFT}

                            editable={advancedOptions}
                            onPointerClick={handleEditStat}
                        />
                        <StatComboShort
                            icon={"cci cci-evasion"}
                            label={getLocalized("LA.evasion.short")}
                            value={system.stats.evasion}
                            valuePath="system.stats.evasion"
                            outerStyle={["-fontsize5"]}
                            innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                            tooltip={getLocalized("LA.evasion.tooltip")}
                            tooltipDirection={TooltipDirection.LEFT}

                            editable={advancedOptions}
                            onPointerClick={handleEditStat}
                        />
                        <StatComboShort
                            icon={"cci cci-edef"}
                            label={getLocalized("LA.edefense.short")}
                            value={system.stats.edef}
                            valuePath="system.stats.edef"
                            outerStyle={["-fontsize5"]}
                            innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                            tooltip={getLocalized("LA.edefense.tooltip")}
                            tooltipDirection={TooltipDirection.LEFT}

                            editable={advancedOptions}
                            onPointerClick={handleEditStat}
                        />
                    </div>
                    <!-- Mech Bars -->
                    <div class="la-damage -margin0-lr -margin2-tb">
                        <div class="la-combine-h -gap2">
                            <div class="la-visuals -flex5">
                                <span>&nbsp;</span>
                                <!-- HP, SHIELD (BAR) -->
                                <StatusBar
                                    name={getLocalized("LA.hitpoint.short")}
                                    dataName="system.hp.value"
                                    currentValue={system.hp.value}
                                    maxValue={parseInt(system.stats.hp)}
                                    barStyle={["la-bckg-bar-health"]}
                                    barEditStyle={["la-prmy-bar-health"]}
                                    currentValueSecondary={system.overshield.value}
                                    maxValueSecondary={parseInt(system.stats.hp)}
                                    barStyleSecondary={["la-bckg-bar-shield", "-shield"]}
                                    barEditStyleSecondary={["la-prmy-bar-shield"]}
                                    textStyle={["la-text-text"]}
                                    clipPath={"clipped"}
                                    editSecondary={editingShield}
                                    
                                    tooltipEnabled={tooltipEnabled}
                                    tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                                    tooltipDirection={TooltipDirection.LEFT}
                                    tooltip={getLocalized("LA.deployable.hitpointMax.tooltip")}
                                />
                            </div>
                            <!-- SHIELD (VALUE) -->
                            <div class="la-combine-v -divider la-prmy-bar-shield -flex0 -width3ch -textaligncenter la-prmy-bar-shield -glow-prmy">
                                <span class="la-damage__span -fontsize0 -heightfull -lineheight1"
                                    data-tooltip={tooltipEnabled ? shieldTip : undefined}
                                    data-tooltip-class="clipped-bot la-tooltip {getCSSDocumentTheme(actor.uuid)}"
                                    data-tooltip-direction="LEFT"
                                ><!--
                                --->{getLocalized("LA.overshield.short")}<!--
                            ---></span>
                                <input type="number" 
                                    class="la-damage__input la-shadow -medium -inset la-text-text -width5 -heightfull -bordersround-lrt -small -bordersoff"
                                    name="system.overshield.value" 
                                    data-dtype="Number"
                                    value="{system.overshield.value}"
                                    onfocus={(event) => {event.currentTarget.select(); editingShield = true;}}
                                    onblur={() => {editingShield = false;}}
                                    onchange={(event) => handleRelativeDataInput(event, system.overshield.value)}
                                >
                            </div>
                        </div>
                        <div class="la-combine-h -gap2">
                            <div class="la-visuals -flex5">
                                <!-- HEAT, BURN (BAR) -->
                                <StatusBar
                                    name={getLocalized("LA.heat.label")}
                                    dataName="system.heat.value"
                                    currentValue={system.heat.value}
                                    maxValue={system.stats.heatcap}
                                    barStyle={["la-bckg-bar-heat"]}
                                    barEditStyle={["la-prmy-bar-heat"]}
                                    currentValueSecondary={system.burn}
                                    maxValueSecondary={system.stats.heatcap || parseInt(system.stats.hp)}
                                    barStyleSecondary={["la-bckg-bar-burn", "-burn"]}
                                    barEditStyleSecondary={["la-prmy-bar-burn"]}
                                    textStyle={["la-text-text"]}
                                    clipPath={"clipped-alt"}
                                    editSecondary={editingBurn}

                                    tooltipEnabled={tooltipEnabled}
                                    tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                                    tooltipDirection={TooltipDirection.LEFT}
                                    tooltip={getLocalized("LA.deployable.heatMax.tooltip")}
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
                                    data-tooltip-class="clipped-bot la-tooltip {getCSSDocumentTheme(actor.uuid)}"
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
                            icon={"mdi mdi-heart-flash"}
                            label={getLocalized("LA.deployable.hitpointMax.short")}
                            value={parseInt(system.stats.hp)}
                            valuePath={"system.stats.hp"}
                            outerStyle={["-fontsize4", `${advancedOptions ? "" : "-displaynone"}`]}
                            innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                            tooltip={getLocalized("LA.deployable.hitpointMax.tooltip")}
                            tooltipDirection={TooltipDirection.LEFT}

                            editable={advancedOptions}
                            onPointerClick={handleEditStat}
                        />
                        <StatComboShort
                            icon={"cci cci-save"}
                            label={getLocalized("LA.save.short")}
                            value={system.stats.save}
                            valuePath="system.stats.save"
                            outerStyle={["-fontsize5"]}
                            innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                            tooltip={getLocalized("LA.save.tooltip")}
                            tooltipDirection={TooltipDirection.LEFT}

                            editable={advancedOptions}
                            onPointerClick={handleEditStat}
                        />
                        <StatComboShort
                            icon={"cci cci-heat"}
                            label={getLocalized("LA.deployable.heatMax.short")}
                            value={system.stats.heatcap}
                            valuePath={"system.stats.heatcap"}
                            outerStyle={["-fontsize5", `${advancedOptions ? "" : "-displaynone"}`]}
                            innerStyle={["-divider", "-fontsize1", "la-prmy-accent", "-textaligncenter", "-bold"]}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                            tooltip={getLocalized("LA.deployable.heatMax.tooltip")}
                            tooltipDirection={TooltipDirection.LEFT}

                            editable={advancedOptions}
                            onPointerClick={handleEditStat}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>