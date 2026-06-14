<script lang="ts" module>
    import { getExtraEffectsEnabled } from "@/scripts/settings";

    export const CLICKABLE_HOVER = () => " la-scdy-header " + (getExtraEffectsEnabled() ? "-glow-scdy-hover " : " ");
    export const H2_BUTTON_ICON_STYLE = () => " la-prmy-header -fontsize4 la-scdy-primary " + (getExtraEffectsEnabled() ? "-glow-prmy -glow-scdy-hover " : " ");
</script>