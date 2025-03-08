<script lang="ts">
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderTertiary from "@/svelte/actor/header/HeaderTertiary.svelte";
    import LoadedBox from "@/svelte/actor/LoadedBox.svelte";
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import ChargedBox from "@/svelte/npc/ChargedBox.svelte";
    import { getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";

    const {
        actor,
        collapse,
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

    function getHeaderStyle(weapon: any)
    {
        return isDestroyed(weapon)
            ? "la-text-repcap -strikethrough"
            : "la-text-header";
    }

    function getSubtitleStyle(weapon:any)
    {
        return isDestroyed(weapon)
            ? "la-text-error horus--very--subtle"
            : "la-text-header";
    }

    function getRollStyle(weapon: any)
    {
        return isDestroyed(weapon)
            ? "la-text-repcap"
            : "la-text-header";
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
    textStyle={["la-text-header", "-fontsize2"]}
    borderStyle={["la-brdr-mech-weapon", "-gap0"]}
    
    collapseID={collID}
    startCollapsed={true}

    headerContent={headerOptions}
>
    <div class="la-combine-v -gap0 -widthfull">
    {#each weapons as weapon}
    {#snippet weaponSpecial()}
        <div class="la-combine-h clipped-alt la-text-header la-bckg-header-anti -widthfull -margin2-l">
        {#if hasAccuracyBonus(weapon)}
            <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -padding0-lr"
                data-tooltip={accuracyTip}
                data-tooltip-class={"clipped-bot la-tooltip"}
                data-tooltip-direction={"DOWN"}
            >
                {weapon.system.accuracy[tier - 1]}
                <i class="cci cci-accuracy -fontsize4"></i>
            </span>
        {/if}
        {#if hasAttackBonus(weapon)}
            <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -padding0-lr"
                data-tooltip={attackTip}
                data-tooltip-class={"clipped-bot la-tooltip"}
                data-tooltip-direction={"DOWN"}
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
        <HeaderTertiary
            title={weapon.name}
            headerStyle={["la-bckg-pilot", "clipped-bot-alt", "-padding0-tb", "la-text-header"]}
            headerFontStyle={[getHeaderStyle(weapon), "-fontsize1"]}
            
            subTitle={isDestroyed(weapon) ? getLocalized("LA.mech.slot.destroyed.label") : weapon.system.weapon_type}
            subHeaderFontStyle={[getSubtitleStyle(weapon), "-fontsize0"]}
            borderStyle={["-bordersoff"]}

            itemID={weapon.id}
            uuid={weapon.uuid}
            path={`itemTypes.npc_feature.${weapon.index}`}
            acceptTypes={"npc_feature"}
            
            collapse={collapse}
            collapseID={weapon}
            startCollapsed={true}
            renderOutsideCollapse={hasWeaponSpecial(weapon) ? weaponSpecial : undefined}

            rollAttackOption={true}
            rollAttackStyle={[getRollStyle(weapon)]}
            rollAttackTooltip={ weapon.system.effect
                ? `${getLocalized("LA.flow.rollAttack.tooltip")}<br><br>${weapon.system.effect}` 
                : getLocalized("LA.flow.rollAttack.tooltip")}
            rollAttackTooltipDirection={"UP"}
            weaponOption={true}
            weaponDestroyed={weapon.system.destroyed}
            weaponRange={weapon.system.range}
            weaponDamage={weapon.system.damage[tier - 1]}

            editOption={true}
            messageOption={true}
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