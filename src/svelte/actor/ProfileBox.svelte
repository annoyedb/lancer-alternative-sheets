<script lang="ts">
    import type { ProfileBoxProps } from "@/interfaces/actor/ProfileBoxProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";

    const {
        profiles,
        weapon,
        path,
        style,
        
        logText,
        logType,
        logTypeReset,
    }: ProfileBoxProps & TextLogEventProps = $props();

    const logging = logType && logTypeReset;
    const log = logText || getLocalized("LA.profile.tooltip");
</script>
<script lang="ts" module>
    const _STYLE = " la-text-header la-bckg-pilot clipped -flex1 ";
</script>

{#if profiles.length > 1}
<div class="la-limited la-combine-h {style?.join(' ') || _STYLE}">
{#each profiles as profile, index}
    <button type="button" 
        class="-glow-primary-hover -height5
            gen-control {index === weapon.system.selected_profile_index ? "-glow-header la-bckg-secondary selected-profile -pointerdisable" : ""}"
        data-action="set" 
        data-action-value="(int){index}"
        data-path={path}
        onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
        onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
        aria-label={getLocalized("LA.use.label")}
    >
        <span class="-padding1-lr -fontsize1 -upper {index === weapon.system.selected_profile_index ? "-glow-header -bold" : ""}">{profile.name}</span>
    </button>
{/each}
</div>
{/if}