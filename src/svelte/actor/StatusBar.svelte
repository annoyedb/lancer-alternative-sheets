<script lang="ts">
    import type { StatusBarProps } from "@/interfaces/actor/StatusBarProps";


    const {
        currentValue,
        maxValue,
        currentValueAlt,
        maxValueAlt,
        name,
        dataName,
        styleClass,
        styleClassAlt,
        clipPath
    } : StatusBarProps = $props();

</script>

<div class="la-combine-h -fontsize1">
    {#if name}
    <span class="la-damage__span -fontsize0">{name}</span>
    {/if}
    <div class="la-bar-h la-bckg-bar-back -flex1 {clipPath}">
        <div class="la-bar-h-progress la-combine-h">
            <input class="la-bar-h-progress__input -flex1"
                type="number" 
                name="{dataName}"
                data-dtype="Number" 
                value="{currentValue}">
            <span class="la-bar-h-progress__span -flex0">/</span>
            <span class="la-bar-h-progress__span -flex1">{maxValue}</span>
        </div>
        <div class="la-bar-h-progress la-bar-h-current {styleClass?.join(" ")}"
            style="--percent:{currentValue / maxValue * 100}%"></div>
        {#if currentValueAlt && maxValueAlt}
        <div class="la-tempvalue la-bar-h-progress la-bar-h-current {styleClassAlt?.join(" ")}"
            style="--percent:{currentValueAlt / maxValueAlt * 100}%"></div>
        {/if}
    </div>
</div>