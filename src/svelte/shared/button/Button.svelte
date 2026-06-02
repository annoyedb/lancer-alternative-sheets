<script lang="ts" module>
    import { getExtraEffectsEnabled } from "@/scripts/settings";

    const qualityMode = getExtraEffectsEnabled();

    export const CLICKABLE_HOVER = `la-scdy-primary ${ qualityMode ? "-glow-scdy-hover la-prmy-header -glow-prmy" : "" }`;
    export const H2_BUTTON_ICON_STYLE = `la-prmy-header -fontsize4 ${ qualityMode ? "-glow-prmy la-scdy-primary -glow-scdy-hover" : "" }`;
</script>