<script lang="ts">
    import type { LancerActor } from "@/types/foundryvtt-lancer/module/actor/lancer-actor";
    import type { DeployableBoxProps } from "@/interfaces/actor/DeployableBoxProps";
    import { ACTIVATION_COLOR_MAP, ACTIVATION_LOCALIZE_MAP, ACTIVATION_TOOLTIP_LOCALIZE_MAP } from "@/scripts/constants";
    import { getLocalized } from "@/scripts/helpers";
    import { getBrightness } from "@/scripts/theme";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import { FlowClass } from "@/enums/FlowClass";
    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";

    const {
        source, 
        lidSource, 
        uuid,
    }: DeployableBoxProps & {uuid?: string} = $props(); // (#4)

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

    // (#4) Temporary until Lancer system implements proper deployable actions
    function sendActionToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, action: any)
    {
        event.stopPropagation();
        if (uuid && action)
        {
            let description = `${action.detail}`;
            if (action.trigger)
                description = `${getLocalized("LA.trigger.label")}: ${action.trigger}<br><br>${getLocalized("LA.mech.system.effect.label")}: ${description}`;
            SendUnknownToChatBase.startFlow(uuid, action.name, description);
        }
    }

    // (#4) Temporary until Lancer system implements proper deployable actions
    function sendDeployableActionToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, action: any, deployable: any)
    {
        event.stopPropagation();
        if (uuid && action)
        {
            SendUnknownToChatBase.startFlow(
                uuid, 
                `${deployable.name}`, 
                `${getLocalized(ACTIVATION_LOCALIZE_MAP[action.deployableAction])}: ${getLocalized(action.tooltip)}`);
        }
    }
</script>

<!-- TODO: create a flow that would work specifically for deployables eventually? -->
{#if source && !source.is_deployable() && !source.isToken}
{#each globallyOwnedDeployables as deployable}
    {#if lidSourceHasDeployable(deployable)}
    <!-- Deployable -->
    <div class="la-effectbox la-bckg-card la-brdr-repcap -widthful -bordersround-ltb
            ref set"
        data-uuid="{deployable.uuid}"
    >
        <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0
                click-open"
        ><!--
        --->{deployable.name ? deployable.name.toUpperCase() : ""}<!--
    ---></span>
        <!-- Generated Content -->
        <div class="la-generated -gap2 la-combine-v">
            <div class="-fontsize1">
                <!-- Deployable Actions -->
                <div class="la-effectbox-buttons la-combine-h -justifybetween">
                    <div class="la-combine-v -alignstart">
                    <!-- (#4) -->
                    {#each getDeployableActions(deployable) as action}
                        <FlowButton
                            text={getLocalized(action.label)}
                            style={["clipped-bot", "-widthfull", ACTIVATION_COLOR_MAP[action.deployableAction]]}

                            uuid={deployable.uuid}
                            path={`deployables.${deployable.system.lid}`}
                            flowClass={FlowClass.None}
                            onClick={(event) => sendDeployableActionToChat(event, action, deployable)}

                            tooltipHeader={getLocalized(ACTIVATION_LOCALIZE_MAP[action.deployableAction]).toUpperCase()}
                            tooltip={`${getLocalized(action.tooltip)}<br><br>${getLocalized(ACTIVATION_TOOLTIP_LOCALIZE_MAP[action.deployableAction])}`}
                            tooltipDirection={TooltipDirection.LEFT}
                        />
                    {/each}
                    </div>
                    <img class="-height10 click-open -glow-secondary -glow-primary-hover" 
                        src={getThemeImg(deployable)}
                        alt={getLocalized("LA.placeholder")}
                        data-tooltip={tip}
                        data-tooltip-class="clipped-bot la-tooltip"
                        data-tooltip-direction={TooltipDirection.LEFT}
                    />
                </div>
                <hr>
                {@html deployable.system.detail}
            </div>
            <!-- Actions -->
            <!-- (#4) Add back in when implemented
                path={`system.actions`} -->
        {#if deployable.system.actions.length}
            <ActionBox
                actions={deployable.system.actions}
                collapseID={`${deployable.uuid}.actions`}
                startCollapsed={false}
                
                uuid={uuid || deployable.uuid}
                disableLeftButton={uuid ? false : true}
                onClick={uuid ? sendActionToChat : undefined}
            />
        {/if}
        </div>
    </div>
    {/if}
{/each}
{/if}