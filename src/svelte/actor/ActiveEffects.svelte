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

    let theme = getBrightness();

    function getThemedIcon(effect: any)
    {
        return effect.icon
            ? (theme === "dark" ? effect.icon : effect.icon.replace('/white/', '/'))
            : (theme === "dark" ? "systems/lancer/assets/icons/white/difficulty.svg" : "systems/lancer/assets/icons/difficulty.svg");
    }

    function deleteActiveEffect(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement })
    {
        event.stopPropagation();
        console.log("pressed delete");
        if (!isOwner)
        {
            console.error("Lancer Alternative Sheets: User is not the owner of this actor.");
            return;
        }

        let id = event.currentTarget.getAttribute('data-uuid');
        console.log(id, isOwner);
        try
        {
            actor.deleteEmbeddedDocuments("ActiveEffect", [id], { diff: true, render: true, type: 'ActiveEffect' });
        } 
        catch (error)
        {
            console.error("Lancer Alternative Sheets: Error deleting active effect, known issue --just aesthetic.");
        }
    }
</script>

<!-- TODO: effect.name needs a localization map -->
<!-- TODO: effect.description needs a localization map-->
<div class="la-combine-v -gap0">
{#if effects.length > 0}
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
        deleteIconStyle={["-fontsize2"]}
        deleteUUID={effect._id}
        deleteOnClick={deleteActiveEffect}
    >
        <span class="la-activeeffect">
            <img 
                class="la-activeeffect__img la-dropshadow" 
                src="{encodeURI(getThemedIcon(effect))}" 
                alt="Effect Icon"
            >
            <span class="la-active-effect__span -fontsize1">{effect.description}</span>
        </span>
    </HeaderMain>
{/each}
{/if}
</div>