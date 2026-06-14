<script lang="ts">
    import type { TagArrayProps } from "@/interfaces/actor/TagArrayProps";
    import {TooltipDirection} from "@/enums/TooltipDirection";
    import {TooltipFactory} from "@/classes/TooltipFactory";
    import type {TooltipProps} from "@/interfaces/actor/TooltipProps";

    const {
        tags,
        justify,

        tooltipEnabled,
        tooltipClass,
        tooltipTheme,
        tooltipDirection,
    }: TagArrayProps & TooltipProps = $props();

    function getTooltip(tag: any)
    {
        return TooltipFactory.buildTooltip(getTagDescription(tag), getTagName(tag));
    }

    function getTagDescription(tag: any)
    {
        return tag.description.replace("{VAL}", tag.val ?? "?") ?? "";
    }

    function getTagName(tag: any)
    {
        return tag.name.replace("{VAL}", tag.val ?? "?");
    }
</script>

{#snippet renderTags(tag: any)}
    <div
        class="la-flexrow la-bckg-primary la-text-header -bordersround -small -bordersoff -padding0-l -padding1-r -aligncenter -gap0"
        data-tooltip={tooltipEnabled ? getTooltip(tag) : ""}
        data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${tooltipTheme}`}
        data-tooltip-direction={tooltipDirection || TooltipDirection.DOWN}
    >
        <i class="mdi mdi-label -fontsize2"></i>
        <span class="-fontsizesmall">{getTagName(tag)}</span>
    </div>
{/snippet}

{#if tags.length > 0}
<div class="la-flexrow -wrapwrap -widthfull -gap0
        -justify{justify || "center"}"
>
{#each tags as tag}
    {#if !tag.hidden}
        {@render renderTags(tag)}
    {/if}
{/each}
</div>
{/if}