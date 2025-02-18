<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/actor/MechSheetProps";
    import Frame from "@/svelte/mech/Frame.svelte";
    import Systems from "@/svelte/mech/Systems.svelte";
    import Mounts from "@/svelte/mech/Mounts.svelte";

    const props: MechSheetProps = $props();    
</script>

<div class="la-mount__list la-combine-v -widthfull">
    <Frame {...props} />
    <Mounts {...props} />
    <Systems {...props} />
    <!-- 
    {#if system.pilot.value}
        {{{renderCoreBonuses "system.pilot.value.itemTypes.core_bonus"}}}
        {{{renderTalents "system.pilot.value.itemTypes.talent"}}}
    {/if} -->
</div>