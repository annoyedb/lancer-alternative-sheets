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
    class="la-empty -widthfull la-combine-v
        ref set drop-settable {type}"
    data-accept-types={type}
    data-path={path}>
    <summary class="la-empty__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1 -pointercursor -widthfull">
        <div class="la-left la-combine-h">
            <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
            <span class="la-name__span -fontsize2">{label}</span>
        </div>
    </summary>
    <div class="la-empty__wrapper -bordersround -bordersoff -textaligncenter -padding2">
        <span class="la-details__span la-text-repcap -fontsize4 -upper">[<span class="-fontsize2 -padding0-l -letterspacing0 -bold">{subLabel}</span>]</span>
    </div>
</details>