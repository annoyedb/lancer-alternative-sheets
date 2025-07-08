<script lang="ts">
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { PilotSheetProps } from "@/interfaces/pilot/PilotSheetProps";
    import { getAdvancedState } from "@/scripts/store/advanced";
    import { getLocalized } from "@/scripts/helpers";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { SETTINGS_BUTTON_STYLE, SETTINGS_HEADER_STYLE } from "@/svelte/pilot/settings/AdvancedSettings.svelte";
    import GlyphButton from "@/svelte/actor/button/GlyphButton.svelte";
    import { getDocumentTheme } from "@/scripts/theme";
    
    const props: PilotSheetProps = $props();
    const {
        actor,
        document,
        system,
    } = props;

    let advancedOptions = $derived(getAdvancedState(actor.uuid));

    const tooltipEnabled = getPilotSheetTooltipEnabled();

    function levelUp(event : MouseEvent)
    {
        event.stopPropagation();
        document.update({
            "system.hull": system.hull + 1, 
        })
    }

    function levelDown(event : MouseEvent)
    {
        event.stopPropagation();
        document.update({
            "system.hull": Math.max(system.hull - 1, 0), 
        })
    }
</script>

<div class="-heightfull
    {advancedOptions ? "la-combine-h" : "-displaynone"}"
>
    <span class="{SETTINGS_HEADER_STYLE} -alignend -capitalize">
        {getLocalized("LA.hull.label")}
    </span>
    <div class="la-combine-v -alignstart -padding1-b -heightfull">
        <GlyphButton
            style={[SETTINGS_BUTTON_STYLE, "mdi mdi-plus-box", "-verticalaligntop"]}
            
            flowClass={FlowClass.None}
            
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getDocumentTheme(actor.uuid)}
            tooltip={getLocalized("LA.pilot.hull.up.tooltip")}
            tooltipDirection={TooltipDirection.RIGHT}
            logText={getLocalized("LA.pilot.hull.up.tooltip")}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onClick={levelUp}
        />
        <GlyphButton
            style={[SETTINGS_BUTTON_STYLE, "mdi mdi-minus-box", "-verticalaligntop"]}
            
            flowClass={FlowClass.None}
            
            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getDocumentTheme(actor.uuid)}
            tooltip={getLocalized("LA.pilot.hull.down.tooltip")}
            tooltipDirection={TooltipDirection.RIGHT}
            logText={getLocalized("LA.pilot.hull.down.tooltip")}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onClick={levelDown}
        />
    </div>
</div>