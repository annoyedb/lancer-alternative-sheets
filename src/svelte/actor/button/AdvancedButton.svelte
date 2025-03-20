<script lang="ts">
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { advancedStates, handleAdvancedToggle, initializeAdvancedStates } from "@/scripts/advanced";
    import { onMount } from "svelte";
    import { getLocalized } from "@/scripts/helpers";

    const {
        key,
    }: any = $props();

    let advancedOptions = $derived($advancedStates[key]?.enabled || false);

    const tip = TooltipFactory.buildTooltip(getLocalized("LA.advanced.tooltip"));

    onMount(() =>
    {
        if (key)
        {
            initializeAdvancedStates(key);
        }
    });

    function toggleAdvancedOptions(event: MouseEvent & { currentTarget: EventTarget & HTMLElement })
    {
        if (key)
        {
            handleAdvancedToggle(event, key);   
        }
    }
</script>

{#if key}
<!-- (#2) -->
<!-- svelte-ignore event_directive_deprecated -->
<button type="button"
    class=""
    aria-label={getLocalized("LA.advanced.tooltip")}
    on:click={(event) => toggleAdvancedOptions(event)}
    data-tooltip={tip}
    data-tooltip-class={"clipped-bot la-tooltip"}
    data-tooltip-direction={TooltipDirection.LEFT}
>
    <i class="mdi -fontsize5 la-text-header
        {advancedOptions ? "mdi-toggle-switch" : "mdi-toggle-switch-off"}"
    ></i>
</button>
{/if}