<!--
TODO: completely divorce from the default tag system
-->
<script lang="ts">
    import type { TagArrayProps } from "@/interfaces/actor/TagArrayProps";
    import {compactTag} from "@/scripts/lancer/helpers/tags";

    const {
        tags,
        path,
        justify,
    }: TagArrayProps = $props();

    function getCompactTag(tag: any)
    {
        return compactTag(path, tag)
    }
</script>

{#if tags.length > 0}
<div class="la-combine-h -wrapwrap -widthfull -justify{justify || "center"}">
{#each tags as tag}
    {#if !tag.hidden}
        {@html getCompactTag(tag)}
    {/if}
{/each}
</div>
{/if}