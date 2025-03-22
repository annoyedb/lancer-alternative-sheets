<script lang="ts">
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { ThemeKey } from "@/enums/ThemeKey";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { advancedStates } from "@/scripts/advanced";
    import { getLocalized } from "@/scripts/helpers";
    import { setThemeOverride } from "@/scripts/settings/mech-sheet";
    import { getThemeName } from "@/scripts/theme";

    const {
        uuid,
        style,
    }: {uuid: string, style: Array<string>} = $props();

    let advancedOptions = $derived($advancedStates[uuid]?.enabled || false);// This is initialized in the Header's onMount function
    let toggle = $state(false);
    let optionElement: HTMLElement | null = null;
    
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
                    direction: TooltipDirection.LEFT,
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
    data-tooltip={TooltipFactory.buildTooltip(getLocalized("LA.advanced.themeOverride.tooltip"))}
    data-tooltip-class={"clipped-bot la-tooltip"}
    data-tooltip-direction={TooltipDirection.LEFT}
    aria-label="TEMP"
    onclick={event => handleOnClick(event)}
>
    <i class="mdi mdi-notebook-edit la-text-header -fontsize4"></i>
</button>
{/if}