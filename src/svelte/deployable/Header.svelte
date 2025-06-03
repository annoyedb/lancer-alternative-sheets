<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import type { DeployableSheetProps } from "@/interfaces/deployable/DeployableSheetProps";
    import Stats from "@/svelte/deployable/Stats.svelte";

    const props = $props();
    const {
        actor,
        system,
    }: DeployableSheetProps = props;
</script>

<div class="la-combine-v -widthfull -heightfull">
    <!-- Name & Templates -->
    <div class="la-bg-scroll-alt la-bckg-primary -widthfull -height10">
        <div class="la-combine-v -widthfull -heightfull -padding1-lr">
            <input type="text" 
                class="la-actorname__input la-text-header -upper -fontsize4 -textaligncenter -heightfull"
                name="name" 
                value="{actor.name}" 
                placeholder="{getLocalized("LA.placeholder")}"
            />
            <div class="la-combine-h -gap5 la-text-header -widthfull -textaligncenter -padding0-tb">
                <!-- 'id' in this case is actually the uuid -->
                <span 
                    class="-upper -fontsize2
                        mech ref set click-open"
                    data-uuid={system.owner?.id}
                >
                {#if system.owner?.value}
                    {system.owner?.value.name}
                {:else}
                    {getLocalized("LA.placeholder")}
                {/if}
                </span>
            </div>
        </div>
    </div>

    <Stats {...props} />
</div>