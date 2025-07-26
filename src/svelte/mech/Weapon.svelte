<script lang="ts">
    import type { MountSlotProps } from "@/interfaces/mech/MountSlotProps";
    import type { ChatData } from "@/interfaces/flows/ChatData";
    import { formatString, getLocalized, isLoading } from "@/scripts/helpers";
    import { getMechSheetTooltipEnabled } from "@/scripts/mech/settings";
    import { SLOT_LOCALIZE_MAP } from "@/scripts/constants";
    import { getDocumentTheme } from "@/scripts/theme";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { AcceptType } from "@/enums/AcceptType";
    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
    import HeaderTertiary, { H3_HEADER_STYLE, H3_ICON_SIZE } from "@/svelte/actor/header/HeaderTertiary.svelte";
    import LoadedBox from "@/svelte/actor/counter/LoadedBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import EditButton from "@/svelte/actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";
    import DamageButton from "@/svelte/actor/button/DamageButton.svelte";
    import AttackButton from "@/svelte/actor/button/AttackButton.svelte";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import WeaponMod from "@/svelte/mech/WeaponMod.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";
    import ProfileBox from "@/svelte/actor/ProfileBox.svelte";
    import SpCostArray from "@/svelte/actor/SPCostArray.svelte";
    import LimitedBox from "@/svelte/actor/counter/LimitedBox.svelte";
    import EmptyBox from "@/svelte/actor/EmptyBox.svelte";

    const {
        actor,
        mount,
        mountIndex,
    }: MountSlotProps = $props();
    let attackButtonHover = $state(false);
    let damageButtonHover = $state(false);
    let messageButtonHover = $state(false);
    let editButtonHover = $state(false);

    const tooltipEnabled = getMechSheetTooltipEnabled();
    const qualityMode = true; // TODO: change to a setting

    function getSlotSize(size: string)
    {
        return size === "Flex"
            ? `${getLocalized(SLOT_LOCALIZE_MAP['Main'])} || 2x ${getLocalized(SLOT_LOCALIZE_MAP['Auxiliary'])}`
            : getLocalized(SLOT_LOCALIZE_MAP[size]) || "any";
    }

    function isDestroyed(weapon: any)
    {
        return weapon.system.destroyed;
    }

    function getHeaderStyle(weapon: any)
    {
        return isDestroyed(weapon)
            ? "la-text-repcap -strikethrough"
            : "la-text-header";
    }

    function getSubtitle(weapon: any)
    {
        if (isDestroyed(weapon))
            return getLocalized("LA.mech.slot.destroyed.label")
        if (weapon.system.size && weapon.system.active_profile.type)
            return `${weapon.system.size} ${weapon.system.active_profile.type}`
        else
            return getLocalized("LA.placeholder");
    }

    function getSubtitleStyle(weapon:any)
    {
        return isDestroyed(weapon)
            ? "la-text-error la-prmy-error horus--very--subtle -upper"
            : "la-text-header la-prmy-header -upper";
    }

    function getIconStyle(weapon: any)
    {
        return isDestroyed(weapon)
            ? "la-text-repcap"
            : "la-prmy-header -glow-prmy la-scdy-primary -glow-scdy-hover";
    }

    function getWeaponPath(index: number)
    {
        return `system.loadout.weapon_mounts.${mountIndex}.slots.${index}.weapon.value`
    }

    function getModPath(index: number)
    {
        return `system.loadout.weapon_mounts.${mountIndex}.slots.${index}.mod.value`
    }
    
    function getActionCollapseID(index: number, profileIndex?: number)
    {
        return profileIndex !== undefined
            ? `${mount.uuid}.action.${index}.profile.${profileIndex}` 
            : `${mount.uuid}.action.${index}`;
    }

    function renderOuter(weapon: any)
    {
        return (
            weapon.system.sp || 
            isLoading(weapon) || 
            weapon.isLimited() || 
            weapon.system.mod ||
            weapon.system.profiles.length > 1
        );
    }

    function getRollWeaponTip(weapon: any)
    {
        return formatString(
            getLocalized("LA.flow.rollAttack.template.tooltip"), 
            weapon.name);
    }

    function sendToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, weapon: any)
    {
        event.stopPropagation();
        if (actor && weapon)
        {
            let chatData = {
                title: weapon.name, 
                effect: weapon.system.active_profile.effect,
                onAttack: weapon.system.active_profile.on_attack,
                onHit: weapon.system.active_profile.on_hit,
                onCrit: weapon.system.active_profile.on_crit,
                tags: weapon.system.active_profile.tags,
            } as ChatData;
            SendUnknownToChatBase.getInstance().startFlow(actor.uuid, chatData);
        }
    }
</script>

