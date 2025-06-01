<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { getLocalized } from "@/scripts/helpers";
    import { getThemeName } from "@/scripts/theme";
    import { ThemeKey } from "@/enums/ThemeKey";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { ThemeOverrideButtonProps } from "@/interfaces/actor/button/ThemeOverrideButtonProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { IconButtonProps } from "@/interfaces/actor/button/IconButtonProps";
    import type { TooltipProps } from "@/interfaces/actor/TooltipProps";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";

    const {
        uuid,
        disabled,
        setOverride,
        style,
        iconStyle,

        tooltipEnabled,
        tooltip,
        tooltipHeader,
        tooltipClass,
        tooltipDirection,
        
        logText,
        logType,
        logTypeReset,
    }: ThemeOverrideButtonProps & IconButtonProps & TooltipProps & TextLogEventProps = $props();

    let toggle = $state(false);
    let optionElement: HTMLElement | null = null;

    const tip = TooltipFactory.buildTooltip(tooltip || getLocalized("LA.advanced.themeOverride.tooltip"), tooltipHeader);
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
        
        setOverride(uuid, selectedTheme);
    }
</script>

{#snippet themeOverride()}
    <h3>{getLocalized("LA.advanced.themeOverride.tooltip")}<i class="mdi mdi-arrow-down-right"></i></h3>
    <div class="la-combine-v -widthfull -gap0 -padding0">
    {#each Object.values(ThemeKey) as theme}
        <button type="button"
            class="la-bckg-secondary la-text-header"
            onclick={event => handleThemeOverride(event, theme)}
        >
            {getThemeName(theme)}
        </button>
    {/each}
        <button type="button"
            class="la-bckg-secondary la-text-header"
            onclick={event => handleThemeOverride(event, "default")}
        >
            {getLocalized("LA.advanced.theme.default.label")}
        </button>
    </div>
{/snippet}

{#if !disabled}
<button type="button"
    class="{style?.join(' ')} la-prmy-primary -glow-prmy-hover"
    data-tooltip={tooltipEnabled ? tip : undefined }
    data-tooltip-class={tooltipClass || "clipped-bot la-tooltip"}
    data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
    onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
    onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
    onclick={event => handleOnClick(event)}
    aria-label={getLocalized("LA.advanced.themeOverride.tooltip")}
>
    <i class="mdi mdi-notebook-edit {iconStyle?.join(' ') || 'la-text-header -fontsize3'}"></i>
</button>
{/if}