<script lang="ts">
    import { Logger } from "@/classes/Logger";
    import { getLocalized, isLoading, isRecharge } from "@/scripts/helpers";
    import { getNPCSheetTooltipEnabled } from "@/scripts/npc/settings";
    import { NPCStore } from "@/scripts/store/module-store";
    import { getCSSDocumentTheme } from "@/scripts/theme";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";

    import HeaderSecondary, { H2_HEADER_STYLE } from "@/svelte/shared/header/HeaderSecondary.svelte";
    import LoadedBox from "@/svelte/shared/counter/LoadedBox.svelte";
    import LimitedBox from "@/svelte/shared/counter/LimitedBox.svelte";
    import EffectBox from "@/svelte/shared/EffectBox.svelte";
    import TagArray from "@/svelte/shared/TagArray.svelte";
    import EffectButton from "@/svelte/shared/button/EffectButton.svelte";
    import { H2_BUTTON_ICON_STYLE } from "@/svelte/shared/button/Button.svelte";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import ChargedBox from "@/svelte/npc/ChargedBox.svelte";

    type TraitItemProps = {
        actor: any;
        trait: any;
        pinned: boolean;
    }

    const {
        actor,
        trait,
        pinned,
    } : TraitItemProps = $props();
    
    const qualityMode = true; // TODO: change to a setting
    const tooltipEnabled = getNPCSheetTooltipEnabled();

    let effectButtonHover = $state(false);
    let editButtonHover = $state(false);
    let messageButtonHover = $state(false);
    let pinButtonHover = $state(false);

    function renderOuter(item: any)
    {
        return !isDestroyed(item) && (item.system.uses.max || isLoading(item) || isRecharge(item));
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

    function isDestroyed(item: any)
    {
        return item.system.destroyed;
    }

    async function pinItem(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, item: any)
    {
        event.stopPropagation();
        if (!item.system.lid)
        {
            Logger.error("Tried pinning an NPC trait that had no LID");
            return;
        }
        const currentPinned = NPCStore.get(actor.uuid).pinnedTraits || [];
        const newPinned = Array.from(new Set([...currentPinned, item.system.lid]));
        NPCStore.set(actor.uuid, { pinnedTraits: newPinned });
    }

    async function unpinItem(event: MouseEvent & { currentTarget: EventTarget & HTMLElement }, item: any)
    {
        event.stopPropagation();
        if (!item.system.lid)
        {
            Logger.error("Tried unpinning an NPC trait that had no LID");
            return;
        }
        const currentPinned = NPCStore.get(actor.uuid).pinnedTraits || [];
        const newPinned = currentPinned.filter((lid: string) => lid !== item.system.lid);
        NPCStore.set(actor.uuid, { pinnedTraits: newPinned });
    }
</script>

{#snippet outerContent()}
    <div class="-widthfull -padding2-l">
        <div class="la-flexrow clipped-bot-alt la-text-header la-bckg-header-anti -widthfull">
            <!-- Rechargeable -->
            <ChargedBox
                item={trait}
                path={`itemTypes.npc_feature.${trait.index}.system.charged`}
            />
            <!-- Loading -->
            <LoadedBox
                item={trait}
                path={`itemTypes.npc_feature.${trait.index}.system.loaded`}
            />
            <!-- Limited -->
            <LimitedBox
                usesValue={trait.system.uses.value}
                usesMax={trait.system.uses.max}
                path={`itemTypes.npc_feature.${trait.index}.system.uses`}
            />
        </div>
    </div>
{/snippet}
{#snippet headerSecondaryLeftOptions()}
    <EffectButton
        iconStyle={[getIconStyle(trait), "cci cci-trait -fontsize7"]}
        iconBackgroundStyle={["-fontsize7 la-prmy-secondary", qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"]}

        flowClass={FlowClass.SendEffectToChat}
        path={`itemTypes.npc_feature.${trait.index}`}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltipDirection={TooltipDirection.UP}
        tooltip={trait.system.effect || getLocalized("LA.mech.mod.effect.tooltip")}

        disabled={isDestroyed(trait)}

        onPointerEnter={() => {effectButtonHover = true;}}
        onPointerLeave={() => {effectButtonHover = false;}}
    />
{/snippet}
{#snippet headerSecondaryRightOptions()}
    <!-- Pin -->
    <GlyphButton
        style={[H2_BUTTON_ICON_STYLE, "la-flexcol -padding0-lr"]}
        flowClass={FlowClass.None}
        path={`itemTypes.npc_feature.${trait.index}`}

        tooltipEnabled={tooltipEnabled}
        tooltipDirection={TooltipDirection.UP}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltip={getLocalized(pinned ? "LA.pin.unpinned.tooltip" : "LA.pin.pinned.tooltip")}

        onClick={(event) => {pinned ? unpinItem(event, trait) : pinItem(event, trait)}}
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
        path={`itemTypes.npc_feature.${trait.index}`}

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
        type={"trait"}
        index={trait.index}
        uuid={trait.uuid}

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
    text={trait.name}
    headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
    textStyle={[getHeaderStyle(trait), "-fontsizemedium -overflowhidden"]}
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

    itemID={trait.system.lid}
    uuid={trait.uuid}
    path={`itemTypes.npc_feature.${trait.index}`}
    acceptTypes={"npc_feature"}
    
    collapseID={trait.uuid}
    startCollapsed={true}
    renderOutsideCollapse={renderOuter(trait) ? outerContent : undefined }

    contentLeft={headerSecondaryLeftOptions}
    contentRight={headerSecondaryRightOptions}
>
    <EffectBox
        name={getLocalized("LA.mech.system.effect.label")}

        tooltipEnabled={tooltipEnabled}
    >
        {@html trait.system.effect}
    </EffectBox>
    <EffectBox
        name={getLocalized("LA.effect.hit.label")}
        effect={trait.system.on_hit}

        tooltipEnabled={tooltipEnabled}
    />
    <TagArray
        tags={trait.system.tags}
        path={`itemTypes.npc_feature.${trait.index}.system.tags`}
        justify={"start"}
    />
</HeaderSecondary>