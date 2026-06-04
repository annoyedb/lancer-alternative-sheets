<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { getCSSDocumentTheme, getThemeHistoryLabel } from "@/scripts/theme";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import EffectBox from "@/svelte/shared/EffectBox.svelte";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import {getExtraEffectsEnabled} from "@/scripts/settings";

    const {
        actor,
        system,
    } = $props();
    let editButtonHover = $state(false);

    const tooltipEnabled = getPilotSheetTooltipEnabled();
    const qualityMode = getExtraEffectsEnabled();
    const collID = $derived(`${actor.uuid}.notes`);
    const theme = $derived(getCSSDocumentTheme(actor.uuid));
</script>

{#snippet headerOptions()}
<GlyphButton
    style={["fas fa-edit -fontsize4 -height4 -lineheight4 la-prmy-header la-scdy-primary",
        qualityMode ? " -glow-prmy -glow-scdy-hover" : ""]}

    flowClass={FlowClass.EditText}
    path="system.notes"

    tooltipEnabled={tooltipEnabled}
    tooltipTheme={theme}
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
    textStyle={["la-text-header -fontsize4 -overflowhidden"]}
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
        name={getThemeHistoryLabel(theme)}
        effect={ system.notes ? system.notes : getLocalized("LA.placeholder") }
    />
</HeaderMain>