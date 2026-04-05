<script lang="ts">
    import { Logger } from "@/classes/Logger";
    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
    import { getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import { CHAT_CARD_COLOR_MAP } from "@/scripts/constants";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { NPCStore } from "@/scripts/store/module-store";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { ChatCardType } from "@/enums/ChatCardType";
    import type { ChatData } from "@/interfaces/flows/ChatData";

    import HeaderSecondary, { H2_HEADER_STYLE } from "@/svelte/shared/header/HeaderSecondary.svelte";
    import EffectBox from "@/svelte/shared/EffectBox.svelte";
    import TagArray from "@/svelte/shared/TagArray.svelte";
    import EffectButton from "@/svelte/shared/button/EffectButton.svelte";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import LoadedBox from "@/svelte/shared/counter/LoadedBox.svelte";
    import LimitedBox from "@/svelte/shared/counter/LimitedBox.svelte";
    import { H2_BUTTON_ICON_STYLE } from "@/svelte/shared/button/Button.svelte";
    import ChargedBox from "@/svelte/npc/ChargedBox.svelte";

    type ReactionItemProps = {
        actor: any;
        system: any;
        reaction: any;
        pinned: boolean;
    }

    const {
        actor,
        system,
        reaction,
        pinned,
    }: ReactionItemProps = $props();

    const qualityMode = true; // TODO: change to a setting
    const tier = system.tier;
    const tooltipEnabled = getNPCSheetTooltipEnabled(); 

    let effectButtonHover = $state(false);
    let editButtonHover = $state(false);
    let messageButtonHover = $state(false);
    let pinButtonHover = $state(false);
    
    function getReactionTooltip(item: any): string 
    {
        if (item.system.effect)
            return `
                ${getLocalized("LA.trigger.label")}: ${item.system.trigger}
                <br><br>
                ${getLocalized("LA.mech.system.effect.label")}: ${item.system.effect}
                <br><br>
                ${getLocalized("LA.action.reaction.tooltip")}`;
        else
            return getLocalized("LA.action.reaction.tooltip");
    }

    function renderOuter(item: any)
    {
        return !isDestroyed(item) && (isLoading(item) || isRecharge(item) || item.system.uses.max);
    }

    function hasAccuracyBonus(item: any)
    {
        return item.system.accuracy.some((accuracy: number) => accuracy !== 0);
    }

    function hasAttackBonus(item: any)
    {
        return item.system.attack_bonus.some((bonus: number) => bonus !== 0);
    } 

    function isDestroyed(item: any)
    {
        return item.system.destroyed;
    }

    function getHeaderStyle(item: any)
    {
        return isDestroyed(item)
            ? "la-text-error la-prmy-error horus--very--subtle -strikethrough"
            : "la-text-header la-prmy-header";
    }

    function getIconStyle(item: any)
    {
        return isDestroyed(item)
            ? "la-text-repcap"
            : "la-text-header";
    }

    function sendToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, item: any)
    {
        event.stopPropagation();
        if (actor?.uuid && item)
        {
            let chatData = {
                title: item.name, 
                trigger: item.system.trigger,
                effect: item.system.effect,
                tags: item.system.tags,
                color: CHAT_CARD_COLOR_MAP[ChatCardType.Reaction],
            } as ChatData;
            SendUnknownToChatBase.getInstance().startFlow(actor.uuid, chatData);
        }
        else
            Logger.error("Tried to call LAS sendToChat without either an actor's UUID or associated object");
    }

    async function pinItem(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, item: any)
    {
        event.stopPropagation();
        if (!item.system.lid)
        {
            Logger.error("Tried pinning an NPC system that had no LID");
            return;
        }
        const currentPinned = NPCStore.get(actor.uuid).pinnedReactions || [];
        const newPinned = Array.from(new Set([...currentPinned, item.system.lid]));
        NPCStore.set(actor.uuid, { pinnedReactions: newPinned });
    }

    async function unpinItem(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, item: any)
    {
        event.stopPropagation();
        if (!item.system.lid)
        {
            Logger.error("Tried unpinning an NPC system that had no LID");
            return;
        }
        const currentPinned = NPCStore.get(actor.uuid).pinnedReactions || [];
        const newPinned = currentPinned.filter((lid: string) => lid !== item.system.lid);
        NPCStore.set(actor.uuid, { pinnedReactions: newPinned });
    }
</script>

