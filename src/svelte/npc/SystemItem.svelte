<script lang="ts">
    import { Logger } from "@/classes/Logger";
    import { getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { NPCStore } from "@/scripts/store/module-store";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";

    import HeaderSecondary, { H2_HEADER_STYLE } from "@/svelte/shared/header/HeaderSecondary.svelte";
    import EffectBox from "@/svelte/shared/EffectBox.svelte";
    import TagArray from "@/svelte/shared/TagArray.svelte";
    import EffectButton from "@/svelte/shared/button/EffectButton.svelte";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import LoadedBox from "@/svelte/shared/counter/LoadedBox.svelte";
    import LimitedBox from "@/svelte/shared/counter/LimitedBox.svelte";
    import { H2_BUTTON_ICON_STYLE } from "@/svelte/shared/button/Button.svelte";
    import ChargedBox from "@/svelte/npc/ChargedBox.svelte";

    type SystemItemProps = {
        actor: any;
        system: any;
        component: any;
        pinned: boolean;
    }

    const {
        actor,
        system,
        component,
        pinned,
    }: SystemItemProps = $props();

    const qualityMode = true; // TODO: change to a setting
    const tier = system.tier;
    const tooltipEnabled = getNPCSheetTooltipEnabled(); 

    let effectButtonHover = $state(false);
    let editButtonHover = $state(false);
    let messageButtonHover = $state(false);
    let pinButtonHover = $state(false);

    function renderOuter(item: any)
    {
        return !isDestroyed(item) && (isLoading(item) || isRecharge(item) || item.system.uses.max);
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

    function getHeaderStyle(item: any)
    {
        return isDestroyed(item)
            ? "la-text-error la-prmy-error horus--very--subtle -strikethrough"
            : "la-text-header la-prmy-header";
    }

    function getIconStyle(item: any)
    {
        return isDestroyed(item)
            ? "la-text-repcap"
            : "la-text-header";
    }

    async function pinItem(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, item: any)
    {
        event.stopPropagation();
        if (!item.system.lid)
        {
            Logger.error("Tried pinning an NPC system that had no LID");
            return;
        }
        const currentPinned = NPCStore.get(actor.uuid).pinnedTraits || [];
        const newPinned = Array.from(new Set([...currentPinned, item.system.lid]));
        NPCStore.set(actor.uuid, { pinnedSystems: newPinned });
    }

    async function unpinItem(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, item: any)
    {
        event.stopPropagation();
        if (!item.system.lid)
        {
            Logger.error("Tried unpinning an NPC system that had no LID");
            return;
        }
        const currentPinned = NPCStore.get(actor.uuid).pinnedTraits || [];
        const newPinned = currentPinned.filter((lid: string) => lid !== item.system.lid);
        NPCStore.set(actor.uuid, { pinnedSystems: newPinned });
    }
</script>

{#snippet outerContent()}
    <div class="-widthfull -padding2-l">
        <div class="la-flexrow clipped-bot-alt la-text-header la-bckg-header-anti -widthfull">
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
        iconStyle={[getIconStyle(component), "cci cci-system -fontsize7"]}
        iconBackgroundStyle={["-fontsize7 la-prmy-secondary", qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"]}

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
    <!-- Pin -->
    <GlyphButton
        style={[H2_BUTTON_ICON_STYLE, "la-flexcol -padding0-lr"]}
        flowClass={FlowClass.None}
        path={`itemTypes.npc_feature.${component.index}`}

        tooltipEnabled={tooltipEnabled}
        tooltipDirection={TooltipDirection.UP}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltip={getLocalized(pinned ? "LA.pin.unpinned.tooltip" : "LA.pin.pinned.tooltip")}

        onClick={(event) => {pinned ? unpinItem(event, component) : pinItem(event, component)}}
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
        path={`itemTypes.npc_feature.${component.index}`}

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
        flowClass={FlowClass.SendEffectToChat}
        type={"system"}
        index={component.index}
        uuid={component.uuid}

        tooltipEnabled={tooltipEnabled}
        tooltipDirection={TooltipDirection.UP}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltip={getLocalized("LA.chat.tooltip")}

        onPointerEnter={() => {messageButtonHover = true;} }
        onPointerLeave={() => {messageButtonHover = false;} }
    >
        <i class="mdi mdi-message"></i>
    </GlyphButton>
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
        if (pinButtonHover)
            return `--${getLocalized(pinned ? "LA.pin.unpinned.extension" : "LA.pin.pinned.extension")}`;
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
    <div class="la-flexrow -gap0 -widthfull">
        <EffectBox
            name={getLocalized("LA.npc.attackBonus.label")}
            outerStyle={[hasAccuracyBonus(component) ? "-bordersround" : "-bordersround-ltb"]}

            tooltipEnabled={tooltipEnabled}
        >
            <span class="la-flexrow -justifycenter -aligncenter -fontsize5 -height3">
                {component.system.attack_bonus[tier - 1]}
                <i class="cci cci-reticule -fontsize4"></i>
            </span>
        </EffectBox>
        <EffectBox
            name={getLocalized("LA.npc.accuracy.label")}

            tooltipEnabled={tooltipEnabled}
        >
            <span class="la-flexrow -justifycenter -aligncenter -fontsize5 -height3">
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