<script lang="ts">
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { formatString, getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { FlowClass } from "@/enums/FlowClass";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderTertiary, { H3_HEADER_STYLE, H3_ICON_SIZE } from "@/svelte/actor/header/HeaderTertiary.svelte";
    import LoadedBox from "@/svelte/actor/LoadedBox.svelte";
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import ChargedBox from "@/svelte/npc/ChargedBox.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import EditButton from "@/svelte/actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";
    import DamageButton from "@/svelte/actor/button/DamageButton.svelte";
    import AttackButton from "@/svelte/actor/button/AttackButton.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";

    const {
        actor,
        system,
        weapons,
    }: NPCSheetProps & {weapons : Array<any>} = $props();
    let collapseAllButtonHover = $state(false);
    let attackButtonHover = $state(false);
    let damageButtonHover = $state(false);
    let messageButtonHover = $state(false);
    let editButtonHover = $state(false);

    const tooltipEnabled = getNPCSheetTooltipEnabled();
    const tier = system.tier;
    const collID = `${actor.uuid}.weapons`;
    const accuracyTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.accuracy.tooltip"));
    const attackTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.attackBonus.tooltip"));

    function hasWeaponSpecial(weapon: any)
    {
        return isRecharge(weapon) || weapon.system.uses.max || isLoading(weapon) || hasAccuracyBonus(weapon) || hasAttackBonus(weapon);
    }

    function hasAccuracyBonus(weapon: any)
    {
        return weapon.system.accuracy.some((accuracy: number) => accuracy !== 0);
    }

    function hasAttackBonus(weapon: any)
    {
        return weapon.system.attack_bonus.some((bonus: number) => bonus !== 0);
    } 

    function isDestroyed(weapon: any)
    {
        return weapon.system.destroyed;
    }

    function getTitleStyle(weapon: any)
    {
        return isDestroyed(weapon)
            ? "la-text-repcap -strikethrough"
            : "la-text-header";
    }

    function getSubtitleStyle(weapon:any)
    {
        return isDestroyed(weapon)
            ? "la-text-error la-anim-error horus--very--subtle"
            : "la-text-header la-anim-header";
    }

    function getIconStyle(weapon: any)
    {
        return isDestroyed(weapon)
            ? "la-text-repcap"
            : "la-text-header -glow-header -glow-primary-hover";
    }

    function getRollWeaponTip(weapon: any)
    {
        return formatString(
            getLocalized("LA.flow.rollAttack.template.tooltip"), 
            weapon.name);
    }
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
    tooltipEnabled={tooltipEnabled}

    onPointerEnter={() => {collapseAllButtonHover = true;}}
    onPointerLeave={() => {collapseAllButtonHover = false;}}
/>
{/snippet}

{#if weapons.length}
<HeaderMain
    text={getLocalized("LA.weapons.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-mech-weapon"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-mech-weapon", "-gap0"]}
    extensionTextFunction={() => {
        if (collapseAllButtonHover)
            return `--${getLocalized("LA.collapseAll.extension")}`;
        return undefined;
    }}
    
    collapseID={collID}
    startCollapsed={true}

    headerContent={headerOptions}
>
    <div class="la-combine-v -gap0 -widthfull">
    {#each weapons as weapon, index}
    {#snippet outerContent()}
        {#if !isDestroyed(weapon)}
        <div class="-widthfull -padding2-l">
            <div class="la-combine-h clipped-bot-alt la-text-header la-bckg-header-anti -widthfull">
            {#if hasAccuracyBonus(weapon)}
                <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -padding0-lr"
                    data-tooltip={tooltipEnabled ? accuracyTip : undefined}
                    data-tooltip-class={"clipped-bot la-tooltip"}
                    data-tooltip-direction={TooltipDirection.DOWN}
                >
                    {weapon.system.accuracy[tier - 1]}
                    <i class="cci cci-accuracy -fontsize4"></i>
                </span>
            {/if}
            {#if hasAttackBonus(weapon)}
                <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -padding0-lr"
                    data-tooltip={tooltipEnabled ? attackTip : undefined}
                    data-tooltip-class={"clipped-bot la-tooltip"}
                    data-tooltip-direction={TooltipDirection.DOWN}
                >
                    {weapon.system.attack_bonus[tier - 1]}
                    <i class="cci cci-reticule -fontsize2"></i>
                </span>
            {/if}
                <ChargedBox
                    item={weapon}
                />
                <LoadedBox
                    item={weapon}
                />
                <LimitedBox
                    usesValue={weapon.system.uses.value}
                    usesMax={weapon.system.uses.max}
                />
            </div>
        </div>
        {/if}
    {/snippet}
    {#snippet headerTertiaryLeftOptions()}
        <AttackButton
            iconStyle={[H3_ICON_SIZE, getIconStyle(weapon), "cci", "cci-weapon"]}
            iconBackgroundStyle={[H3_ICON_SIZE, "la-text-scrollbar-secondary"]}

            flowClass={FlowClass.RollAttack}
            path={`system.loadout.weapon_mounts.${index}`}

            tooltipEnabled={tooltipEnabled}
            tooltip={ weapon.system.effect
                ? `${getRollWeaponTip(weapon)}<br><br>${weapon.system.effect}` 
                : getRollWeaponTip(weapon)}
            tooltipDirection={TooltipDirection.UP}

            disabled={isDestroyed(weapon)}

            onPointerEnter={() => {attackButtonHover = true;}}
            onPointerLeave={() => {attackButtonHover = false;}}
        />
    {/snippet}
    {#snippet headerTertiaryRightOptions()}
        <DamageButton
            iconStyle={isDestroyed(weapon) ? ["la-text-repcap"] : undefined }
            
            flowClass={FlowClass.RollDamage}
            range={weapon.system.range}
            damage={weapon.system.damage[tier - 1]}

            tooltipEnabled={tooltipEnabled}
            tooltipDirection={TooltipDirection.UP}

            disabled={isDestroyed(weapon)}

            onPointerEnter={() => {damageButtonHover = true;}}
            onPointerLeave={() => {damageButtonHover = false;}}
        />
        <div class="la-combine-v -margin3-lr">
            <MessageButton
                flowClass={FlowClass.SendToChat}
                uuid={weapon.uuid}

                tooltipEnabled={tooltipEnabled}

                onPointerEnter={() => {messageButtonHover = true;}}
                onPointerLeave={() => {messageButtonHover = false;}}
            />
            <EditButton
                flowClass={FlowClass.ContextMenu}
                path={`itemTypes.npc_feature.${weapon.index}`}

                tooltipEnabled={tooltipEnabled}

                onPointerEnter={() => {editButtonHover = true;}}
                onPointerLeave={() => {editButtonHover = false;}}
            />
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
            headerFontStyle={[getTitleStyle(weapon), "-fontsize1"]}

            subText={isDestroyed(weapon) ? getLocalized("LA.mech.slot.destroyed.label") : weapon.system.weapon_type}
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

            renderOutsideCollapse={hasWeaponSpecial(weapon) ? outerContent : undefined }
            headerContentLeft={headerTertiaryLeftOptions}
            headerContentRight={headerTertiaryRightOptions}
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
    {/each}
    </div>
</HeaderMain>
{/if}