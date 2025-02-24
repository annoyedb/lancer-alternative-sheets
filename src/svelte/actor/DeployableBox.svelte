<script lang="ts">
    // import { FlowClass } from "@/enums/FlowClass";
    import type { DeployableBoxProps } from "@/interfaces/actor/DeployableBoxProps";
    import { ACTIVATION_COLOR_MAP, ACTIVATION_LOCALIZE_MAP, ACTIVATION_TOOLTIP_LOCALIZE_MAP } from "@/scripts/constants";
    import { getLocalized } from "@/scripts/helpers";
    import { getBrightness } from "@/scripts/theme";
    import FlowButton from "@/svelte/actor/FlowButton.svelte";
    import type { LancerActor } from "@/types/foundryvtt-lancer/module/actor/lancer-actor";
    import ActionBox from "./ActionBox.svelte";
    import { TooltipFactory } from "@/classes/TooltipFactory";

    const {
        source, 
        lidSource, 
    }: DeployableBoxProps = $props();

    let tip = TooltipFactory.buildTooltip(getLocalized("LA.mech.system.deployable.tooltip"));

    const globallyOwnedDeployables: StoredDocument<any>[] = game.actors!.filter(
        (a) => !!(a.is_deployable() && a.system.owner?.value == source)
    );
    
    function lidSourceHasDeployable(deployable: StoredDocument<LancerActor>)
    {
        return lidSource.deployables?.includes(deployable.system.lid) ?? false;
    }

    function getThemeImg(deployable: StoredDocument<LancerActor>)
    {
        let theme = getBrightness();
        return deployable.img
        ? (theme === "dark" ? deployable.img.replace('/icons/', '/icons/white/') : deployable.img)
        : (theme === "dark" ? "systems/lancer/assets/icons/white/generic_item.svg" : "systems/lancer/assets/icons/generic_item.svg");
    }

    function getDeployableActions(deployable: StoredDocument<any>)
    {
        return [
            { 
                label: "LA.mech.system.deployable.activate.label", 
                tooltip: "LA.mech.system.deployable.activate.tooltip",
                deployableAction: deployable.system.activation 
            },
            { 
                label: "LA.mech.system.deployable.deactivate.label", 
                tooltip: "LA.mech.system.deployable.deactivate.tooltip",
                deployableAction: deployable.system.deactivation 
            },
            { 
                label: "LA.mech.system.deployable.recall.label", 
                tooltip: "LA.mech.system.deployable.recall.tooltip",
                deployableAction: deployable.system.recall 
            },
            { 
                label: "LA.mech.system.deployable.redeploy.label", 
                tooltip: "LA.mech.system.deployable.redeploy.tooltip",
                deployableAction: deployable.system.redeploy 
            },
        ].filter(a => !!a.deployableAction);
    }
</script>

<!-- TODO: create a flow that would work specifically for deployables in V12 -->
{#if source && !source.is_deployable() && !source.isToken}
{#each globallyOwnedDeployables as deployable}
    {#if lidSourceHasDeployable(deployable)}
    <!-- Deployable -->
    <div class="la-effectbox -descriptive la-bckg-card la-brdr-repcap -widthful -bordersround-ltb
        ref set"
        data-uuid="{deployable.uuid}">
        <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0
            click-open"><!--
        --->{deployable.name ? deployable.name.toUpperCase() : ""}<!--
    ---></span>
        <!-- Generated Content -->
        <div class="la-generated -gap2 la-combine-v">
            <div class="-fontsize1">
                <!-- Deployable Actions -->
                <div class="la-effectbox-buttons la-combine-h -justifybetween">
                    <div class="la-combine-v -alignleft">
                    {#each getDeployableActions(deployable) as action}
                        <FlowButton
                            name={getLocalized(action.label)}
                            flowClass={""}
                            tooltipHeader={getLocalized(ACTIVATION_LOCALIZE_MAP[action.deployableAction]).toUpperCase()}
                            tooltip={`${getLocalized(action.tooltip)}<br><br>${getLocalized(ACTIVATION_TOOLTIP_LOCALIZE_MAP[action.deployableAction])}`}
                            tooltipDirection={"LEFT"}
                            uuid={deployable.uuid}
                            dataPath={`deployables.${deployable.system.lid}`}
                            style={["clipped-bot", "-widthfull"]}
                            backgroundStyle={ACTIVATION_COLOR_MAP[action.deployableAction]}
                        />
                    {/each}
                    </div>
                    <img class="-height10 click-open -glow-secondary -glow-primary-hover" 
                        src={getThemeImg(deployable)}
                        alt={getLocalized("LA.placeholder")}
                        data-tooltip={tip}
                        data-tooltip-class="clipped-bot la-tooltip"
                        data-tooltip-direction="LEFT"
                    />
                </div>
                <hr>
                {@html deployable.system.detail}
            </div>
            <!-- Actions -->
        {#if deployable.system.actions.length}
            <ActionBox
                actions={deployable.system.actions}
                path={`system.actions`}
            />
        {/if}
        </div>
    </div>
    {/if}
{/each}
{/if}