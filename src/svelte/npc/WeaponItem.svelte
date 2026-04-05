<script lang="ts">
    import type { ChatData } from "@/interfaces/flows/ChatData";
    import { formatString, getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { CHAT_CARD_COLOR_MAP } from "@/scripts/constants";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { Logger } from "@/classes/Logger";
    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { FlowClass } from "@/enums/FlowClass";
    import { ChatCardType } from "@/enums/ChatCardType";

    import HeaderTertiary, { H3_HEADER_STYLE, H3_ICON_SIZE } from "@/svelte/shared/header/HeaderTertiary.svelte";
    import LoadedBox from "@/svelte/shared/counter/LoadedBox.svelte";
    import EffectBox from "@/svelte/shared/EffectBox.svelte";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import DamageButton from "@/svelte/shared/button/DamageButton.svelte";
    import AttackButton from "@/svelte/shared/button/AttackButton.svelte";
    import TagArray from "@/svelte/shared/TagArray.svelte";
    import LimitedBox from "@/svelte/shared/counter/LimitedBox.svelte";
    import { H2_BUTTON_ICON_STYLE } from "@/svelte/shared/button/Button.svelte";
    import ChargedBox from "@/svelte/npc/ChargedBox.svelte";
    
    type WeaponItemProps = {
        actor: any;
        tier: number;
        weapon: any;
        index: number;
    };

    const {
        actor,
        tier,
        weapon,
        index,
    }: WeaponItemProps = $props();

    const accuracyTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.accuracy.tooltip"));
    const attackTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.attackBonus.tooltip"));
    const qualityMode = true; // TODO: change to a setting
    const tooltipEnabled = getNPCSheetTooltipEnabled();

    let attackButtonHover = $state(false);
    let damageButtonHover = $state(false);
    let messageButtonHover = $state(false);
    let editButtonHover = $state(false);
    
    function renderOuter(item: any)
    {
        return !isDestroyed(item) && (isRecharge(item) || item.system.uses.max || isLoading(item) || hasAccuracyBonus(item) || hasAttackBonus(item));
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

    function getTitleStyle(item: any)
    {
        return isDestroyed(item)
            ? "la-text-repcap -strikethrough"
            : "la-text-header";
    }

    function getSubtitleStyle(item:any)
    {
        return isDestroyed(item)
            ? "la-text-error la-prmy-error horus--very--subtle"
            : "la-text-header la-prmy-header";
    }

    function getIconStyle(item: any)
    {
        return isDestroyed(item)
            ? "la-text-repcap"
            : "la-text-header la-prmy-header -glow-prmy la-scdy-primary -glow-scdy-hover";
    }

    function getRollWeaponTip(item: any)
    {
        return formatString(
            getLocalized("LA.flow.rollAttack.template.tooltip"), 
            item.name);
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
            let range = "";
            item.system.range.map((rng: any) => {
                range += `<div class="la-flexrow">${rng.val}<i class="cci cci-${rng.type.toLowerCase()} -fontsize6"></i></div>`
            });
            let damage = "";
            item.system.damage[tier - 1].map((dmg: any) => {
                damage += `<div class="la-flexrow">${dmg.val}<i class="cci cci-${dmg.type.toLowerCase()} -fontsize6"></i></div>`;
            });
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
                    ${range}
                    ${damage}
                </div>
            `;
            let chatData = {
                title: item.name, 
                description: (accuracy || attackBonus || range || damage) ? description : '',
                trigger: item.system.trigger,
                effect: item.system.effect,
                onHit: item.system.on_hit,
                tags: item.system.tags,
                color: CHAT_CARD_COLOR_MAP[ChatCardType.Weapon],
            } as ChatData;
            SendUnknownToChatBase.getInstance().startFlow(actor.uuid, chatData);
        }
        else
            Logger.error("Tried to call LAS sendToChat without either an actor's UUID or associated object");
    }
</script>

{#snippet outerContent()}
    <div class="-widthfull -padding2-l">
        <div class="la-flexrow clipped-bot-alt la-text-header la-bckg-header-anti -widthfull">
        {#if hasAccuracyBonus(weapon)}
            <span class="la-flexrow -justifycenter -aligncenter -fontsize5 -padding0-lr"
                data-tooltip={tooltipEnabled ? accuracyTip : undefined}
                data-tooltip-class="clipped-bot la-tooltip {getCSSDocumentTheme(actor.uuid)}"
                data-tooltip-direction={TooltipDirection.DOWN}
            >
                {weapon.system.accuracy[tier - 1]}
                <i class="cci cci-accuracy -fontsize6"></i>
            </span>
        {/if}
        {#if hasAttackBonus(weapon)}
            <span class="la-flexrow -justifycenter -aligncenter -fontsize5 -padding0-lr"
                data-tooltip={tooltipEnabled ? attackTip : undefined}
                data-tooltip-class="clipped-bot la-tooltip {getCSSDocumentTheme(actor.uuid)}"
                data-tooltip-direction={TooltipDirection.DOWN}
            >
                {weapon.system.attack_bonus[tier - 1]}
                <i class="cci cci-reticule -fontsize4"></i>
            </span>
        {/if}
            <!-- Rechargeable -->
            <ChargedBox
                item={weapon}
                path={`itemTypes.npc_feature.${weapon.index}.system.charged`}
            />
            <!-- Loading -->
            <LoadedBox
                item={weapon}
                path={`itemTypes.npc_feature.${weapon.index}.system.loaded`}
            />
            <!-- Limited -->
            <LimitedBox
                usesValue={weapon.system.uses.value}
                usesMax={weapon.system.uses.max}
                path={`itemTypes.npc_feature.${weapon.index}.system.uses`}
            />
        </div>
    </div>
{/snippet}
{#snippet headerTertiaryLeftOptions()}
    <AttackButton
        iconStyle={[H3_ICON_SIZE, getIconStyle(weapon), "cci cci-weapon"]}
        iconBackgroundStyle={[
            "la-prmy-secondary", 
            H3_ICON_SIZE, 
            qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"
        ]}

        flowClass={FlowClass.RollAttack}
        path={`system.loadout.weapon_mounts.${index}`}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltipDirection={TooltipDirection.UP}
        tooltip={ weapon.system.effect
            ? `${getRollWeaponTip(weapon)}<br><br>${weapon.system.effect}` 
            : getRollWeaponTip(weapon)}

        disabled={isDestroyed(weapon)}

        onPointerEnter={() => {attackButtonHover = true;}}
        onPointerLeave={() => {attackButtonHover = false;}}
    />
{/snippet}
{#snippet headerTertiaryRightOptions()}
    <DamageButton
        iconStyle={isDestroyed(weapon) ? ["la-text-repcap"] : undefined }
        iconBackgroundStyle={[
            "-fontsize9 la-prmy-secondary", 
            qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"
        ]}
        
        flowClass={FlowClass.RollDamage}
        range={weapon.system.range}
        damage={weapon.system.damage[tier - 1]}

        tooltipEnabled={tooltipEnabled}
        tooltipDirection={TooltipDirection.UP}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}

        disabled={isDestroyed(weapon)}

        onPointerEnter={() => {damageButtonHover = true;}}
        onPointerLeave={() => {damageButtonHover = false;}}
    />
    <div class="la-flexcol -margin3-lr">
        <!-- Send to Chat -->
        <GlyphButton
            style={[H2_BUTTON_ICON_STYLE]}
            flowClass={FlowClass.None}
            uuid={weapon.uuid}
            index={weapon.index}

            tooltipEnabled={tooltipEnabled}
            tooltipDirection={TooltipDirection.UP}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            tooltip={getLocalized("LA.chat.tooltip")}

            onClick={event => sendToChat(event, weapon)}
            onPointerEnter={() => {messageButtonHover = true;} }
            onPointerLeave={() => {messageButtonHover = false;} }
        >
            <i class="mdi mdi-message"></i>
        </GlyphButton>
        <!-- Edit -->
        <GlyphButton
            style={[H2_BUTTON_ICON_STYLE, "la-flexcol -padding0-lr"]}
            flowClass={FlowClass.ContextMenu}
            path={`itemTypes.npc_feature.${weapon.index}`}

            tooltipEnabled={tooltipEnabled}
            tooltipDirection={TooltipDirection.UP}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            tooltip={getLocalized("LA.edit.tooltip")}

            onPointerEnter={() => {editButtonHover = true;} }
            onPointerLeave={() => {editButtonHover = false;} }
        >
            <i class="fas fa-ellipsis-v"></i>
        </GlyphButton>
    </div>
{/snippet}
<HeaderTertiary
    itemID={weapon.id}
    uuid={weapon.uuid}
    path={`itemTypes.npc_feature.${weapon.index}`}
    acceptTypes={"npc_feature"}
    collapseID={weapon.uuid}
    startCollapsed={true}

    text={weapon.name}
    headerStyle={[H3_HEADER_STYLE, "la-bckg-pilot"]}
    headerFontStyle={[getTitleStyle(weapon), "-fontsizemedium"]}

    subText={isDestroyed(weapon) ? getLocalized("LA.mech.slot.destroyed.label") : weapon.system.weapon_type}
    subHeaderFontStyle={[getSubtitleStyle(weapon), "-fontsizesmall"]}
    borderStyle={["-bordersoff"]}
    extensionTextFunction={() => {
        if (attackButtonHover)
            return `--${getLocalized("LA.flow.rollAttack.extension")}`;
        if (damageButtonHover)
            return `--${getLocalized("LA.flow.rollDamage.extension")}`;
        if (messageButtonHover)
            return `--${getLocalized("LA.chat.extension")}`;
        if (editButtonHover)
            return `--${getLocalized("LA.edit.extension")}`;
        return undefined;
    }}

    renderOutsideCollapse={renderOuter(weapon) ? outerContent : undefined }
    contentLeft={headerTertiaryLeftOptions}
    contentRight={headerTertiaryRightOptions}
>
    <EffectBox
        name={getLocalized("LA.mech.system.effect.label")}
        effect={weapon.system.effect}

        tooltipEnabled={tooltipEnabled}
    />
    <EffectBox
        name={getLocalized("LA.effect.hit.label")}
        effect={weapon.system.on_hit}

        tooltipEnabled={tooltipEnabled}
    />
    <TagArray 
        tags={weapon.system.tags}
        path={`itemTypes.npc_feature.${weapon.index}.system.all_tags`}
        justify={"end"}
    />
</HeaderTertiary>