{#each mount.slots as slot, index}
{#if slot.weapon?.value}
{@const weapon = slot.weapon.value}
<!-- Snippets -->
{#snippet outerContent()}
    <div class="la-combine-v -gap0 -widthfull -padding2-l">
    {#if slot.size !== "Integrated" && weapon.system.mod}
        <WeaponMod
            actor={actor}
            mod={weapon.system.mod}
            path={`${getModPath(index)}`}
        />
    {/if}
    {#if isLoading(weapon) || weapon.isLimited() || weapon.system.sp}
        <div class="la-combine-h clipped-alt la-bckg-header-anti -widthfull">
            <!-- Loading -->
            <LoadedBox
                item={weapon}
                path={getWeaponPath(index)}
                
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            />
            <!-- Limited -->
            <LimitedBox
                usesValue={weapon.system.uses.value}
                usesMax={weapon.system.uses.max}
                path={getWeaponPath(index)}

                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            />
            <SpCostArray
                cost={weapon.system.sp}
            />
        </div>
    {/if}
        <ProfileBox
            profiles={weapon.system.profiles}
            weapon={weapon}
            path={`${getWeaponPath(index)}.system.selected_profile_index`}
            style={["-widthfull", "la-bckg-header-anti", "la-text-header", "clipped-alt"]}

            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
        />
    </div>
{/snippet}
{#snippet headerTertiaryLeftOptions()}
    <AttackButton
        iconStyle={[H3_ICON_SIZE, getIconStyle(weapon), "cci", "cci-weapon"]}
        iconBackgroundStyle={[H3_ICON_SIZE, "la-prmy-secondary", `${qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"}`]}

        flowClass={FlowClass.RollAttack}
        path={`system.loadout.weapon_mounts.${index}`}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getDocumentTheme(actor.uuid)}
        tooltipDirection={TooltipDirection.LEFT}
        tooltip={getRollWeaponTip(weapon)}
        logText={getRollWeaponTip(weapon)}
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}

        disabled={isDestroyed(weapon)}

        onPointerEnter={() => {attackButtonHover = true;} }
        onPointerLeave={() => {attackButtonHover = false;} }
    />
{/snippet}
{#snippet headerTertiaryRightOptions()}
    <DamageButton
        iconStyle={isDestroyed(weapon) ? ["la-text-repcap"] : undefined }
        iconBackgroundStyle={["-fontsize7", "la-prmy-secondary", `${qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"}`]}
        
        flowClass={FlowClass.RollDamage}
        range={weapon.system.active_profile.all_range}
        damage={weapon.system.active_profile.all_damage}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getDocumentTheme(actor.uuid)}
        tooltipDirection={TooltipDirection.UP}
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}

        disabled={isDestroyed(weapon)}

        onPointerEnter={() => {damageButtonHover = true;} }
        onPointerLeave={() => {damageButtonHover = false;} }
    />
    <div class="la-combine-v -margin3-lr">
        <MessageButton
            flowClass={FlowClass.None}
            uuid={weapon.uuid}

            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getDocumentTheme(actor.uuid)}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}

            onClick={event => sendToChat(event, weapon)}
            onPointerEnter={() => {messageButtonHover = true;} }
            onPointerLeave={() => {messageButtonHover = false;} }
        />
        <EditButton
            flowClass={FlowClass.ContextMenu}
            path={getWeaponPath(index)}

            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getDocumentTheme(actor.uuid)}
            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}

            onPointerEnter={() => {editButtonHover = true;} }
            onPointerLeave={() => {editButtonHover = false;} }
        />
    </div>
{/snippet}
<!-- /Snippets -->
    <!-- Weapon -->
    <HeaderTertiary
        itemID={weapon.id}
        uuid={weapon.uuid}
        path={getWeaponPath(index)}
        acceptTypes={"mech_weapon"}
        collapseID={weapon.uuid}
        startCollapsed={true}

        text={weapon.name}
        headerStyle={[H3_HEADER_STYLE, "la-bckg-pilot"]}
        headerFontStyle={[getHeaderStyle(weapon), "-fontsize2"]}

        subText={getSubtitle(weapon)}
        subHeaderFontStyle={[getSubtitleStyle(weapon), "-fontsize0"]}
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
        headerContentLeft={headerTertiaryLeftOptions}
        headerContentRight={headerTertiaryRightOptions}
    >
    {#if !weapon.system.destroyed}
        {@const profile = weapon.system.active_profile}
        <div class="la-generated -widthfull -gap2 la-combine-v">
            <!-- Generated Content -->
            <EffectBox
                name={getLocalized("LA.mech.system.effect.label")}
                effect={profile.effect}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            />
            <EffectBox
                name={getLocalized("LA.effect.attack.label")}
                effect={profile.on_attack}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            />
            <EffectBox
                name={getLocalized("LA.effect.hit.label")}
                effect={profile.on_hit}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            />
            <EffectBox
                name={getLocalized("LA.effect.crit.label")}
                effect={profile.on_crit}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            />
            <ActionBox
                actions={weapon.system.actions}
                uuid={weapon.uuid}
                path={`system.actions`}

                collapseID={getActionCollapseID(index)}
                startCollapsed={false}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            />
            <ActionBox
                actions={profile.actions}
                uuid={weapon.uuid}
                path={`system.active_profile.actions`}

                collapseID={getActionCollapseID(index, weapon.system.selected_profile_index)}
                startCollapsed={false}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(actor.uuid)}
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            />
        {#if slot.size !== "Integrated" && !weapon.system.mod}
        <!-- RAW integrated weapons can't have weapon mods but whatever -->
            <WeaponMod
                actor={actor}
                mod={weapon.system.mod}
                path={`${getModPath(index)}`}
            />
        {/if}
            <TagArray 
                tags={profile.all_tags}
                path={`${getWeaponPath(index)}.system.profiles.${weapon.system.selected_profile_index}.all_tags`}
                justify={"start"}
            />
        </div>
    {/if}
    </HeaderTertiary>
{:else}
<!-- Empty Weapon -->
<!-- svelte-ignore block_empty -->
{#if index === 1 && mount.slots[0].size === "Flex" && 
    (mount.slots[0].weapon?.value.system.size !== "Auxiliary")}
{:else}
<EmptyBox
    label={getLocalized("LA.mech.mount.empty.label")}
    subLabel={getSlotSize(mount.slots[0].size)}
    type={AcceptType.MechWeapon}
    path={getWeaponPath(index)}
/>
{/if}
{/if}
{/each}