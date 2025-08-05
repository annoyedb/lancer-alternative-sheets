<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { getCSSDocumentTheme, getThemeHistoryLabel } from "@/scripts/theme";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import GlyphButton from "@/svelte/actor/button/GlyphButton.svelte";

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
    tooltipTheme={getCSSDocumentTheme(actor.uuid)}
    tooltip={getLocalized("LA.edit.tooltip")}
    tooltipDirection={TooltipDirection.UP}
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
        name={getThemeHistoryLabel(getCSSDocumentTheme(actor.uuid))}
        effect={ system.notes ? system.notes : getLocalized("LA.placeholder") }
    />
</HeaderMain>