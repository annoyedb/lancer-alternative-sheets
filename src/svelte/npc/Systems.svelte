<script lang="ts">
    import { getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE } from "@/svelte/shared/header/HeaderSecondary.svelte";
    import LoadedBox from "@/svelte/shared/counter/LoadedBox.svelte";
    import EffectBox from "@/svelte/shared/EffectBox.svelte";
    import TagArray from "@/svelte/shared/TagArray.svelte";
    import ChargedBox from "@/svelte/npc/ChargedBox.svelte";
    import CollapseAllButton from "@/svelte/shared/button/CollapseAllButton.svelte";
    import EffectButton from "@/svelte/shared/button/EffectButton.svelte";
    import EditButton, { HEADER_SECONDARY_STYLE as HEADER_SECONDARY_ICON_OPTION_STYLE } from "@/svelte/shared/button/EditButton.svelte";
    import MessageButton from "@/svelte/shared/button/MessageButton.svelte";
    import LimitedBox from "@/svelte/shared/counter/LimitedBox.svelte";

    const {
        actor,
        system,
        systems,
    }: NPCSheetProps & {systems : Array<any>} = $props();
    let collapseAllButtonHover = $state(false);
    let effectButtonHover = $state(false);
    let editButtonHover = $state(false);
    let messageButtonHover = $state(false);
    
    const tooltipEnabled = getNPCSheetTooltipEnabled(); 
    const qualityMode = true; // TODO: change to a setting
    const tier = system.tier;
    const collID = `${actor.uuid}.systems`;

    function renderOuter(component: any)
    {
        return !isDestroyed(component) && (isLoading(component) || isRecharge(component) || component.system.uses.max);
    }

    function hasAccuracyBonus(component: any)
    {
        return component.system.accuracy.some((accuracy: number) => accuracy !== 0);
    }

    function hasAttackBonus(component: any)
    {
        return component.system.attack_bonus.some((bonus: number) => bonus !== 0);
    } 

    function isDestroyed(component: any)
    {
        return component.system.destroyed;
    }

    function getHeaderStyle(component: any)
    {
        return isDestroyed(component)
            ? "la-text-error la-prmy-error horus--very--subtle -strikethrough"
            : "la-text-header la-prmy-header";
    }

    function getIconStyle(component: any)
    {
        return isDestroyed(component)
            ? "la-text-repcap"
            : "la-text-header";
    }
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
    tooltipEnabled={tooltipEnabled}
    tooltipTheme={getCSSDocumentTheme(actor.uuid)}

    onPointerEnter={() => {collapseAllButtonHover = true;}}
    onPointerLeave={() => {collapseAllButtonHover = false;}}
/>
{/snippet}

{#if systems.length}
<HeaderMain
    text={getLocalized("LA.systems.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-system"]}
    textStyle={["la-text-header", "-fontsize4", "-overflowhidden", "-upper"]}
    borderStyle={["la-brdr-system", "-gap0"]}
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
    {#each systems as component}
    {#snippet outerContent()}
        <div class="-widthfull -padding2-l">
            <div class="la-combine-h clipped-bot-alt la-text-header la-bckg-header-anti -widthfull">
                <!-- Rechargeable -->
                <ChargedBox
                    item={component}
                    path={`itemTypes.npc_feature.${component.index}.system.charged`}
                />
                <!-- Loading -->
                <LoadedBox
                    item={component}
                    path={`itemTypes.npc_feature.${component.index}.system.loaded`}
                />
                <!-- Limited -->
                <LimitedBox
                    usesValue={component.system.uses.value}
                    usesMax={component.system.uses.max}
                    path={`itemTypes.npc_feature.${component.index}.system.uses`}
                />
            </div>
        </div>
    {/snippet}
    {#snippet headerSecondaryLeftOptions()}
        <EffectButton
            iconStyle={[getIconStyle(component), "cci", "cci-system", "-fontsize7"]}
            iconBackgroundStyle={["-fontsize7", "la-prmy-secondary", `${qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"}`]}

            flowClass={FlowClass.SendEffectToChat}
            path={`itemTypes.npc_feature.${component.index}`}

            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}
            tooltipDirection={TooltipDirection.UP}
            tooltip={component.system.effect || getLocalized("LA.mech.mod.effect.tooltip")}

            disabled={isDestroyed(component)}

            onPointerEnter={() => {effectButtonHover = true;}}
            onPointerLeave={() => {effectButtonHover = false;}}
        />
    {/snippet}
    {#snippet headerSecondaryRightOptions()}
        <EditButton
            flowClass={FlowClass.ContextMenu}
            path={`itemTypes.npc_feature.${component.index}`}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}

            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}

            onPointerEnter={() => {editButtonHover = true;}}
            onPointerLeave={() => {editButtonHover = false;}}
        />
        <MessageButton
            flowClass={FlowClass.SendToChat}
            uuid={component.uuid}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}
            
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getCSSDocumentTheme(actor.uuid)}

            onPointerEnter={() => {messageButtonHover = true;}}
            onPointerLeave={() => {messageButtonHover = false;}}
        />
    {/snippet}
        <HeaderSecondary
            text={component.name}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={[getHeaderStyle(component), "-fontsizemedium"]}
            borderStyle={["-bordersoff"]}
            extensionTextFunction={() => {
                if (effectButtonHover)
                    return `--${getLocalized("LA.use.label")}`;
                if (messageButtonHover)
                    return `--${getLocalized("LA.chat.extension")}`;
                if (editButtonHover)
                    return `--${getLocalized("LA.edit.extension")}`;
                return undefined;
            }}

            itemID={component.id}
            uuid={component.uuid}
            path={`itemTypes.npc_feature.${component.index}`}
            acceptTypes={"npc_feature"}
            
            collapseID={component.uuid}
            startCollapsed={true}
            renderOutsideCollapse={renderOuter(component) ? outerContent : undefined }

            contentLeft={headerSecondaryLeftOptions}
            contentRight={headerSecondaryRightOptions}
        >
        {#if hasAttackBonus(component) || hasAccuracyBonus(component)}
            <div class="la-combine-h -gap0 -widthfull">
                <EffectBox
                    name={getLocalized("LA.npc.attackBonus.label")}
                    outerStyle={[
                        `${hasAccuracyBonus(component) ? "-bordersround" : "-bordersround-ltb"}`, 
                    ]}

                    tooltipEnabled={tooltipEnabled}
                >
                    <span class="la-combine-h -justifycenter -aligncenter -fontsize5 -height3">
                        {component.system.attack_bonus[tier - 1]}
                        <i class="cci cci-reticule -fontsize4"></i>
                    </span>
                </EffectBox>
                <EffectBox
                    name={getLocalized("LA.npc.accuracy.label")}

                    tooltipEnabled={tooltipEnabled}
                >
                    <span class="la-combine-h -justifycenter -aligncenter -fontsize5 -height3">
                        {component.system.accuracy[tier - 1]}
                        <i class="cci cci-accuracy -fontsize6"></i>
                    </span>
                </EffectBox>
            </div>
        {/if}
            <EffectBox
                name={getLocalized("LA.mech.system.effect.label")}

                tooltipEnabled={tooltipEnabled}
            >
                {@html component.system.effect}
            </EffectBox>
            <EffectBox
                name={getLocalized("LA.effect.hit.label")}
                effect={component.system.on_hit}

                tooltipEnabled={tooltipEnabled}
            />
            <TagArray
                tags={component.system.tags}
                path={`itemTypes.npc_feature.${component.index}.system.tags`}
                justify={"start"}
            />
        </HeaderSecondary>
    {/each}
    </div>
</HeaderMain>
{/if}