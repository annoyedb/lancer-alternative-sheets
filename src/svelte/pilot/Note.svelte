<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { getThemeHistoryLabel } from "@/scripts/theme";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import GlyphButton from "@/svelte/actor/button/GlyphButton.svelte";
    import { getSheetStore } from "@/scripts/store/module-store";

    const {
        actor,
        system,
    } = $props();
    let editButtonHover = $state(false);

    const collID = `${actor.uuid}.notes`;
    const tooltipEnabled = getPilotSheetTooltipEnabled();
</script>

{#snippet headerOptions()}
<GlyphButton
    style={["fas fa-edit", "-fontsize2", "-height2", "-lineheight2", "la-prmy-header -glow-prmy la-scdy-primary -glow-scdy-hover"]}

    flowClass={FlowClass.EditText}
    path="system.notes"

    tooltipEnabled={tooltipEnabled}
    tooltip={getLocalized("LA.edit.tooltip")}
    logText={getLocalized("LA.edit.tooltip")}
    logType={TextLogHook.PilotHeader}
    logTypeReset={TextLogHook.PilotHeaderReset}

    onPointerEnter={() => {editButtonHover = true;}}
    onPointerLeave={() => {editButtonHover = false;}}
/>
{/snippet}

<HeaderMain
    text={getLocalized("LA.pilot.notes.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-weapon"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-weapon"]}
    extensionTextFunction={() => {
        if (editButtonHover)
            return `--${getLocalized("LA.edit.extension")}`;
        return undefined;
    }}
    
    collapseID={collID}
    startCollapsed={true}
    
    headerContent={headerOptions}
>
    <EffectBox
        name={getThemeHistoryLabel(getSheetStore(actor.uuid).currentTheme)}
        effect={ system.notes ? system.notes : getLocalized("LA.placeholder") }
    />
</HeaderMain>