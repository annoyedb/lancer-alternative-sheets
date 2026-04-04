<script lang="ts">
    import type { LancerActor } from "@/types/foundryvtt-lancer/module/actor/lancer-actor";
    import type { DeployableBoxProps } from "@/interfaces/actor/DeployableBoxProps";
    import type { ChatData } from "@/interfaces/flows/ChatData";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";

    import { 
        ACTIVATION_COLOR_MAP, 
        ACTIVATION_LOCALIZE_MAP, 
        ACTIVATION_TOOLTIP_LOCALIZE_MAP, 
        CHAT_CARD_ACTIVATION_COLOR_MAP 
    } from "@/scripts/constants";

    import { getLocalized } from "@/scripts/helpers";
    import { getBrightness } from "@/scripts/theme";
    import { getThemeKey } from "@/scripts/store/theme";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";

    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
    import { TooltipFactory } from "@/classes/TooltipFactory";

    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { FlowClass } from "@/enums/FlowClass";

    import FlowButton from "@/svelte/shared/button/FlowButton.svelte";
    import ActionBox from "@/svelte/shared/ActionBox.svelte";

    const {
        source, 
        lidSource, 
        uuid,
        sheetUUID,

        tooltipEnabled,
        tooltipClass,
        tooltipTheme,
        logType,
        logTypeReset,
    }: DeployableBoxProps & TooltipProps & TextLogEventProps = $props(); // (#4)
    const themeOverride = getThemeKey(sheetUUID);
    const tip = TooltipFactory.buildTooltip(getLocalized("LA.mech.system.deployable.tooltip"));
    const globallyOwnedDeployables: StoredDocument<any>[] = game.actors!.filter(
        (a) => !!(a.is_deployable() && a.system.owner?.value == source)
    );
    
    function lidSourceHasDeployable(deployable: StoredDocument<LancerActor>)
    {
        return lidSource.deployables?.includes(deployable.system.lid) ?? false;
    }

    const defaultImages = [
        "systems/lancer/assets/icons/deployable.svg", 
        "systems/lancer/assets/icons/white/deployable.svg"
    ];
    
    function getThemeImg(deployable: StoredDocument<LancerActor>)
    {
        let theme = getBrightness(themeOverride);
        // If not assigned an image
        if (!deployable.img)
            return theme === "dark" 
                ? "systems/lancer/assets/icons/white/generic_item.svg" 
                : "systems/lancer/assets/icons/generic_item.svg";
        // If for some reason the assigned deployable is the default image
        else if (defaultImages.includes(deployable.img))
            return theme === "dark" 
                ? deployable.img.replace('/icons/', '/icons/white/') 
                : deployable.img
        else
            return deployable.img;
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
            let chatData = {
                title: action.name, 
                trigger: action.trigger,
                effect: action.detail,
                color: CHAT_CARD_ACTIVATION_COLOR_MAP[action.activation],
            } as ChatData 
            SendUnknownToChatBase.getInstance().startFlow(uuid, chatData);
        }
    }

    // (#4) Temporary until Lancer system implements proper deployable actions
    function sendDeployableActionToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, action: any, deployable: any)
    {
        event.stopPropagation();
        console.log(deployable);
        if (uuid && action)
        {
            const effect = `
                <details>
                    <summary>
                    ${getLocalized("LA.mech.system.effect.label")}
                    </summary>
                    ${deployable.system.detail}
                </details>
            `;
            const description = `
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
                description: deployable.system.detail ? effect + description : description,
            } as ChatData
            SendUnknownToChatBase.getInstance().startFlow(uuid, chatData);
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
        <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsizesmall
                click-open -upper"
        ><!--
        --->{deployable.name ? deployable.name : ""}<!--
    ---></span>
        <!-- Generated Content -->
        <div class="la-generated -gap2 la-flexcol">
            <div class="-fontsizemedium">
                <!-- Deployable Actions -->
                <div class="la-effectbox-buttons la-flexrow -justifybetween">
                    <div class="la-flexcol -alignstart">
                    <!-- (#4) -->
                    {#each getDeployableActions(deployable) as action}
                        <FlowButton
                            text={getLocalized(action.label)}
                            style={["clipped-bot", "-widthfull", ACTIVATION_COLOR_MAP[action.deployableAction]]}

                            uuid={deployable.uuid}
                            path={`deployables.${deployable.system.lid}`}
                            flowClass={FlowClass.None}
                            onClick={(event) => sendDeployableActionToChat(event, action, deployable)}

                            tooltipEnabled={tooltipEnabled}
                            tooltipTheme={tooltipTheme}
                            tooltipDirection={TooltipDirection.LEFT}
                            tooltipHeader={getLocalized(ACTIVATION_LOCALIZE_MAP[action.deployableAction])}
                            tooltip={`${getLocalized(action.tooltip)}<br><br>${getLocalized(ACTIVATION_TOOLTIP_LOCALIZE_MAP[action.deployableAction])}`}
                            logType={logType}
                            logTypeReset={logTypeReset}
                        />
                    {/each}
                    </div>
                    <img class="-height15 click-open la-prmy-secondary -glow-prmy la-scdy-primary -glow-scdy-hover" 
                        src={getThemeImg(deployable)}
                        alt={getLocalized("LA.placeholder")}
                        data-tooltip={tooltipEnabled ? tip : undefined}
                        data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
                        data-tooltip-direction={TooltipDirection.LEFT}
                        onpointerenter={ logType ? event => sendToLog(event, getLocalized("LA.mech.system.deployable.tooltip"), logType) : undefined }
                        onpointerleave={ logTypeReset ? event => resetLog(event, logTypeReset) : undefined }
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
                path={`system.actions`}

                uuid={uuid || deployable.uuid}
                actor={source}
                disableLeftButton={uuid ? false : true}
                onClick={uuid ? sendActionToChat : undefined }

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={tooltipTheme}
                logType={logType}
                logTypeReset={logTypeReset}
            />
        {/if}
        </div>
    </div>
    {/if}
{/each}
{/if}