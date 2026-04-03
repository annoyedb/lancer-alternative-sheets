<script lang="ts">
    import type { EmptyBoxProps } from "@/interfaces/actor/EmptyBoxProps";

    const {
        label,
        subLabel,
        type,
        path,
    } : EmptyBoxProps = $props();

</script>

<details 
    class="la-empty -widthfull la-flexcol
        ref set drop-settable {type}"
    data-accept-types={type}
    data-path={path}>
    <summary class="la-empty__summary la-flexrow clipped-bot-alt la-bckg-repcap la-text-header -padding1 -pointercursor -widthfull">
        <div class="la-left la-flexrow">
            <i class="la-icon mdi mdi-card-off-outline -fontsize4 -margin1-lr"></i>
            <span class="la-name__span -fontsize4">{label}</span>
        </div>
    </summary>
    <div class="la-empty__wrapper -bordersround -bordersoff -textaligncenter -padding2">
        <span class="la-details__span la-text-repcap -fontsize6 -upper">[<span class="-fontsize4 -padding0-l -letterspacing0 -bold">{subLabel}</span>]</span>
    </div>
</details>