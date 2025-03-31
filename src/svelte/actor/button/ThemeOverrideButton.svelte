<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { getAdvancedState } from "@/scripts/store/advanced";
    import { getLocalized } from "@/scripts/helpers";
    import { getMechSheetTipEnabled, setThemeOverride } from "@/scripts/mech/settings";
    import { getThemeName } from "@/scripts/theme";
    import { ThemeKey } from "@/enums/ThemeKey";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ThemeOverrideButtonProps } from "@/interfaces/actor/button/ThemeOverrideButtonProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";

    const {
        uuid,
        style,
        
        logText,
        logType,
        logTypeReset,
    }: ThemeOverrideButtonProps & TextLogEventProps = $props();

    let advancedOptions = $derived(getAdvancedState(uuid));
    let toggle = $state(false);
    let optionElement: HTMLElement | null = null;

    const tipEnabled = getMechSheetTipEnabled();
    const tip = TooltipFactory.buildTooltip(getLocalized("LA.advanced.themeOverride.tooltip"))
    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.advanced.themeOverride.tooltip");
    
    function handleOnClick(event: MouseEvent & { currentTarget: EventTarget & HTMLElement })
    {
        event.stopPropagation();
        if (toggle)
        {
            TooltipFactory.unrenderTooltip(optionElement);
            optionElement = null;
        }
        else
        {
            optionElement = TooltipFactory.renderTooltipSvelte(
                event,
                {
                    content: themeOverride,
                    unrenderCallback: () => { toggle = false; },
                },
                {
                    direction: TooltipDirection.DOWN,
                    cssClass: "la-tooltip -widthfull",
                    locked: true,
                }
            );
        }

        toggle = !toggle;
    }

    function handleThemeOverride(event: MouseEvent, theme: string)
    {
        event.stopPropagation();
        const selectedTheme = theme === "default" ? "" : theme;
        
        setThemeOverride(uuid, selectedTheme);
    }
</script>

{#snippet themeOverride()}
    <h3>{getLocalized("LA.advanced.themeOverride.tooltip")}<i class="mdi mdi-arrow-down-right"></i></h3>
    <div class="la-combine-v -widthfull -gap0 -padding0">
    {#each Object.values(ThemeKey) as theme}
        <button type="button"
            class="lancer-bckg-secondary la-text-header"
            onclick={event => handleThemeOverride(event, theme)}
        >
            {getThemeName(theme)}
        </button>
    {/each}
        <button type="button"
            class="lancer-bckg-secondary la-text-header"
            onclick={event => handleThemeOverride(event, "default")}
        >
            {getLocalized("LA.advanced.theme.default.label")}
        </button>
    </div>
{/snippet}

{#if advancedOptions}
<button type="button"
    class="{style?.join(' ')} -glow-active-hover"
    data-tooltip={tipEnabled ? tip : undefined }
    data-tooltip-class={"clipped-bot la-tooltip"}
    data-tooltip-direction={TooltipDirection.UP}
    onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
    onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
    onclick={event => handleOnClick(event)}
    aria-label={getLocalized("LA.advanced.themeOverride.tooltip")}
>
    <i class="mdi mdi-notebook-edit la-text-header -fontsize3"></i>
</button>
{/if}