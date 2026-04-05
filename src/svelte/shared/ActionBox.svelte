<script lang="ts">
    import type { Snippet } from "svelte";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import type { ChatData } from "@/interfaces/flows/ChatData";
    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { 
        ACTIVATION_COLOR_MAP, 
        ACTIVATION_ICON_MAP, 
        ACTIVATION_LOCALIZE_MAP, 
        ACTIVATION_TOOLTIP_LOCALIZE_MAP, 
        CHAT_CARD_ACTIVATION_COLOR_MAP, 
    } from "@/scripts/constants";
    import { getLocalized } from "@/scripts/helpers";
    import { slugify } from "@/scripts/lancer/util/lid";

    import FlowButton from "@/svelte/shared/button/FlowButton.svelte";
    import EffectBox from "@/svelte/shared/EffectBox.svelte";
    import HeaderQuinary from "@/svelte/shared/header/HeaderQuinary.svelte";
    import EffectButton from "@/svelte/shared/button/EffectButton.svelte";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import { H2_ICON_SIZE } from "@/svelte/shared/header/HeaderSecondary.svelte";
    import { H2_BUTTON_ICON_STYLE } from "@/svelte/shared/button/Button.svelte";
    import { Logger } from "@/classes/Logger";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { TextLogHook } from "@/enums/TextLogHook";

    export type ActionBoxProps = {
        children?: Snippet;
        flowButton?: Snippet;

        actions: Array<any>;
        actor?: any; // Not really used but mandatory for Flows (send-to-chat, edit, etc)
        path?: string;
        uuid?: string;
        
        editable?: boolean;
        editDetails?: boolean;

        collapseID?: string;
        startCollapsed?: boolean;

        /**
         * Optional event handler for when the user clicks on the left button component.
         * @param event 
         * @returns 
         */
        onClick?: (event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, action: any) => void;

        /**
         * Optional parameter to disable the left button component.
         */
        disableLeftButton?: boolean;
    }

    const {
        children,
        flowButton,

        actions,
        actor,
        path,
        uuid,

        editable,
        editDetails,
        collapseID,
        startCollapsed,

        onClick,
        disableLeftButton,

        tooltipEnabled,
        tooltipTheme,
        logType,
        logTypeReset
    }: ActionBoxProps & TooltipProps & TextLogEventProps = $props();

    let effectButtonHover = $state(false);
    let messageButtonHover = $state(false);

    const isMechSheet = actor?.type === "mech" || false;
    const qualityMode = true; // TODO: change to a setting
    const defaultPlaceholder = getLocalized("LA.placeholder");
    
    function getActivationClass(activation: string): string 
    {
        return `activation-${slugify(activation, "-")}`;
    }

    function getActivationName(activation: string): string 
    {
        return `${getLocalized("LA.use.label")} ${getLocalized(ACTIVATION_LOCALIZE_MAP[activation])}`;
    }

    function getReactionTooltip(action: any): string 
    {
        if (action.trigger)
            return `
                ${getLocalized("LA.trigger.label")}: ${action.trigger}
                <br><br>
                ${getLocalized("LA.mech.system.effect.label")}: ${action.detail}
                <br><br>
                ${getLocalized(ACTIVATION_TOOLTIP_LOCALIZE_MAP[action.activation])}`;
        else
            return `${action.detail}<br><br>${getLocalized(ACTIVATION_TOOLTIP_LOCALIZE_MAP[action.activation])}`;
    }

    // Once actor uuids are no longer required in the Lancer to activate flows, refactor this component to stop using it
    // (literally only pulled in for this)
    function sendToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, item: any)
    {
        event.stopPropagation();
        if (actor?.uuid && item)
        {
            let chatData = null;
            if (item.trigger)
            {
                chatData = {
                    title: item.name,
                    trigger: item.trigger,
                    effect: item.detail,
                    color: CHAT_CARD_ACTIVATION_COLOR_MAP[item.activation] || '',
                } as ChatData;
            }
            else
            {
                chatData = {
                    title: item.name,
                    description: item.detail,
                    color: CHAT_CARD_ACTIVATION_COLOR_MAP[item.activation] || '',
                } as ChatData;
            }
            SendUnknownToChatBase.getInstance().startFlow(actor.uuid, chatData);
        }
        else 
            Logger.error("Tried to call LAS sendToChat without either an actor's UUID or associated object");
    }
</script>

