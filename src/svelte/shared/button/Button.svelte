<script lang="ts" module>
    import { getExtraEffectsEnabled } from "@/scripts/settings";

    const qualityMode = getExtraEffectsEnabled();

    export const CLICKABLE_HOVER = " la-scdy-header " + (qualityMode ? "-glow-scdy-hover " : " ");
    export const H2_BUTTON_ICON_STYLE = " la-prmy-header -fontsize4 la-scdy-primary " + (qualityMode ? "-glow-prmy -glow-scdy-hover " : " ");
</script>