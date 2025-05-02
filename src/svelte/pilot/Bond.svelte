<script lang="ts">
    import Burden from "@/svelte/pilot/Burden.svelte";
    import Power from "@/svelte/pilot/Power.svelte";
    import Clock from "@/svelte/pilot/Clock.svelte";
    import Passion from "@/svelte/pilot/Passion.svelte";

    const props = $props();
    const {
        actor,
        system,
    } = props;
</script>

<Passion
    actor={actor}
    system={system}
    bondIndex={0}
/>
<Power
    actor={actor}
    system={system}
/>
<Burden
    actor={actor}
    system={system}
/>
<Clock
    actor={actor}
    system={system}
/>