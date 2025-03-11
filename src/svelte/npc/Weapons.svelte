<script lang="ts">
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
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

    const {
        actor,
        system,
        weapons,
    }: NPCSheetProps & {weapons : Array<any>} = $props();
    
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
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
/>
{/snippet}

{#if weapons.length}
<HeaderMain
    text={getLocalized("LA.weapons.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-mech-weapon"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-mech-weapon", "-gap0"]}
    
    collapseID={collID}
    startCollapsed={true}

    headerContent={headerOptions}
>
    <div class="la-combine-v -gap0 -widthfull">
    {#each weapons as weapon, index}
    {#snippet outerContent()}
        <div class="la-combine-h clipped-bot-alt la-text-header la-bckg-header-anti -widthfull -padding2-l">
        {#if hasAccuracyBonus(weapon)}
            <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -padding0-lr"
                data-tooltip={accuracyTip}
                data-tooltip-class={"clipped-bot la-tooltip"}
                data-tooltip-direction={TooltipDirection.DOWN}
            >
                {weapon.system.accuracy[tier - 1]}
                <i class="cci cci-accuracy -fontsize4"></i>
            </span>
        {/if}
        {#if hasAttackBonus(weapon)}
            <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -padding0-lr"
                data-tooltip={attackTip}
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
    {/snippet}
    {#snippet headerTertiaryLeftOptions()}
        <AttackButton
            iconStyle={[H3_ICON_SIZE, getIconStyle(weapon), "cci", "cci-weapon"]}
            iconBackgroundStyle={[H3_ICON_SIZE, "la-text-scrollbar-secondary"]}

            flowClass={FlowClass.RollAttack}
            path={`system.loadout.weapon_mounts.${index}`}

            tooltip={ weapon.system.effect
                ? `${getLocalized("LA.flow.rollAttack.tooltip")}<br><br>${weapon.system.effect}` 
                : getLocalized("LA.flow.rollAttack.tooltip")}
            tooltipDirection={TooltipDirection.UP}

            disabled={isDestroyed(weapon)}
        />
    {/snippet}
    {#snippet headerTertiaryRightOptions()}
        <DamageButton
            textStyle={isDestroyed(weapon) ? ["la-text-repcap"] : undefined}
            
            flowClass={FlowClass.RollDamage}
            range={weapon.system.range}
            damage={weapon.system.damage[tier - 1]}

            tooltipDirection={TooltipDirection.UP}

            disabled={isDestroyed(weapon)}
        />
        <div class="la-combine-v -margin3-lr">
            <MessageButton
                flowClass={FlowClass.SendToChat}
                uuid={weapon.uuid}
            />
            <EditButton
                flowClass={FlowClass.ContextMenu}
                path={`itemTypes.npc_feature.${weapon.index}`}
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

            renderOutsideCollapse={hasWeaponSpecial(weapon) ? outerContent : undefined}
            headerContentLeft={headerTertiaryLeftOptions}
            headerContentRight={headerTertiaryRightOptions}
        >
            <EffectBox
                name={getLocalized("LA.mech.system.effect.label")}
                effect={weapon.system.effect}
            />
            <EffectBox
                name={getLocalized("LA.effect.hit.label")}
                effect={weapon.system.on_hit}
            />
        </HeaderTertiary>
    {/each}
    </div>
</HeaderMain>
{/if}