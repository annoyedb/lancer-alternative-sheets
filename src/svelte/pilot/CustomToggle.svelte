<!--
(#14) - Basically hijacking the statically mounted nav element in the `.hbs` file to be able to hide/display
the given element reactively. Expected to be removed in an update to the Lancer system that will migrate sheets to AppV2
-->
<script lang="ts">
    import { getAdvancedState } from "@/scripts/store/advanced";

    type CustomToggleProps = {
        actor: any;
        button: HTMLElement;
    };

    const {
        actor, button
    } : CustomToggleProps = $props();

    const advancedOptions = $derived(getAdvancedState(actor.uuid));

    $effect(() => {
        button?.classList.toggle('-displaynone', !advancedOptions);
    });
</script>
