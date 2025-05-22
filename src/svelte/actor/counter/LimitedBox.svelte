<!-- @component
Special implementation of the `CounterBox` component for items with the `Limited` tag
-->
<script lang="ts">
    import { CounterBoxType } from "@/enums/CounterBoxType";
    import type { PointerClickProps } from "@/interfaces/actor/events/PointerClickProps";
    import type { LimitedBoxProps } from "@/interfaces/actor/LimitedBoxProps";
    import type { TextLogEventProps } from "@/interfaces/actor/TextLogEventProps";
    import { getLocalized } from "@/scripts/helpers";
    import CounterBox from "@/svelte/actor/counter/CounterBox.svelte";

    const {
        path,
        usesValue,
        usesMax,
        
        logText,
        logType,
        logTypeReset,

        onPointerClick,
    }: LimitedBoxProps & TextLogEventProps & PointerClickProps = $props();

    const log = logText || getLocalized("LA.limited.tooltip");
</script>

<CounterBox
    text={getLocalized("LA.limited.label")}
    
    type={CounterBoxType.Limited}
    usesValue={usesValue}
    usesMax={usesMax}
    path={path}

    logText={log}
    logType={logType}
    logTypeReset={logTypeReset}

    onPointerClick={onPointerClick}
/>