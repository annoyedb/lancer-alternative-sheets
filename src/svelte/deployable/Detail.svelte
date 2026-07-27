<script lang="ts">
    import { formatString, getLocalized, logographicLanguage } from "@/scripts/helpers";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { getDeployableSheetTooltipEnabled } from "@/scripts/deployable/settings";
    import { ACTIVATION_COLOR_MAP, ACTIVATION_LOCALIZE_MAP, ACTIVATION_TOOLTIP_LOCALIZE_MAP, CHAT_CARD_ACTIVATION_COLOR_MAP } from "@/scripts/constants";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { DeployableSheetProps } from "@/interfaces/deployable/DeployableSheetProps";
    import type { ChatData } from "@/interfaces/flows/ChatData";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import EffectBox from "@/svelte/shared/EffectBox.svelte";
    import CollapseAllButton from "@/svelte/shared/button/CollapseAllButton.svelte";
    import ActionBox from "@/svelte/shared/ActionBox.svelte";
    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
    import FlowButton from "@/svelte/shared/button/FlowButton.svelte";
    import { Logger } from "@/classes/Logger";
    import {getAdvancedState} from "@/scripts/store/advanced";
    import StatusBar from "@/svelte/shared/StatusBar.svelte";
    import { getCustomFlagPath, getCustomFlags, handleCustomFlagValueInput } from "@/scripts/flags";
    import { CustomFlagKey } from "@/enums/CustomFlagKey";
    import { CustomFlagContentType } from "@/enums/CustomFlagContentType";
    import type { CustomFlag } from "@/interfaces/actor/CustomFlagData";
    import { TooltipFactory } from "@/classes/TooltipFactory";

    const {
        actor,
        system,
    }: DeployableSheetProps = $props();
    let collapseAllButtonHover = $state(false);

    const logographic = logographicLanguage();
    const tooltipEnabled = getDeployableSheetTooltipEnabled();
    const advancedOptions = $derived(getAdvancedState(actor.uuid));
    const collID = $derived(`${actor.uuid}.systems`);
    const customFlagsCollID = $derived(`${actor.uuid}.detail.customFlags`);
    const theme = $derived(getCSSDocumentTheme(actor.uuid));
    const actions = $derived(getDeployableActions(actor));
    const customFlagsEmptyTipMain = $derived(TooltipFactory.buildTooltip(getLocalized("LA.tab.custom.empty.tooltip.0")));
    const customFlagsEmptyTipAlt = $derived(TooltipFactory.buildTooltip(formatString(getLocalized("LA.tab.custom.empty.tooltip.1"), getLocalized("LA.tab.custom.flag.sidebarToggle.deployable.label"))));
    const customFlags = $derived(getCustomFlags(actor, CustomFlagKey.Deployable));
    const visibleCustomFlags = $derived(Object.values(customFlags).filter(flag => flag.showInSidebar));

    function getDeployableActions(deployable: any)
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
        if (actor?.uuid && action)
        {
            let chatData = {
                title: action.name, 
                trigger: action.trigger,
                effect: action.detail
            } as ChatData 
            SendUnknownToChatBase.getInstance().startFlow(actor.uuid, chatData);
        }
        else
            Logger.error("Tried to call LAS sendToChat without either an actor's UUID or associated object");
    }

    // (#4) Temporary until Lancer system implements proper deployable actions
    function sendDeployableActionToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, action: any, deployable: any)
    {
        event.stopPropagation();
        if (actor?.uuid && action)
        {
            const description = `
                <details>
                    <summary>
                    ${getLocalized("LA.mech.system.effect.label")}
                    </summary>
                    ${deployable.system.detail}
                </details>
                <hr>
                <div 
                    class="clipped lancer-header ${CHAT_CARD_ACTIVATION_COLOR_MAP[action.deployableAction]}"
                    style="
                        padding: 0.25rem;
                    "
                >
                    ${getLocalized(ACTIVATION_LOCALIZE_MAP[action.deployableAction])}
                </div>
                <div
                    style="
                        padding-top: 0.25rem;
                    "
                >
                ${getLocalized(action.tooltip)}
                </div>
            `;
            let chatData = {
                title: deployable.name, 
                description: description,
            } as ChatData
            SendUnknownToChatBase.getInstance().startFlow(actor.uuid, chatData);
        }
        else
            Logger.error("Tried to call LAS sendToChat without either an actor's UUID or associated object");
    }
