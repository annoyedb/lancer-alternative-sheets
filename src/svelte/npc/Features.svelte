<script lang="ts">
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import HeaderMain from "@/svelte/actor/HeaderMain.svelte";
    import HeaderTertiary from "@/svelte/actor/HeaderTertiary.svelte";
    import LoadedBox from "@/svelte/actor/LoadedBox.svelte";
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import { getLocalized } from "@/scripts/helpers";

    const {
        actor,
        collapse,
        itemTypes,
        system,
    }: NPCSheetProps = $props();

    const tier = system.tier;
    const traits: Array<any> = [];
    const systems: Array<any> = [];
    const reactions: Array<any> = [];
    const weapons: Array<any> = [];
    itemTypes.npc_feature.forEach((feature: { system: { type: any; }; }) => {
        switch (feature.system.type) {
            case "Trait":
                traits.push(feature);
                break;
            case "System":
                systems.push(feature);
                break;
            case "Reaction":
                reactions.push(feature);
                break;
            case "Weapon":
                weapons.push(feature);
                break;
        }
    });

    let weaponCollID = `${actor.uuid}_weapons`;
    // let systemCollID = `${actor.uuid}_systems`;
    // let reactionCollID = `${actor.uuid}_reactions`;
    // let traitCollID = `${actor.uuid}_traits`;

    function hasAccuracyBonus(weapon: any)
    {
        return weapon.system.accuracy.some((accuracy: number) => accuracy !== 0);
    }
    function hasAttackBonus(weapon: any)
    {
        return weapon.system.attack_bonus.some((bonus: number) => bonus !== 0);
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

    function isDestroyed(weapon: any)
    {
        return weapon.system.destroyed;
    }

    //@ts-ignore
    function log(any: any)
    {
        console.log(any);
    }
</script>

{#if itemTypes.npc_feature.length}
{#if weapons.length}
<HeaderMain
    title={getLocalized("LA.weapons.label")}
    headerStyle={["la-bckg-mech-weapon", "clipped-top", "-padding0-tb", "-padding3-lr"]}
    headerFontStyle={["la-text-header", "-fontsize2"]}
    borderStyle={["la-brdr-mech-weapon"]}
    
    collapse={collapse}
    collapseID={weaponCollID}
    startCollapsed={true}

    collapseAllOption={true}
>
{#each weapons as weapon}
{log(weapon)}
    <HeaderTertiary
        title={weapon.name}
        headerStyle={["la-bckg-pilot", "clipped-bot-alt", "-padding0-tb", "la-text-header"]}
        headerFontStyle={[getHeaderStyle(weapon), "-fontsize3"]}
        
        subTitle={weapon.system.weapon_type}
        subHeaderFontStyle={[getSubtitleStyle(weapon), "-fontsize0"]}
        borderStyle={["-bordersoff"]}

        itemID={weapon.uuid}
        uuid={weapon.uuid}
        path={""}
        acceptTypes={""}
        
        collapse={collapse}
        collapseID={weapon}
        startCollapsed={false}

        rollAttackOption={true}
        rollAttackStyle={[getRollStyle(weapon)]}
        weaponOption={true}
        weaponDestroyed={weapon.system.destroyed}
        weaponRange={weapon.system.range}
        weaponDamage={weapon.system.damage[tier - 1]}

        editOption={true}
        messageOption={true}
    >
        {#if weapon.system.uses.max || weapon.system.loaded}
        <div class="la-combine-h -gap0 -widthfull">
            <LoadedBox
                item={weapon}
            />
            <LimitedBox
                usesValue={weapon.system.uses.value}
                usesMax={weapon.system.uses.max}
            />
        </div>
        {/if}
        {#if hasAttackBonus(weapon) || hasAccuracyBonus(weapon)}
        <div class="la-combine-h -gap0 -widthfull">
            <EffectBox
                name={getLocalized("LA.npc.tier.attackBonus.label")}
                outerStyle={[
                    `${hasAccuracyBonus(weapon) ? "-bordersround" : "-bordersround-ltb"}`, 
                ]}
            >
                <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -height1">
                    {weapon.system.attack_bonus[tier - 1]}
                    <i class="cci cci-reticule -fontsize2"></i>
                </span>
            </EffectBox>
            <EffectBox
                name={getLocalized("LA.npc.tier.accuracy.label")}
            >
                <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -height1">
                    {weapon.system.accuracy[tier - 1]}
                    <i class="cci cci-accuracy -fontsize4"></i>
                </span>
            </EffectBox>
        </div>
        {/if}
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
</HeaderMain>
{/if}
{/if}