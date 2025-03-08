<script lang="ts">
    import type { MountNamesProps } from "@/interfaces/actor/decoration/MountNamesProps";

    const {
        mountNames,
        style,
        textStyle,
    }: MountNamesProps = $props();
</script>

{#if mountNames.length}
<div class="la-combine-v la-text-header -gap0 -aligncenter -fontsize0 -height3 -lineheight0 {style?.join(' ')}">
{#each mountNames as mountName}
    <span class="-widthfull -textalignright {textStyle?.join(' ')}">{mountName}</span>
{/each}
</div>
{/if}