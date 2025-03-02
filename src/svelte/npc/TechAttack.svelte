<script lang="ts">
    import HeaderMain from "@/svelte/actor/HeaderMain.svelte";
    import HeaderSecondary from "@/svelte/actor/HeaderSecondary.svelte";
    import LoadedBox from "@/svelte/actor/LoadedBox.svelte";
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import FlowButton from "@/svelte/actor/FlowButton.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";
    import ChargedBox from "@/svelte/npc/ChargedBox.svelte";
    import { getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipFactory } from "@/classes/TooltipFactory";

    const {
        actor,
        collapse,
        system,
        techs,
    }: NPCSheetProps & {techs : Array<any>} = $props();

    const tier = system.tier;
    let collID = `${actor.uuid}_systems`;
    const accuracyTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.accuracy.tooltip"));
    const attackTip = TooltipFactory.buildTooltip(getLocalized("LA.npc.attackBonus.tooltip"));

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

    function hasTechSpecial(tech: any)
    {
        return isRecharge(tech) || tech.system.uses.max || isLoading(tech) || hasAccuracyBonus(tech) || hasAttackBonus(tech);
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
            ? "la-text-error horus--very--subtle -strikethrough"
            : "la-text-header";
    }
</script>

{#if techs.length}
<HeaderMain
    title={getLocalized("LA.npc.techAttacks.label")}
    headerStyle={["la-bckg-action--tech", "clipped-top", "-padding0-tb", "-padding3-lr"]}
    headerFontStyle={["la-text-header", "-fontsize2"]}
    borderStyle={["la-brdr-action--tech", "-gap0"]}
    
    collapse={collapse}
    collapseID={collID}
    startCollapsed={true}

    collapseAllOption={true}
>
    <div class="la-combine-v -gap0 -widthfull">
    {#each techs as tech}
    {#snippet techSpecial()}
        <div class="la-combine-h clipped-alt la-text-header la-bckg-header-anti -widthfull -margin2-l">
            {#if hasAccuracyBonus(tech)}
                <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -padding0-lr"
                    data-tooltip={accuracyTip}
                    data-tooltip-class={"clipped-bot la-tooltip"}
                    data-tooltip-direction={"DOWN"}
                >
                    {tech.system.accuracy[tier - 1]}
                    <i class="cci cci-accuracy -fontsize4"></i>
                </span>
            {/if}
            {#if hasAttackBonus(tech)}
                <span class="la-combine-h -justifycenter -aligncenter -fontsize3 -padding0-lr"
                    data-tooltip={attackTip}
                    data-tooltip-class={"clipped-bot la-tooltip"}
                    data-tooltip-direction={"DOWN"}
                >
                    {tech.system.attack_bonus[tier - 1]}
                    <i class="cci cci-reticule -fontsize2"></i>
                </span>
            {/if}
            <ChargedBox
                item={tech}
            />
            <LoadedBox
                item={tech}
            />
            <LimitedBox
                usesValue={tech.system.uses.value}
                usesMax={tech.system.uses.max}
            />
        </div>
    {/snippet}
        <HeaderSecondary
            title={tech.name}
            headerStyle={["la-bckg-pilot", "clipped-bot-alt", "-padding0", "la-text-header", "-padding3-r"]}
            headerFontStyle={[getHeaderStyle(tech), "-fontsize1"]}
            headerIconStyle={["cci", getTechIcon(tech), "-fontsize5", "-lineheight3", "-glow-primary-hover", "-glow-header"]}
            borderStyle={["-bordersoff"]}

            itemID={tech.id}
            uuid={tech.uuid}
            path={`itemTypes.npc_feature.${tech.index}`}
            acceptTypes={"npc_feature"}
            
            collapse={collapse}
            collapseID={tech}
            startCollapsed={true}
            renderOutsideCollapse={hasTechSpecial(tech) ? techSpecial : undefined}

            editOption={true}
            editStyle={["-glow-header", "-glow-primary-hover", "-fontsize2", "-padding0-lr"]}
            messageOption={true}
            messageUUID={tech.uuid}
            messageStyle={["-glow-header", "-glow-primary-hover", "-fontsize2", "-padding0-lr"]}

            useEffectOption={true}
            useEffectTooltip={tech.system.effect || getLocalized("LA.mech.mod.effect.tooltip")}
            useEffectTooltipHeader={getTechTipHeader(tech)}
            useEffectTooltipDirection={"UP"}
            useEffectBackgroundStyle={["-fontsize5", "-lineheight3", "la-text-scrollbar-secondary", "-padding0-l"]}
            useEffectClass={FlowClass.Tech}
        >
            <EffectBox
                name={getLocalized("LA.mech.system.effect.label")}
            >
                <FlowButton
                    name={getLocalized("LA.use.label")}
                    flowClass={FlowClass.Effect}
                    style={["clipped-bot", "la-bckg-secondary"]}
                />
                <hr>
                {@html tech.system.effect}
            </EffectBox>
            <EffectBox
                name={getLocalized("LA.effect.hit.label")}
                effect={tech.system.on_hit}
            />
            <TagArray
                tags={tech.system.tags}
                path={`itemTypes.npc_feature.${tech.index}.system.tags`}
                justify={"start"}
            />
        </HeaderSecondary>
    {/each}
    </div>
</HeaderMain>
{/if}