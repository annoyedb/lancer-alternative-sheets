<script lang="ts">
    import { getBrightness } from "@/scripts/theme";
    import type { ActiveEffectsProps } from "@/interfaces/actor/ActiveEffectsProps";
    import HeaderMain from "@/svelte/actor/HeaderMain.svelte";
    import { getLocalized } from "@/scripts/helpers";

    const {
        effects,
        actor,
        collapse,
        isOwner,
    }: ActiveEffectsProps = $props();

    function getThemedIcon(effect: any)
    {
        let theme = getBrightness();
        return effect.icon
            ? (theme === "dark" ? effect.icon : effect.icon.replace('/white/', '/'))
            : (theme === "dark" ? "systems/lancer/assets/icons/white/difficulty.svg" : "systems/lancer/assets/icons/difficulty.svg");
    }

    function deleteActiveEffect(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement })
    {
        event.stopPropagation();
        if (!isOwner)
        {
            console.error("Lancer Alternative Sheets: User is not the owner of this actor.");
            return;
        }

        let id = event.currentTarget.getAttribute('data-uuid');
        try
        {
            actor.deleteEmbeddedDocuments("ActiveEffect", [id], { diff: true, render: true, type: 'ActiveEffect' });
        } 
        catch (error)
        {
            console.error("Lancer Alternative Sheets: Error deleting active effect.", error);
        }
    }
</script>

<!-- TODO: effect.name needs a localization map -->
<!-- TODO: effect.description needs a localization map-->
<div class="la-combine-v -gap1 -widthfull">
{#if effects.length}
{#each effects as effect}
    <HeaderMain
        title={effect.name}
        headerStyle={["la-bckg-warning", "clipped-bot-alt", "-padding0-tb", "-padding3-lr"]}
        headerFontStyle={["la-text-header-anti", "-fontsize1", "-lineheight2"]}
        cursorStyle={["la-anim-header-anti"]}
        borderStyle={["la-bckg-card", "la-brdr-warning", "-overflowhidden", "-padding1-lr"]}
        extensionText={`--${getLocalized("LA.info.label")}`}
        
        collapse={collapse}
        collapseID={`${actor.uuid}_status_activeeffects_effect`}
        startCollapsed={true}

        deleteOption={true}
        deleteStyle={["-glow-primary-hover", "-fontsize2", "-height2", "-lineheight2"]}
        deleteIconStyle={["-fontsize2", "la-text-header-anti"]}
        deleteUUID={effect._id}
        deleteOnClick={deleteActiveEffect}
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