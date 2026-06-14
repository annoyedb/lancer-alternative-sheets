<script lang="ts">
    import type { ProfileBoxProps } from "@/interfaces/actor/ProfileBoxProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { getLocalized } from "@/scripts/helpers";
    import { resetLog, sendToLog } from "@/scripts/store/text-log";
    import { getExtraEffectsEnabled } from "@/scripts/settings";

    const {
        profiles,
        weapon,
        path,
        style,
        
        logText,
        logType,
        logTypeReset,
    }: ProfileBoxProps & TextLogEventProps = $props();

    const qualityMode = getExtraEffectsEnabled();
    const logging = $derived(logType && logTypeReset);
    const log = $derived(logText || getLocalized("LA.profile.tooltip"));
</script>
<script lang="ts" module>
    const _STYLE = " la-text-header la-bckg-pilot clipped -flex1 ";
</script>

{#if profiles.length > 1}
<div class="la-limited la-flexrow {style?.join(' ') || _STYLE}">
{#each profiles as profile, index}
    <button type="button" 
        class="la-prmy-primary -height7
            {qualityMode ? '-glow-prmy-hover -pulse-glow-prmy' : ''}
            gen-control {index === weapon.system.selected_profile_index ? 'la-prmy-header la-bckg-secondary selected-profile -pointerdisable' : ''}"
        data-action="set" 
        data-action-value="(int){index}"
        data-path={path}
        onpointerenter={ logging ? event => sendToLog(event, log, logType!) : undefined }
        onpointerleave={ logging ? event => resetLog(event, logTypeReset!) : undefined }
        aria-label={getLocalized("LA.use.label")}
    >
        <span class="-padding1-lr -fontsizemedium -upper
            {qualityMode ? '-pulse-glow-prmy' : ''}
            {index === weapon.system.selected_profile_index ? 'la-prmy-header -bold' : ''}"
        >{profile.name}</span>
    </button>
{/each}
</div>
{/if}