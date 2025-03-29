<script lang="ts">
    import type { MountSlotProps } from "@/interfaces/mech/MountSlotProps";
    import { formatString, getLocalized, isLoading } from "@/scripts/helpers";
    import { SLOT_LOCALIZE_MAP } from "@/scripts/constants";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import HeaderTertiary, { H3_HEADER_STYLE, H3_ICON_SIZE } from "@/svelte/actor/header/HeaderTertiary.svelte";
    import LoadedBox from "@/svelte/actor/LoadedBox.svelte";
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import EditButton from "@/svelte/actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";
    import DamageButton from "@/svelte/actor/button/DamageButton.svelte";
    import AttackButton from "@/svelte/actor/button/AttackButton.svelte";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import WeaponMod from "@/svelte/mech/WeaponMod.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";
    import ProfileBox from "@/svelte/actor/ProfileBox.svelte";
    import { TextLogHook } from "@/enums/TextLogHook";

    const {
        mount,
        mountIndex,
    }: MountSlotProps = $props();

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
            ? "la-text-error la-anim-error horus--very--subtle -upper"
            : "la-text-header la-anim-header -upper";
    }

    function getIconStyle(weapon: any)
    {
        return isDestroyed(weapon)
            ? `la-text-repcap`
            : `-glow-header -glow-primary-hover`;
    }

    function getWeaponPath(index: number)
    {
        return `system.loadout.weapon_mounts.${mountIndex}.slots.${index}.weapon.value`
    }

    function getModPath(index: number)
    {
        return `system.loadout.weapon_mounts.${mountIndex}.slots.${index}.mod.value`
    }
    
    function getActionCollapseID(index: number)
    {
        return `${mount.uuid}_action_${index}`;
    }

    function renderLimited(weapon: any)
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

    //@ts-ignore
    function log(...args: any[])
    {
        console.log(...args);
    }
</script>

{#each mount.slots as slot, index}
{#if slot.weapon?.value}
{@const weapon = slot.weapon.value}
<!-- Snippets -->
 <!-- TODO: this could be replaced with TotalSP component -->
{#snippet costSP()}
    {#if weapon.system.sp}
    <div class="la-loading la-hexarray la-combine-h -aligncenter la-text-header -fontsize5">
        <span class="la-hexarray__span -fontsize4">{weapon.system.sp}</span>
        <i class="cci cci-system-point"></i>
    </div>
    {/if}
{/snippet}
{#snippet outerContent()}
    <div class="la-combine-v -gap0 -widthfull -padding2-l">
        {#if slot.size !== "Integrated" && weapon.system.mod}
        <WeaponMod
            mod={weapon.system.mod}
            path={`${getModPath(index)}`}
        />
        {/if}
        {#if isLoading(weapon) || weapon.isLimited() || weapon.system.sp}
        <div class="la-combine-h clipped-alt la-bckg-header-anti -widthfull">
            <LoadedBox
                item={weapon}
                path={getWeaponPath(index)}
                
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            />
            <LimitedBox
                usesValue={weapon.system.uses.value}
                usesMax={weapon.system.uses.max}
                path={getWeaponPath(index)}

                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            />
            {@render costSP()}
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
        iconBackgroundStyle={[H3_ICON_SIZE, "la-text-scrollbar-secondary"]}

        flowClass={FlowClass.RollAttack}
        path={`system.loadout.weapon_mounts.${index}`}

        tooltip={getRollWeaponTip(weapon)}
        tooltipDirection={TooltipDirection.LEFT}
        logText={getRollWeaponTip(weapon)}
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}

        disabled={isDestroyed(weapon)}
    />
{/snippet}
{#snippet headerTertiaryRightOptions()}
    <DamageButton
        iconStyle={isDestroyed(weapon) ? ["la-text-repcap"] : undefined }
        
        flowClass={FlowClass.RollDamage}
        range={weapon.system.active_profile.all_range}
        damage={weapon.system.active_profile.all_damage}

        tooltipDirection={TooltipDirection.UP}
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}

        disabled={isDestroyed(weapon)}
    />
    <div class="la-combine-v -margin3-lr">
        <MessageButton
            flowClass={FlowClass.SendToChat}
            uuid={weapon.uuid}

            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
        />
        <EditButton
            flowClass={FlowClass.ContextMenu}
            path={getWeaponPath(index)}

            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
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
        
        renderOutsideCollapse={renderLimited(weapon) ? outerContent : undefined }
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
            />
            <EffectBox
                name={getLocalized("LA.effect.attack.label")}
                effect={profile.on_attack}
            />
            <EffectBox
                name={getLocalized("LA.effect.hit.label")}
                effect={profile.on_hit}
            />
            <EffectBox
                name={getLocalized("LA.effect.crit.label")}
                effect={profile.on_crit}
            />
            <ActionBox
                actions={weapon.system.actions}
                uuid={weapon.uuid}
                path={`system.actions`}
                collapseID={getActionCollapseID(index)}
                startCollapsed={false}
            />
        {#if slot.size !== "Integrated" && !weapon.system.mod}
            <WeaponMod
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
<details class="la-details -widthfull la-combine-v
        ref set drop-settable mech_weapon"
    data-accept-types="mech_weapon"
    data-path={getWeaponPath(index)}
>
    <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1-l -widthfull">
        <div class="la-left la-combine-h">
            <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
            <span class="la-name__span -fontsize2">{getLocalized("LA.mech.mount.empty.label")}</span>
        </div>
    </summary>
    <div class="la-details__wrapper -bordersround -bordersoff">
        <div class="la-warn__span la-details__span la-text-repcap -padding3 -fontsize3 -textaligncenter -widthfull -upper">{getSlotSize(mount.slots[0].size)}</div>
    </div>
</details>
{/if}
{/if}
{/each}