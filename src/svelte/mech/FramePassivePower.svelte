<script lang="ts">
    import { SendUnknownToChatBase } from "@/classes/flows/SendUnknownToChat";
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import type { ChatData } from "@/interfaces/flows/ChatData";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { getMechSheetTooltipEnabled } from "@/scripts/mech/settings";
    import { getManufacturerColor } from "@/scripts/theme";
    import { getLocalized } from "@/scripts/helpers";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import HeaderQuinary, { H4_BORDER_STYLE } from "@/svelte/actor/header/HeaderQuinary.svelte";
    import EffectButton from "@/svelte/actor/button/EffectButton.svelte";
    import { H2_ICON_SIZE } from "@/svelte/actor/header/HeaderSecondary.svelte";

    const {
        actor,
        system,
    }: MechSheetProps = $props();
    let effectButtonHover = $state(false);

    const tooltipEnabled = getMechSheetTooltipEnabled();
    const qualityMode = true; // TODO: change to a setting
    const frame: any = system.loadout.frame!.value;
    const core: any = frame.system.core_system;
    const frameColorBckg = getManufacturerColor(frame.system.manufacturer, "bckg")
    const frameColorBrdr = getManufacturerColor(frame.system.manufacturer, "brdr")
    const collID: string = `${actor.uuid}.${frame.id}.passive`;
    const actionCollID: string = `${actor.uuid}.${frame.id}.passive.action`;
    const tip = core.passive_effect || getLocalized("LA.chat.tooltip");

    function sendToChat(event: MouseEvent & { currentTarget: EventTarget & HTMLElement })
    {
        event.stopPropagation();
        let chatData = {
            title: core.passive_name, 
            description: core.passive_effect
        } as ChatData
        SendUnknownToChatBase.getInstance().startFlow(frame.uuid, chatData);
    }
</script>

{#if core.passive_effect || core.passive_actions.length || core.passive_bonuses.length}
<!-- Frame Passive -->
{#snippet headerQuinaryLeftOptions()}
<EffectButton
    iconStyle={[H2_ICON_SIZE, "cci", "cci-corebonus"]}
    iconBackgroundStyle={[H2_ICON_SIZE, "-padding0-l", "la-anim-secondary", `${qualityMode ? "la-pulse-color" : "la-text-scrollbar-secondary"}`]}
    
    flowClass={FlowClass.None}
    onClick={sendToChat}

    tooltipEnabled={tooltipEnabled}
    tooltip={tip}
    tooltipDirection={TooltipDirection.LEFT}
    logType={TextLogHook.MechHeader}
    logTypeReset={TextLogHook.MechHeaderReset}

    onPointerEnter={() => {effectButtonHover = true;}}
    onPointerLeave={() => {effectButtonHover = false;}}
/>
{/snippet}
<HeaderQuinary
    text={core.passive_name}
    headerStyle={[frameColorBckg, "-padding0-l"]}
    borderStyle={[H4_BORDER_STYLE, frameColorBrdr]}
    textStyle={["la-text-header", "la-anim-header"]}
    extensionTextFunction={() => {
        if (effectButtonHover)
            return `--${getLocalized("LA.use.label")}`;
        return undefined;
    }}

    collapseID={collID}

    headerContentLeft={headerQuinaryLeftOptions}
>
    <div class="la-divider-h la-bckg-primary -margin0-tb -margin2-b"></div>
{#if core.passive_effect}
    <EffectBox
        name={getLocalized("LA.mech.core.passive.label")}
        effect={core.passive_effect}

        tooltipEnabled={tooltipEnabled}
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}
    />
{/if}
    <!-- Generated Content -->
    <ActionBox
        uuid={frame.uuid}
        actions={core.passive_actions}
        path={'system.core_system.passive_actions'}

        collapseID={actionCollID}
        startCollapsed={false}

        tooltipEnabled={tooltipEnabled}
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}
    />
</HeaderQuinary>
{/if}