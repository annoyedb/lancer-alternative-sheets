<script lang="ts">
    import type { TotalSPProps } from "@/interfaces/actor/decoration/TotalSPProps";

    const {
        value,
        max,
        style,
        textStyle,
        iconStyle,
    }: TotalSPProps = $props();
</script>
<script lang="ts" module>
    export const MAIN_HEADER_STYLE = "la-text-header -fontsize2 -lineheight3"
    export const MAIN_HEADER_ICON_STYLE = "la-text-header -fontsize5 -lineheight3 -width3"
</script>

<div class="la-combine-h -height2 {style?.join(' ') || MAIN_HEADER_STYLE}">
    <div class="{textStyle?.join(' ') || "-fontsize2"}">
        {value} / {max}
    </div>
    <i class="cci cci-system-point {iconStyle?.join(' ') || MAIN_HEADER_ICON_STYLE}"></i>
</div>