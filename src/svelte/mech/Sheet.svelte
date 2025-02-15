<script lang="ts">
    import type { MechSheetData } from "@/interfaces/actor/MechSheetData";
    import Sidebar from "@/svelte/mech/Sidebar.svelte";
    import Header from "@/svelte/mech/Header.svelte";

    const props: MechSheetData = $props();
</script>

<Header {...props}/>
<div class="la-body la-combine-h la-bckg-background">
    <Sidebar {...props}/>
    <div class="la-ruler">&nbsp;</div>
    <!-- HASE -->
    <!-- STATUS -->
    <div class="la-ruler">&nbsp;</div>
</div>

<style lang="scss">
    @use "src/styles/la-boilerplate";
    @use "src/styles/la-shared";
    @use "src/styles/mech/body";
</style>