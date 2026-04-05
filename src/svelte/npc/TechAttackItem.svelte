<script lang="ts">
    import { Logger } from "@/classes/Logger";
    import type { ChatData } from "@/interfaces/flows/ChatData";
    import { getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { CHAT_CARD_COLOR_MAP } from "@/scripts/constants";
    import { NPCStore } from "@/scripts/store/module-store";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { FlowClass } from "@/enums/FlowClass";
    import { ChatCardType } from "@/enums/ChatCardType";
    
    import HeaderSecondary, { H2_HEADER_STYLE } from "@/svelte/shared/header/HeaderSecondary.svelte";
    import LoadedBox from "@/svelte/shared/counter/LoadedBox.svelte";
    import LimitedBox from "@/svelte/shared/counter/LimitedBox.svelte";
    import EffectBox from "@/svelte/shared/EffectBox.svelte";
    import TagArray from "@/svelte/shared/TagArray.svelte";
    import EffectButton from "@/svelte/shared/button/EffectButton.svelte";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import { H2_BUTTON_ICON_STYLE } from "@/svelte/shared/button/Button.svelte";
    import ChargedBox from "@/svelte/npc/ChargedBox.svelte";

    type TechAttackItem = {
        actor: any;
        system: any;
        tech: any;
        pinned: boolean;
    }

    const {
        actor,
        system,
        tech,
        pinned,
    }: TechAttackItem = $props();

    const accuracyTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.accuracy.tooltip"));
    const attackTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.attackBonus.tooltip"));
    const qualityMode = true; // TODO: change to a setting
    const tier = system.tier;
    const tooltipEnabled = getNPCSheetTooltipEnabled();

    let effectButtonHover = $state(false);
    let editButtonHover = $state(false);
    let messageButtonHover = $state(false);
    let pinButtonHover = $state(false);

    function getTechIcon(tech: any)
    {
        return tech.system.tech_type === "Full" ? "cci-tech-full" : "cci-tech-quick";
    }

    function getTechTipHeader(tech: any)
    {
        return tech.system.tech_type === "Full"
            ? getLocalized("LA.action.fullTech.label")
            : getLocalized("LA.action.quickTech.label");
    }

    function renderOuter(tech: any)
    {
        return !isDestroyed(tech) && (hasAccuracyBonus(tech) || hasAttackBonus(tech) || isLoading(tech) || isRecharge(tech) || tech.system.uses.max)
    }

    function hasAccuracyBonus(tech: any)
    {
        return tech.system.accuracy.some((accuracy: number) => accuracy !== 0);
    }

    function hasAttackBonus(tech: any)
    {
        return tech.system.attack_bonus.some((bonus: number) => bonus !== 0);
    } 

    function isDestroyed(tech: any)
    {
        return tech.system.destroyed;
    }

    function getHeaderStyle(tech: any)
    {
        return isDestroyed(tech)
            ? "la-text-error la-prmy-error horus--very--subtle -strikethrough"
            : "la-text-header la-prmy-header";
    }

    function getIconStyle(tech: any)
    {
        return isDestroyed(tech)
            ? "la-text-repcap"
            : "la-text-header";
    }

    function sendToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, item: any)
    {
        event.stopPropagation();
        if (actor?.uuid && item)
        {
            let accuracy = "";
            if (item.system.accuracy[tier - 1] > 0)
                accuracy = `<div class="la-flexrow">${item.system.accuracy[tier - 1]}<i class="cci cci-accuracy -fontsize6"></i></div>`
            let attackBonus = "";
            if (item.system.attack_bonus[tier - 1] > 0)
                attackBonus = `<div class="la-flexrow" style="align-items: anchor-center;">${item.system.attack_bonus[tier - 1]}<i class="cci cci-reticule -fontsize4 -padding0"></i></div>`
            const description = `
                <div 
                    class="la-flexrow -justifyevenly clipped-alt -fontsize5 -padding0-tb -padding1-lr"
                    style="
                        background-color: var(--weapon-color);
                        color: var(--light-text);
                        align-items: baseline;
                    "
                >
                    ${accuracy}
                    ${attackBonus}
                </div>
            `;
            let chatData = {
                title: item.name, 
                description: (accuracy || attackBonus) ? description : '',
                trigger: item.system.trigger,
                effect: item.system.effect,
                onHit: item.system.on_hit,
                tags: item.system.tags,
                color: CHAT_CARD_COLOR_MAP[ChatCardType.Tech],
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
            Logger.error("Tried pinning an NPC tech attack that had no LID");
            return;
        }
        const currentPinned = NPCStore.get(actor.uuid).pinnedTechs || [];
        const newPinned = Array.from(new Set([...currentPinned, item.system.lid]));
        NPCStore.set(actor.uuid, { pinnedTechs: newPinned });
    }

    async function unpinItem(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, item: any)
    {
        event.stopPropagation();
        if (!item.system.lid)
        {
            Logger.error("Tried unpinning an NPC tech attack that had no LID");
            return;
        }
        const currentPinned = NPCStore.get(actor.uuid).pinnedTechs || [];
        const newPinned = currentPinned.filter((lid: string) => lid !== item.system.lid);
        NPCStore.set(actor.uuid, { pinnedTechs: newPinned });
    }
</script>

{#snippet outerContent()}
    <div class="-widthfull -padding2-l">
        <div class="la-flexrow clipped-bot-alt la-text-header la-bckg-header-anti -widthfull">
            {#if hasAccuracyBonus(tech)}
                <span class="la-flexrow -justifycenter -aligncenter -fontsize5 -padding0-lr"
                    data-tooltip={accuracyTip}
                    data-tooltip-class="clipped-bot la-tooltip {getCSSDocumentTheme(actor.uuid)}"
                    data-tooltip-direction={"DOWN"}
                >
                    {tech.system.accuracy[tier - 1]}
                    <i class="cci cci-accuracy -fontsize6"></i>
                </span>
            {/if}
            {#if hasAttackBonus(tech)}
                <span class="la-flexrow -justifycenter -aligncenter -fontsize5 -padding0-lr"
                    data-tooltip={attackTip}
                    data-tooltip-class="clipped-bot la-tooltip {getCSSDocumentTheme(actor.uuid)}"
                    data-tooltip-direction={"DOWN"}
                >
                    {tech.system.attack_bonus[tier - 1]}
                    <i class="cci cci-reticule -fontsize4"></i>
                </span>
            {/if}
            <!-- Rechargeable -->
            <ChargedBox
                item={tech}
                path={`itemTypes.npc_feature.${tech.index}.system.charged`}
            />
            <!-- Loading -->
            <LoadedBox
                item={tech}
                path={`itemTypes.npc_feature.${tech.index}.system.loaded`}
            />
            <!-- Limited -->
            <LimitedBox
                usesValue={tech.system.uses.value}
                usesMax={tech.system.uses.max}
                path={`itemTypes.npc_feature.${tech.index}.system.uses`}
            />
        </div>
    </div>
{/snippet}
{#snippet headerSecondaryLeftOptions()}
    <!-- Only 'tech attacks' need to pull up the tech attack flow, just 'use' otherwise -->
    <EffectButton
        iconStyle={["cci -fontsize7", getIconStyle(tech), getTechIcon(tech)]}
        iconBackgroundStyle={["-fontsize7 la-prmy-secondary", qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"]}

        flowClass={tech.system.attack_bonus.every((bonus: number) => bonus === 0) ? FlowClass.SendEffectToChat : FlowClass.RollTech}
        path={`itemTypes.npc_feature.${tech.index}`}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltipDirection={TooltipDirection.UP}
        tooltipHeader={getTechTipHeader(tech)}
        tooltip={tech.system.effect || getLocalized("LA.mech.mod.effect.tooltip")}

        disabled={isDestroyed(tech)}

        onPointerEnter={() => {effectButtonHover = true;}}
        onPointerLeave={() => {effectButtonHover = false;}}
    />
{/snippet}
{#snippet headerSecondaryRightOptions()}
    <!-- Pin -->
    <GlyphButton
        style={[H2_BUTTON_ICON_STYLE, "la-flexcol -padding0-lr"]}
        flowClass={FlowClass.None}
        path={`itemTypes.npc_feature.${tech.index}`}

        tooltipEnabled={tooltipEnabled}
        tooltipDirection={TooltipDirection.UP}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltip={getLocalized(pinned ? "LA.pin.unpinned.tooltip" : "LA.pin.pinned.tooltip")}

        onClick={(event) => {pinned ? unpinItem(event, tech) : pinItem(event, tech)}}
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
        path={`itemTypes.npc_feature.${tech.index}`}

        tooltipEnabled={tooltipEnabled}
        tooltipDirection={TooltipDirection.UP}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltip={getLocalized("LA.edit.tooltip")}

        onPointerEnter={() => {editButtonHover = true;} }
        onPointerLeave={() => {editButtonHover = false;} }
    >
        <i class="fas fa-ellipsis-v"></i>
    </GlyphButton>
    <!-- Send to Chat -->
    <GlyphButton
        style={[H2_BUTTON_ICON_STYLE, "-padding0-lr"]}
        flowClass={FlowClass.None}
        index={tech.index}
        uuid={tech.uuid}

        tooltipEnabled={tooltipEnabled}
        tooltipDirection={TooltipDirection.UP}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltip={getLocalized("LA.chat.tooltip")}

        onClick={event => sendToChat(event, tech)}
        onPointerEnter={() => {messageButtonHover = true;} }
        onPointerLeave={() => {messageButtonHover = false;} }
    >
        <i class="mdi mdi-message"></i>
    </GlyphButton>
{/snippet}
<HeaderSecondary
    text={tech.name}
    headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
    textStyle={[getHeaderStyle(tech), "-fontsizemedium"]}
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

    itemID={tech.id}
    uuid={tech.uuid}
    path={`itemTypes.npc_feature.${tech.index}`}
    acceptTypes={"npc_feature"}
    
    collapseID={tech.uuid}
    startCollapsed={true}
    renderOutsideCollapse={renderOuter(tech) ? outerContent : undefined }

    contentLeft={headerSecondaryLeftOptions}
    contentRight={headerSecondaryRightOptions}
>
    <EffectBox
        name={getLocalized("LA.mech.system.effect.label")}

        tooltipEnabled={tooltipEnabled}
    >
        {@html tech.system.effect}
    </EffectBox>
    <EffectBox
        name={getLocalized("LA.effect.hit.label")}
        effect={tech.system.on_hit}

        tooltipEnabled={tooltipEnabled}
    />
    <TagArray
        tags={tech.system.tags}
        path={`itemTypes.npc_feature.${tech.index}.system.tags`}
        justify={"start"}
    />
</HeaderSecondary>