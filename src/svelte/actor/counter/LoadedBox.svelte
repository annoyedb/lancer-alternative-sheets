<!-- @component
Special implementation of the `CounterBox` component for items with the `Loading` tag
-->
<script lang="ts">
    import { CounterBoxType } from "@/enums/CounterBoxType";
    import type { PointerClickProps } from "@/interfaces/actor/events/PointerClickProps";
    import type { LoadedBoxProps } from "@/interfaces/actor/LoadedBoxProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { getLocalized, isLoading } from "@/scripts/helpers";
    import CounterBox from "@/svelte/actor/counter/CounterBox.svelte";

    const {
        item,
        path,
        style,
        
        logText,
        logType,
        logTypeReset,

        onPointerClick,
    }: LoadedBoxProps & TextLogEventProps & PointerClickProps = $props();
    const loaded = item.system.loaded;

    const log = logText || getLocalized("LA.loaded.tooltip");
    
    // Reimplementation of Lancer's `handleLoadedInteraction` function for this module
    export function handleLoadedInteraction(event: MouseEvent, index: number)
    {
        item.update({
            "system.loaded": !loaded,
        });

        if (onPointerClick)
            onPointerClick(event, index);
    }
</script>

{#if isLoading(item) 
    && (item.type === "mech_weapon" 
    || item.type === "pilot_weapon"
    || item.type === "npc_feature")}
    <CounterBox
        text={getLocalized("LA.loaded.label")}

        type={CounterBoxType.Loaded}
        usesValue={loaded ? 1 : 0}
        usesMax={1}
        path={path}
        style={style}

        logText={log}
        logType={logType}
        logTypeReset={logTypeReset}

        onPointerClick={handleLoadedInteraction}
    />
{/if}