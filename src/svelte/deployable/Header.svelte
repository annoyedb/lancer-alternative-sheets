<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import type { DeployableSheetProps } from "@/interfaces/deployable/DeployableSheetProps";
    import Stats from "@/svelte/deployable/Stats.svelte";
    import {getExtraEffectsEnabled} from "@/scripts/settings";

    const props = $props();
    const {
        actor,
        system,
    }: DeployableSheetProps = $derived(props);

    const qualityMode = getExtraEffectsEnabled();
</script>

<div class="la-flexcol -widthfull -heightfull">
    <!-- Name & Templates -->
    <div class="la-bckg-primary -widthfull -height15
            {qualityMode ? 'la-bg-scroll-alt' : 'la-bg-alt'}"
    >
        <div class="la-flexcol -widthfull -heightfull -padding1-lr">
            <input type="text" 
                class="la-actorname__input la-text-header -upper -fontsize6 -textaligncenter -heightfull"
                name="name" 
                value="{actor.name}" 
                placeholder={getLocalized("LA.placeholder")}
            />
            <div class="la-flexrow -gap5 la-text-header -widthfull -textaligncenter -padding0-tb">
                <!-- 'id' in this case is actually the uuid -->
                <span 
                    class="-upper -fontsize4
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