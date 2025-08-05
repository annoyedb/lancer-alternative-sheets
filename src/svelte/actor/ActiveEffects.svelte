<script lang="ts">
    import { Logger } from "@/classes/Logger";
    import { getBrightness, getCSSDocumentTheme } from "@/scripts/theme";
    import { getThemeKey } from "@/scripts/store/theme";
    import { getLocalized } from "@/scripts/helpers";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import type { ActiveEffectsProps } from "@/interfaces/actor/ActiveEffectsProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { FlowClass } from "@/enums/FlowClass";
    import DeleteButton from "@/svelte/actor/button/DeleteButton.svelte";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import EmptyBox from "@/svelte/actor/EmptyBox.svelte";

    const {
        effects,
        actor,
        owner,

        tooltipEnabled,
        logType,
        logTypeReset,
    }: ActiveEffectsProps & TooltipProps & TextLogEventProps = $props();
    const themeOverride = getThemeKey(actor.uuid);

    function getThemedIcon(effect: any)
    {
        let theme = getBrightness(themeOverride);
        return effect.icon
            ? (theme === "dark" ? effect.icon : effect.icon.replace('/white/', '/'))
            : (theme === "dark" ? "systems/lancer/assets/icons/white/difficulty.svg" : "systems/lancer/assets/icons/difficulty.svg");
    }

    function deleteActiveEffect(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement })
    {
        event.stopPropagation();
        if (!owner)
        {
            Logger.error("User is not the owner of this actor.");
            return;
        }

        let id = event.currentTarget.getAttribute('data-uuid');
        try
        {
            actor.deleteEmbeddedDocuments("ActiveEffect", [id], { diff: true, render: true, type: 'ActiveEffect' });
        } 
        catch (error)
        {
            Logger.error("Error deleting active effect.", error);
        }
    }
</script>

<div class="la-combine-v -gap0 -widthfull">
{#if effects.length}
{#each effects as effect, index}
    {#snippet headerOptions()}
    <DeleteButton
        style={["la-prmy-primary -glow-prmy-hover", "-fontsize2", "-height2", "-lineheight2"]}
        iconStyle={["-fontsize2", "la-text-header-anti"]}

        uuid={effect._id}
        flowClass={FlowClass.DeleteActiveEffect}
        onClick={deleteActiveEffect}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        logType={logType}
        logTypeReset={logTypeReset}
    />
    {/snippet}
    <HeaderMain 
        text={effect.name}
        headerStyle={[MAIN_HEADER_STYLE, "la-bckg-warning", "clipped-bot-alt"]}
        textStyle={["la-text-header-anti", "la-prmy-header-anti", "-fontsize1", "-lineheight2"]}
        borderStyle={["la-bckg-card", "la-brdr-warning", "-overflowhidden", "-padding1-lr"]}
        extensionText={`--${getLocalized("LA.info.label")}`}
        
        collapseID={`${actor.uuid}.status.activeEffects.${index}`}
        startCollapsed={true}

        headerContent={headerOptions}
    >
        <span class="la-activeeffect">
            <img 
                class="la-activeeffect__img la-dropshadow -float-l -height10"
                src="{encodeURI(getThemedIcon(effect))}" 
                alt="Effect Icon"
            >
            <span class="la-active-effect__span -fontsize1">{@html effect.description}</span>
        </span>
    </HeaderMain>
{/each}
{:else}
    <EmptyBox
        label={getLocalized("LA.tab.status.effects.none.label")}
        subLabel={getLocalized("LA.tab.status.effects.none.subLabel")}
    />
{/if}
</div>