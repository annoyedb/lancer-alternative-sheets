<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { getDeployableSheetTooltipEnabled } from "@/scripts/deployable/settings";
    import { ACTIVATION_COLOR_MAP, ACTIVATION_LOCALIZE_MAP, ACTIVATION_TOOLTIP_LOCALIZE_MAP } from "@/scripts/constants";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { DeployableSheetProps } from "@/interfaces/deployable/DeployableSheetProps";
    import type { ChatData } from "@/interfaces/flows/ChatData";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";

    const {
        actor,
        system,
    }: DeployableSheetProps = $props();
    let collapseAllButtonHover = $state(false);
    
    const tooltipEnabled = getDeployableSheetTooltipEnabled();
    const collID = `${actor.uuid}.systems`;
    const actions = getDeployableActions(actor);

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
        if (action)
        {
            let chatData = {
                title: action.name, 
                trigger: action.trigger,
                effect: action.detail
            } as ChatData 
            SendUnknownToChatBase.getInstance().startFlow(actor.uuid, chatData);
        }
    }

    // (#4) Temporary until Lancer system implements proper deployable actions
    function sendDeployableActionToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, action: any, deployable: any)
    {
        event.stopPropagation();
        if (action)
        {
            const description = `${getLocalized(ACTIVATION_LOCALIZE_MAP[action.deployableAction])}: ${getLocalized(action.tooltip)}`;
            let chatData = {
                title: deployable.name, 
                description: description
            } as ChatData
            SendUnknownToChatBase.getInstance().startFlow(actor.uuid, chatData);
        }
    }
</script>

{#snippet headerOptions(collID: string)}
<CollapseAllButton
    collapseID={collID}
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={getCSSDocumentTheme(actor.uuid)}

    onPointerEnter={() => {collapseAllButtonHover = true;}}
    onPointerLeave={() => {collapseAllButtonHover = false;}}
/>
{/snippet}
{#snippet headerActions()}
    {@render headerOptions(`${collID}.actions`)}
{/snippet}

<div class="la-combine-v -widthfull">
{#if system.detail}
    <HeaderMain
        text={getLocalized("LA.deployable.effects.label")}
        headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
        textStyle={["la-text-header", "-fontsize2", "-overflowhidden", "-upper"]}
        borderStyle={["la-brdr-primary", "-gap0"]}
        extensionTextFunction={() => {
            if (collapseAllButtonHover)
                return `--${getLocalized("LA.collapseAll.extension")}`;
            return undefined;
        }}
        
        collapseID="{collID}.details"
        startCollapsed={true}
    >
        <EffectBox
            name={getLocalized("LA.mech.system.effect.label")}

            editOption={true}
            editPath="system.detail"
        >
            {@html system.detail}
        </EffectBox>
    </HeaderMain>
{/if}
    <HeaderMain
        text={getLocalized("LA.deployable.actions.label")}
        headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
        textStyle={["la-text-header", "-fontsize2", "-overflowhidden", "-upper"]}
        borderStyle={["la-brdr-primary", "-gap0"]}
        extensionTextFunction={() => {
            if (collapseAllButtonHover)
                return `--${getLocalized("LA.collapseAll.extension")}`;
            return undefined;
        }}
        
        collapseID="{collID}.actions"
        startCollapsed={true}

        headerContent={headerActions}
    >
        <div class="la-combine-v -gap0 -widthfull -fontsize2">
            <EffectBox
                name={getLocalized("LA.npc.utilities.label")}
            >
                <div class="la-combine-h -wrapwrap -widthfull -gap0">
                    <div class="la-combine-v -gap0 -flex1 -widthfull">
                        <FlowButton 
                            style={["clipped-alt", "-widthfull", "la-bckg-secondary"]}
                            text={getLocalized("LA.flow.rollAttack.label")}

                            uuid={actor.uuid}
                            flowClass={FlowClass.Standard}
                            flowType={"BasicAttack"}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                            tooltipDirection={TooltipDirection.UP}
                            tooltip={getLocalized("LA.flow.rollAttack.tooltip")}
                        />
                    </div>
                    <div class="la-combine-v -gap0 -flex1 -widthfull">
                        <FlowButton 
                            style={["clipped", "-widthfull", "la-bckg-secondary"]}
                            text={getLocalized("LA.flow.rollDamage.label")}

                            uuid={actor.uuid}
                            flowClass={FlowClass.Standard}
                            flowType={"Damage"}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                            tooltipDirection={TooltipDirection.UP}
                            tooltip={getLocalized("LA.flow.rollDamage.tooltip")}
                        />
                    </div>
                </div>
            </EffectBox>
            {#if actions.length}
            <EffectBox
                name={getLocalized("LA.deployable.deployment.label")}
            >
                <div class="la-combine-h -wrapwrap -widthfull -gap0">
                    <div class="la-combine-v -gap0 -flex1 -widthfull">
                    {#each actions as action, index}
                    {#if index % 2 == 0}
                        <FlowButton
                            text={getLocalized(action.label)}
                            style={["clipped-alt", "-widthfull", ACTIVATION_COLOR_MAP[action.deployableAction]]}

                            uuid={actor.uuid}
                            path={`system.lid`}
                            flowClass={FlowClass.None}
                            onClick={(event) => sendDeployableActionToChat(event, action, actor)}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                            tooltipDirection={TooltipDirection.UP}
                            tooltipHeader={getLocalized(ACTIVATION_LOCALIZE_MAP[action.deployableAction])}
                            tooltip={`${getLocalized(action.tooltip)}<br><br>${getLocalized(ACTIVATION_TOOLTIP_LOCALIZE_MAP[action.deployableAction])}`}
                        />
                    {/if}
                    {/each}
                    </div>
                    <div class="la-combine-v -gap0 -flex1 -widthfull">
                    {#each actions as action, index}
                    {#if index % 2 != 0}
                        <FlowButton
                            text={getLocalized(action.label)}
                            style={["clipped", "-widthfull", ACTIVATION_COLOR_MAP[action.deployableAction]]}

                            uuid={actor.uuid}
                            path={`system.lid`}
                            flowClass={FlowClass.None}
                            onClick={(event) => sendDeployableActionToChat(event, action, actor)}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                            tooltipDirection={TooltipDirection.UP}
                            tooltipHeader={getLocalized(ACTIVATION_LOCALIZE_MAP[action.deployableAction])}
                            tooltip={`${getLocalized(action.tooltip)}<br><br>${getLocalized(ACTIVATION_TOOLTIP_LOCALIZE_MAP[action.deployableAction])}`}
                        />
                    {/if}
                    {/each}
                    </div>
                </div>
            </EffectBox>
            {/if}
            <ActionBox
                actions={system.actions}
                collapseID={`${collID}.actions.list`}
                startCollapsed={false}
                
                uuid={actor.uuid}
                onClick={sendActionToChat}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            />
        </div>
    </HeaderMain>
</div>