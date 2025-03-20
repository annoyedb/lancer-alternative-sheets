<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getManufacturerColor } from "@/scripts/theme";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { getLocalized } from "@/scripts/helpers";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import HeaderQuinary, { H4_BORDER_STYLE } from "@/svelte/actor/header/HeaderQuinary.svelte";
    import EffectButton from "@/svelte/actor/button/EffectButton.svelte";
    import { H2_ICON_SIZE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
    import { FlowClass } from "@/enums/FlowClass";

    const {
        actor,
        system,
    }: MechSheetProps = $props();

    let frame: any = system.loadout.frame!.value;
    let core: any = frame.system.core_system;
    let frameColorBckg = getManufacturerColor(frame.system.manufacturer, "bckg")
    let frameColorBrdr = getManufacturerColor(frame.system.manufacturer, "brdr")
    let collID: string = `${actor.uuid}.${frame.id}.passive`;
    let actionCollID: string = `${actor.uuid}.${frame.id}.passive.action`;
    let tip = core.passive_effect || getLocalized("LA.chat.tooltip");

    function sendToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement })
    {
        event.stopPropagation();
        SendUnknownToChatBase.startFlow(frame.uuid, core.passive_name, core.passive_effect)
    }
</script>

{#if core.passive_effect || core.passive_actions.length || core.passive_bonuses.length}
<!-- Frame Passive -->
{#snippet headerQuinaryLeftOptions()}
<EffectButton
    iconStyle={[H2_ICON_SIZE, "cci", "cci-corebonus"]}
    
    flowClass={FlowClass.None}
    onClick={sendToChat}

    tooltip={tip}
    tooltipDirection={TooltipDirection.LEFT}
/>
{/snippet}
<HeaderQuinary
    text={core.passive_name}
    headerStyle={[frameColorBckg, "-padding0-l"]}
    borderStyle={[H4_BORDER_STYLE, frameColorBrdr]}
    textStyle={["la-text-header", "la-anim-header"]}

    collapseID={collID}

    headerContentLeft={headerQuinaryLeftOptions}
>
    <div class="la-divider-h la-bckg-primary -margin0-tb -margin2-b"></div>
{#if core.passive_effect}
    <EffectBox
        name={getLocalized("LA.mech.core.passive.label")}
        effect={core.passive_effect}
    />
{/if}
    <!-- Generated Content -->
    <ActionBox
        uuid={frame.uuid}
        actions={core.passive_actions}
        path={'system.core_system.passive_actions'}
        collapseID={actionCollID}
        startCollapsed={false}
    />
</HeaderQuinary>
{/if}