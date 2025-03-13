<script lang="ts">
    import type { ProfileBoxProps } from "@/interfaces/actor/ProfileBoxProps";

    const {
        profiles,
        weapon,
        path,
        style
    }: ProfileBoxProps = $props();

    const defaultStyle = " la-text-header la-bckg-pilot clipped -flex1 ";
</script>

{#if profiles.length > 1}
<div class="la-limited la-combine-h {style?.join(' ') || defaultStyle}">
{#each profiles as profile, index}
    <button type="button" 
        class="-glow-primary-hover -height5
            gen-control {index === weapon.system.selected_profile_index ? "-glow-header la-bckg-secondary selected-profile -pointerdisable" : ""}"
        data-action="set" data-action-value="(int){index}"
        data-path={path}>
        <span class="-padding1-lr -fontsize1 {index === weapon.system.selected_profile_index ? "-glow-header -bold" : ""}">{profile.name.toUpperCase()}</span>
    </button>
{/each}
</div>
{/if}