{#snippet outerContent()}
    <div class="-widthfull -padding2-l">
        <div class="la-flexrow clipped-bot-alt la-text-header la-bckg-header-anti -widthfull -padding2-l">
            <!-- Rechargeable -->
            <ChargedBox
                item={reaction}
                path={`itemTypes.npc_feature.${reaction.index}.system.charged`}
            />
            <!-- Loading -->
            <LoadedBox
                item={reaction}
                path={`itemTypes.npc_feature.${reaction.index}.system.loaded`}
            />
            <!-- Limited -->
            <LimitedBox
                usesValue={reaction.system.uses.value}
                usesMax={reaction.system.uses.max}
                path={`itemTypes.npc_feature.${reaction.index}.system.uses`}
            />
        </div>
    </div>
{/snippet}
{#snippet headerSecondaryLeftOptions()}
    <EffectButton
        iconStyle={[getIconStyle(reaction), "cci cci-reaction -fontsize7"]}
        iconBackgroundStyle={[
            "-fontsize7 la-prmy-secondary", 
            qualityMode ? '-pulse-prmy' : 'la-text-scrollbar-secondary'
        ]}

        flowClass={FlowClass.SendEffectToChat}
        path={`itemTypes.npc_feature.${reaction.index}`}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltipDirection={TooltipDirection.UP}
        tooltipHeader={getLocalized("LA.action.reaction.label")}
        tooltip={getReactionTooltip(reaction)}

        disabled={isDestroyed(reaction)}

        onPointerEnter={() => {effectButtonHover = true;}}
        onPointerLeave={() => {effectButtonHover = false;}}
    />
{/snippet}
{#snippet headerSecondaryRightOptions()}
    <!-- Pin -->
    <GlyphButton
        style={[H2_BUTTON_ICON_STYLE, "la-flexcol -padding0-lr"]}
        flowClass={FlowClass.None}
        path={`itemTypes.npc_feature.${reaction.index}`}

        tooltipEnabled={tooltipEnabled}
        tooltipDirection={TooltipDirection.UP}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltip={getLocalized(pinned ? "LA.pin.unpinned.tooltip" : "LA.pin.pinned.tooltip")}

        onClick={(event) => {pinned ? unpinItem(event, reaction) : pinItem(event, reaction)}}
        onPointerEnter={() => {pinButtonHover = true;} }
        onPointerLeave={() => {pinButtonHover = false;} }
    >
    {#if pinned}
        <i class="mdi mdi-star la-text-warning"></i>
    {:else}
        <i class="mdi mdi-star"></i>
    {/if}
    </GlyphButton>
    <!-- Edit -->
    <GlyphButton
        style={[H2_BUTTON_ICON_STYLE, "la-flexcol -padding0-lr"]}
        flowClass={FlowClass.ContextMenu}
        path={`itemTypes.npc_feature.${reaction.index}`}

        tooltipEnabled={tooltipEnabled}
        tooltipDirection={TooltipDirection.UP}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltip={getLocalized("LA.edit.tooltip")}

        onPointerEnter={() => {editButtonHover = true;} }
        onPointerLeave={() => {editButtonHover = false;} }
    >
        <i class="fas fa-ellipsis-v"></i>
    </GlyphButton>
    <!-- Send to chat -->
    <GlyphButton
        style={[H2_BUTTON_ICON_STYLE, "-padding0-lr"]}
        flowClass={FlowClass.None}
        uuid={reaction.uuid}
        index={reaction.index}

        tooltipEnabled={tooltipEnabled}
        tooltipDirection={TooltipDirection.UP}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltip={getLocalized("LA.chat.tooltip")}

        onClick={event => sendToChat(event, reaction)}
        onPointerEnter={() => {messageButtonHover = true;} }
        onPointerLeave={() => {messageButtonHover = false;} }
    >
        <i class="mdi mdi-message"></i>
    </GlyphButton>
{/snippet}
<HeaderSecondary
    text={reaction.name}
    headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
    textStyle={[getHeaderStyle(reaction), "-fontsizemedium"]}
    borderStyle={["-bordersoff"]}
    extensionTextFunction={() => {
        if (effectButtonHover)
            return `--${getLocalized("LA.use.label")}`;
        if (messageButtonHover)
            return `--${getLocalized("LA.chat.extension")}`;
        if (editButtonHover)
            return `--${getLocalized("LA.edit.extension")}`;
        if (pinButtonHover)
            return `--${getLocalized(pinned ? "LA.pin.unpinned.extension" : "LA.pin.pinned.extension")}`;
        return undefined;
    }}

    itemID={reaction.id}
    uuid={reaction.uuid}
    path={`itemTypes.npc_feature.${reaction.index}`}
    acceptTypes={"npc_feature"}
    
    collapseID={reaction.uuid}
    startCollapsed={true}
    renderOutsideCollapse={renderOuter(reaction) ? outerContent : undefined }

    contentLeft={headerSecondaryLeftOptions}
    contentRight={headerSecondaryRightOptions}
>
{#if hasAttackBonus(reaction) || hasAccuracyBonus(reaction)}
    <div class="la-flexrow -gap0 -widthfull">
        <EffectBox
            name={getLocalized("LA.npc.attackBonus.label")}
            outerStyle={[
                hasAccuracyBonus(reaction) ? "-bordersround" : "-bordersround-ltb", 
            ]}

            tooltipEnabled={tooltipEnabled}
        >
            <span class="la-flexrow -justifycenter -aligncenter -fontsize5 -height3">
                {reaction.system.attack_bonus[tier - 1]}
                <i class="cci cci-reticule -fontsize4"></i>
            </span>
        </EffectBox>
        <EffectBox
            name={getLocalized("LA.npc.accuracy.label")}

            tooltipEnabled={tooltipEnabled}
        >
            <span class="la-flexrow -justifycenter -aligncenter -fontsize5 -height3">
                {reaction.system.accuracy[tier - 1]}
                <i class="cci cci-accuracy -fontsize6"></i>
            </span>
        </EffectBox>
    </div>
{/if}
    <EffectBox
        name={getLocalized("LA.trigger.label")}

        tooltipEnabled={tooltipEnabled}
    >
        {@html reaction.system.trigger}
    </EffectBox>
    <EffectBox
        name={getLocalized("LA.mech.system.effect.label")}
        effect={reaction.system.effect}

        tooltipEnabled={tooltipEnabled}
    />
    <EffectBox
        name={getLocalized("LA.effect.hit.label")}
        effect={reaction.system.on_hit}

        tooltipEnabled={tooltipEnabled}
    />
    <TagArray
        tags={reaction.system.tags}
        path={`itemTypes.npc_feature.${reaction.index}.system.tags`}
        justify={"start"}
    />
</HeaderSecondary>