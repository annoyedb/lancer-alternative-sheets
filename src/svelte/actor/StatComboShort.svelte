<script lang="ts">
    import type { StatisticProps } from "@/interfaces/actor/StatisticProps";

    const {
        icon,
        label,
        value,
        style
    }: StatisticProps = $props()
</script>

<div class="la-shortstat la-combine-h">
    <!-- the mdi shield is a bit larger than the cci icons -->
    <i class="{icon}"></i>
    <div class="la-combine-v {style?.join(' ')}">
        <span class="-widthfull">{value}</span>
        <span class="">{label}</span>
    </div>
</div>