<script lang="ts">
    import { Logger } from "@/classes/Logger";
    import { getBrightness } from "@/scripts/theme";
    import { getLocalized } from "@/scripts/helpers";
    import { getSheetStore } from "@/scripts/store/store";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import type { ActiveEffectsProps } from "@/interfaces/actor/ActiveEffectsProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { FlowClass } from "@/enums/FlowClass";
    import DeleteButton from "@/svelte/actor/button/DeleteButton.svelte";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";

    const {
        effects,
        actor,
        isOwner,

        tooltipEnabled,
        logType,
        logTypeReset,
    }: ActiveEffectsProps & TooltipProps & TextLogEventProps = $props();
    const themeOverride = getSheetStore(actor.uuid).currentTheme;

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
        if (!isOwner)
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

<!-- TODO: effect.name needs a localization map -->
<!-- TODO: effect.description needs a localization map-->
<div class="la-combine-v -gap0 -widthfull">
{#if effects.length}
{#each effects as effect, index}
    {#snippet headerOptions()}
    <DeleteButton
        style={["-glow-primary-hover", "-fontsize2", "-height2", "-lineheight2"]}
        iconStyle={["-fontsize2", "la-text-header-anti"]}

        uuid={effect._id}
        flowClass={FlowClass.DeleteActiveEffect}
        onClick={deleteActiveEffect}

        tooltipEnabled={tooltipEnabled}
        logType={logType}
        logTypeReset={logTypeReset}
    />
    {/snippet}
    <HeaderMain 
        text={effect.name}
        headerStyle={[MAIN_HEADER_STYLE, "la-bckg-warning", "clipped-bot-alt"]}
        textStyle={["la-text-header-anti", "la-anim-header-anti", "-fontsize1", "-lineheight2"]}
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
<details class="la-details -widthfull la-combine-v">
    <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1-l -widthfull">
        <div class="la-left la-combine-h">
            <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
            <span class="la-name__span -fontsize2">{getLocalized("LA.tab.status.effects.none.label")}</span>
        </div>
    </summary>
    <div class="la-details__wrapper -bordersround -bordersoff">
        <div class="la-warn__span la-details__span la-text-repcap -padding3 -fontsize3 -textaligncenter -widthfull">{getLocalized("LA.tab.status.effects.none.subLabel")}</div>
    </div>
</details>
{/if}
</div>