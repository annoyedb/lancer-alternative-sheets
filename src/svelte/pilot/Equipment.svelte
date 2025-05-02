<script lang="ts">
    import type { PilotSheetProps } from "@/interfaces/pilot/PilotSheetProps";
    import Weapon from "@/svelte/pilot/Weapon.svelte";
    import Armor from "@/svelte/pilot/Armor.svelte";
    import Gear from "@/svelte/pilot/Gear.svelte";
    import Reserve from "@/svelte/pilot/Reserve.svelte";

    const props = $props();
    const {
        actor,
        itemTypes
    } : PilotSheetProps = props;
</script>

<Weapon
    actor={actor}
    weapons={itemTypes.pilot_weapon}
/>
<Armor
    actor={actor}
    armors={itemTypes.pilot_armor}
/>
<Gear
    actor={actor}
    gears={itemTypes.pilot_gear}
/>
<Reserve
    actor={actor}
    reserves={itemTypes.reserve}
/>