</script>

{#snippet headerOptions(collID: string)}
<CollapseAllButton
    collapseID={collID}
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={theme}

    onPointerEnter={() => {collapseAllButtonHover = true;}}
    onPointerLeave={() => {collapseAllButtonHover = false;}}
/>
{/snippet}
{#snippet headerActions()}
    {@render headerOptions(`${collID}.actions`)}
{/snippet}

<div class="la-flexcol -widthfull">
    <HeaderMain
        rootStyle ={[`${ system.detail || advancedOptions ? "" : "-displaynone" }`]}
        text={getLocalized("LA.deployable.effects.label")}
        headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
        textStyle={["-fontsize4 -overflowhidden -upper"]}
        borderStyle={["la-brdr-primary -gap0"]}
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

            editOption={advancedOptions}
            editPath="system.detail"
        >
            {@html system.detail}
        </EffectBox>
    </HeaderMain>
    <HeaderMain
        text={getLocalized("LA.deployable.actions.label")}
        headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
        textStyle={["-fontsize4 -overflowhidden -upper"]}
        borderStyle={["la-brdr-primary -gap0"]}
        extensionTextFunction={() => {
            if (collapseAllButtonHover)
                return `--${getLocalized("LA.collapseAll.extension")}`;
            return undefined;
        }}
        
        collapseID="{collID}.actions"
        startCollapsed={true}

        headerContent={headerActions}
    >
        <div class="la-flexcol -gap1 -widthfull -fontsize4">
            <EffectBox
                name={getLocalized("LA.npc.utilities.label")}
            >
                <div class="la-flexrow -wrapwrap -widthfull -gap0">
                    <div class="la-flexcol -gap0 -flex1 -widthfull">
                        <FlowButton 
                            style={["clipped-alt la-bckg-secondary -widthfull -overflowhidden -lineheight3"]}
                            text={getLocalized("LA.flow.rollAttack.label")}

                            uuid={actor.uuid}
                            flowClass={FlowClass.Standard}
                            flowType={"BasicAttack"}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={theme}
                            tooltipDirection={TooltipDirection.UP}
                            tooltip={getLocalized("LA.flow.rollAttack.tooltip")}
                        />
                    </div>
                    <div class="la-flexcol -gap0 -flex1 -widthfull">
                        <FlowButton 
                            style={["clipped la-bckg-secondary -widthfull -overflowhidden -lineheight3"]}
                            text={getLocalized("LA.flow.rollDamage.label")}

                            uuid={actor.uuid}
                            flowClass={FlowClass.Standard}
                            flowType={"Damage"}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={theme}
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
                <div class="la-flexrow -wrapwrap -widthfull -gap0">
                    <div class="la-flexcol -gap0 -flex1 -widthfull">
                    {#each actions as action, index}
                    {#if index % 2 == 0}
                        <FlowButton
                            text={getLocalized(action.label)}
                            style={["clipped-alt -widthfull -overflowhidden -lineheight3", ACTIVATION_COLOR_MAP[action.deployableAction]]}

                            uuid={actor.uuid}
                            path={`system.lid`}
                            flowClass={FlowClass.None}
                            onClick={(event) => sendDeployableActionToChat(event, action, actor)}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={theme}
                            tooltipDirection={TooltipDirection.UP}
                            tooltipHeader={getLocalized(ACTIVATION_LOCALIZE_MAP[action.deployableAction])}
                            tooltip={`${getLocalized(action.tooltip)}<br><br>${getLocalized(ACTIVATION_TOOLTIP_LOCALIZE_MAP[action.deployableAction])}`}
                        />
                    {/if}
                    {/each}
                    </div>
                    <div class="la-flexcol -gap0 -flex1 -widthfull">
                    {#each actions as action, index}
                    {#if index % 2 != 0}
                        <FlowButton
                            text={getLocalized(action.label)}
                            style={["clipped -widthfull -overflowhidden -lineheight3", ACTIVATION_COLOR_MAP[action.deployableAction]]}

                            uuid={actor.uuid}
                            path={`system.lid`}
                            flowClass={FlowClass.None}
                            onClick={(event) => sendDeployableActionToChat(event, action, actor)}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={theme}
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
                actor={actor}
                onClick={sendActionToChat}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={theme}
            />
        </div>
    </HeaderMain>

    <HeaderMain
        text={getLocalized("LA.tab.custom.subLabel")}
        headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
        textStyle={["-fontsize4 -overflowhidden -upper"]}
        borderStyle={["la-brdr-primary -gap0"]}

        collapseID={customFlagsCollID}
        startCollapsed={true}
    >
        {#if visibleCustomFlags.length}
        <div class="la-flags la-flexcol -gap1 -widthfull">
        {#snippet createFractionBar(data: CustomFlag)}
        <div class="la-flexcol -widthfull -fontface-stylized">
            <div class="la-flexrow -widthfull">
                <div class="-width10"></div>
                <div class="-flex5" style="--la-flag-custom: {data.color};">
                    <StatusBar
                        name={""}
                        nameStyle={[logographic ? "-fontsizemedium" : ""]}
                        dataName={getCustomFlagPath(CustomFlagKey.Deployable, data.id, "value")}
                        currentValue={data.content.value}
                        maxValue={data.content.max}
                        barStyle={["la-bckg-custom"]}
                        barEditStyle={["la-bckg-custom"]}
                        textStyle={["la-text-text"]}
                        clipPath={"clipped-alt"}
                    />
                </div>
                <div class="-width10"></div>
            </div>
            <span class="-fontsizemedium -upper
                    {logographic ? '' : '-bold'}"
                data-tooltip={tooltipEnabled && data.tooltip ? TooltipFactory.buildTooltip(data.tooltip) : undefined}
                data-tooltip-class="clipped-bot la-tooltip {theme}"
                data-tooltip-direction={TooltipDirection.UP}
            >{data.name}</span>
        </div>
        {/snippet}

        {#snippet createValueGlyph(data: CustomFlag)}
        <div class="-widthfull">
            <div class="la-shortstat la-flexrow la-text-text -fontsize6">
                <i class="{data.icon ? data.icon : "mdi mdi-abacus"} -alignselfcenter"></i>
                <div class="la-flexcol -divider -upper -fontface-stylized -fontsizemedium la-prmy-accent -textaligncenter
                        {logographic ? '' : '-bold'}"
                    data-tooltip={tooltipEnabled && data.tooltip ? TooltipFactory.buildTooltip(data.tooltip) : undefined}
                    data-tooltip-class="clipped-bot la-tooltip {theme}"
                    data-tooltip-direction={TooltipDirection.UP}
                >
                    <input class="la-top__input -widthfull -medium -inset la-text-text -fontface-neutral -height4"
                        type="text"
                        value={data.content.value}
                        onfocus={event => event.currentTarget.select()}
                        onchange={event => handleCustomFlagValueInput(event, actor, CustomFlagKey.Deployable, data)}
                    >
                    <span class="la-bottom__span">{data.name}</span>
                </div>
            </div>
        </div>
        {/snippet}

        {#each visibleCustomFlags as flag (flag.id)}
            {#if flag.contentType === CustomFlagContentType.Fraction}
                {@render createFractionBar(flag)}
            {:else}
                {@render createValueGlyph(flag)}
            {/if}
        {/each}
        </div>
        {:else}
        <details class="la-details -widthfull la-flexcol">
            <summary class="la-details__summary la-flexrow clipped-bot-alt la-bckg-repcap la-text-header -padding1-l -widthfull"
                data-tooltip={tooltipEnabled
                    ? advancedOptions ? customFlagsEmptyTipAlt : customFlagsEmptyTipMain
                    : undefined}
                data-tooltip-class="clipped-bot la-tooltip {theme}"
                data-tooltip-direction={TooltipDirection.UP}
            >
                <span class="la-left la-flexrow">
                    <i class="la-icon mdi mdi-card-off-outline -fontsize4 -margin1-lr"></i>
                    <span class="la-name__span -fontsize4">
                        {getLocalized("LA.tab.custom.empty.label")}
                    </span>
                </span>
            </summary>
        </details>
        {/if}
    </HeaderMain>
</div>