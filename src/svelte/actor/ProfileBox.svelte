<script lang="ts">
    import type { ProfileBoxProps } from "@/interfaces/actor/ProfileBoxProps";

    const {
        profiles,
        weapon,
        path,
    }: ProfileBoxProps = $props();
</script>

{#if profiles.length > 1}
<div class="la-limited la-combine-h la-text-header la-bckg-pilot clipped -flex1">
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