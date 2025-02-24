<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/actor/MechSheetProps";
    import Frame from "@/svelte/mech/Frame.svelte";
    import Systems from "@/svelte/mech/Systems.svelte";
    import Mounts from "@/svelte/mech/Mounts.svelte";
    import CoreBonus from "@/svelte/pilot/CoreBonus.svelte";
    import Talents from "@/svelte/pilot/Talents.svelte";

    const props: MechSheetProps = $props();
</script>

<div class="la-mount__list la-combine-v -widthfull">
    <Frame {...props} />
    <Mounts {...props} />
    <Systems {...props} />
    
    {#if props.pilot && 
        props.pilot.system.active_mech.value.uuid === props.actor.uuid}
        <CoreBonus {...props} />
        <Talents {...props} />
    {/if}
</div>