{#if actions.length > 0}
{#each actions as action, index}
{#snippet defaultFlowButton()}
    <FlowButton
        text={getActivationName(action.activation)}
        style={["clipped-bot", ACTIVATION_COLOR_MAP[action.activation]]}

        uuid={uuid}
        path={`${path}.${index}`}
        flowClass={action && uuid && path 
            ? `${FlowClass.CoreActivation} ${getActivationClass(action.activation)}`
            : getActivationClass(action.activation)
        }

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={tooltipTheme}
        tooltipDirection={undefined}
        tooltipHeader={getLocalized(ACTIVATION_LOCALIZE_MAP[action.activation])}
        tooltip={getLocalized(ACTIVATION_TOOLTIP_LOCALIZE_MAP[action.activation])}
        logType={logType}
        logTypeReset={logTypeReset}
    />
{/snippet}
{#snippet outercontent()}    
    {#if flowButton}
        {@render flowButton()}
    {/if}
{/snippet}
{#snippet headerQuinaryRightOptions()}
    <!-- TODO: test edit actions -->
    {#if editable}
        <button type="button"
            class="la-actionheader__button mdi mdi-pencil -fontsize5" 
            aria-label={getLocalized("LA.edit.label")}>
        </button>
        <button 
            class="la-actionheader__button mdi mdi-delete -fontsize5" 
            data-action="splice"
            data-uuid={uuid}
            data-path={path}
            aria-label={getLocalized("LA.delete.label")}
        >
        </button>
    {/if}
    <!-- Send to chat -->
    {#if actor}
    <GlyphButton
        style={[H2_BUTTON_ICON_STYLE, "-margin2-r"]}
        flowClass={FlowClass.None}
        uuid={uuid}
        path={path}

        tooltipEnabled={tooltipEnabled}
        tooltipDirection={TooltipDirection.UP}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltip={getLocalized("LA.chat.tooltip")}
        logText={getLocalized("LA.chat.tooltip")}
        logType={isMechSheet ? TextLogHook.MechHeader : TextLogHook.PilotHeader }
        logTypeReset={isMechSheet ? TextLogHook.MechHeaderReset : TextLogHook.PilotHeaderReset }
        
        onClick={event => sendToChat(event, action)}
        onPointerEnter={() => {messageButtonHover = true;} }
        onPointerLeave={() => {messageButtonHover = false;} }
    >
        <i class="mdi mdi-message"></i>
    </GlyphButton>
    {/if}
{/snippet}
{#snippet headerQuinaryLeftOptions()}
    <EffectButton
        style={["-positionabsolute", "-left0", "-top0", "-padding0-l"]}
        iconStyle={[H2_ICON_SIZE, ACTIVATION_ICON_MAP[action.activation]]}
        iconBackgroundStyle={[H2_ICON_SIZE, "-padding0-l", "la-prmy-secondary", `${qualityMode ? `${qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"}` : "la-text-scrollbar-secondary"}`]}

        flowClass={onClick
            ? FlowClass.None
            : action && uuid && path 
                ? `${FlowClass.CoreActivation} ${getActivationClass(action.activation)}`
                : getActivationClass(action.activation)
        }
        uuid={uuid}
        path={`${path}.${index}`}
        onClick={onClick ? (event) => onClick(event, action) : undefined }

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={tooltipTheme}
        tooltipHeader={getLocalized(ACTIVATION_LOCALIZE_MAP[action.activation])}
        tooltip={getReactionTooltip(action)}
        tooltipDirection={TooltipDirection.LEFT}
        logType={logType}
        logTypeReset={logTypeReset}

        disabled={disableLeftButton}

        onPointerEnter={() => {effectButtonHover = true;}}
        onPointerLeave={() => {effectButtonHover = false;}}
    />    
{/snippet}
    <HeaderQuinary
        text={action.name}
        headerStyle={[ACTIVATION_COLOR_MAP[action.activation], "-padding0-l"]}
        textStyle={["la-text-header", "la-prmy-header", "-lineheight7"]}
        extensionTextFunction={() => {
            if (effectButtonHover)
                return `--${getLocalized("LA.chat.extension")}`;
            if (messageButtonHover)
                return `--${getLocalized("LA.chat.extension")}`;
            return undefined;
        }}

        uuid={uuid}
        path={`${path}.${index}`}
        collapseID={`${collapseID}.${index}`}
        startCollapsed={startCollapsed}

        contentLeft={headerQuinaryLeftOptions}
        contentRight={headerQuinaryRightOptions}
        renderOutsideCollapse={outercontent}
    >    
    <!-- Action Box Content -->
    {#if action.trigger}
        <div class="-fontsizemedium">
            <div class="la-divider-h la-bckg-primary -margin0-tb -margin2-b"></div>
            <!-- Trigger -->
            <EffectBox
                name={getLocalized("LA.trigger.label")}
                outerStyle={["-bordersround"]}

                tooltipEnabled={tooltipEnabled}
                logType={logType}
                logTypeReset={logTypeReset}
            >
            {#if !collapseID}
                {@render defaultFlowButton()}
                <hr class="-widthfull">
            {/if}
                {@html action.trigger || defaultPlaceholder}
            </EffectBox>
            <!-- TODO: allow editDetails -->
            <EffectBox
                name={getLocalized("LA.mech.system.effect.label")}
                outerStyle={["-bordersround"]}

                editOption={editDetails}
                editPath={`${path}.detail`}

                tooltipEnabled={tooltipEnabled}
                logType={logType}
                logTypeReset={logTypeReset}
            >
                {@html action.detail || defaultPlaceholder}
            </EffectBox>
        {#if children}
            {@render children()}
        {/if}
        </div>
    {:else}
        <div class="-fontsizemedium">
            <div class="la-divider-h la-bckg-primary -margin0-tb -margin2-b"></div>
            {#if !collapseID}
                {@render defaultFlowButton()}
                <hr class="-widthfull">
            {/if}
            <EffectBox
                name={getLocalized(ACTIVATION_LOCALIZE_MAP[action.activation])}
                outerStyle={["-bordersround"]}

                tooltipEnabled={tooltipEnabled}
                logType={logType}
                logTypeReset={logTypeReset}
            >
                {@html action.detail || defaultPlaceholder}
            </EffectBox>
        {#if children}
            {@render children()}
        {/if}
        </div>
    {/if}
    <!-- The original source reference opened the potential for tags to appear here,
        but official Lancer data does not have tags for IActionData 
    -->
    </HeaderQuinary>
{/each}
{/if}