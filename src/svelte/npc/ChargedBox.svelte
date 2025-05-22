<!-- @component
Special implementation of the `CounterBox` component for npc features that can be recharged
-->
<script lang="ts">
    import { CounterBoxType } from "@/enums/CounterBoxType";
    import type { PointerClickProps } from "@/interfaces/actor/events/PointerClickProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import type { ChargedBoxProps } from "@/interfaces/npc/ChargedBoxProps";
    import { getLocalized, isRecharge } from "@/scripts/helpers";
    import CounterBox from "@/svelte/actor/counter/CounterBox.svelte";

    const {
        item,
        path,
        style,
        
        logText,
        logType,
        logTypeReset,

        onPointerClick,
    }: ChargedBoxProps & TextLogEventProps & PointerClickProps = $props();
    let charged = item.system.charged;
    const log = logText || getLocalized("LA.npc.charged.tooltip")
</script>

{#if isRecharge(item)}
<CounterBox
    text={getLocalized("LA.npc.charged.label")}
    
    type={CounterBoxType.Charged}
    usesValue={charged ? 1 : 0}
    usesMax={1}
    path={path}
    style={style}

    logText={log}
    logType={logType}
    logTypeReset={logTypeReset}

    onPointerClick={onPointerClick}
/>
{/if}