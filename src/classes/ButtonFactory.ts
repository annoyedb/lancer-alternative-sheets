
import { mount } from "svelte";
import type { UUIDData } from "@/interfaces/flows/UUIDData";
import { SystemButton } from "@/enums/SystemButton";
import { CustomFlowClass, FlowClass } from "@/enums/FlowClass";
import { TextLogHook } from "@/enums/TextLogHook";
import { RunMacroBase } from "@/classes/flows/RunMacro";
import { Logger } from "@/classes/Logger";
import { formatString, getLocalized } from "@/scripts/helpers";
import FlowButton from '@/svelte/actor/button/FlowButton.svelte';

/**
 * A factory class for creating and mounting buttons onto a target HTML element.
 */
export class ButtonFactory
{
    /**
     * Builds and mounts a button onto the specified target element.
     *
     * @param target - The HTML element where the button will be mounted.
     * @param ownerUUID - The UUID of the actor that owns the button.
     * @param build - An optional parameter that determines the type of button to build.
     *                If provided as a `SystemButton` enum, it configures the button accordingly.
     *                If provided as a string that does not match a `SystemButton` enum, it is assumed to be a macro's UUID.
     */
    public static buildFlowButton(target: HTMLElement, ownerUUID: string, build: SystemButton | string): void
    {
        if (Object.values(SystemButton).includes(build as SystemButton))
        {
            const data = this.getSystemButtonData(build as SystemButton);
            this.buildSystemButton(target, ownerUUID, build as SystemButton, data.label, data.tip, data.tipHeader);
        } 
        else
        {
            this.buildMacroButton(target, ownerUUID, build);
        }
    }

    public static getSystemButtonData(build: SystemButton | string): { label: string, tip: string, tipHeader: string | undefined }
    {
        return {
            label: this.getSystemButtonLabel(build),
            tip: this.getSystemButtonTip(build),
            tipHeader: this.getSystemButtonTipHeader(build),
        };
    }

    public static getSystemButtonLabel(build: SystemButton | string): string
    {
        const labels: Record<string, string> = {
            [SystemButton.Stabilize]: "LA.flow.stabilize.label",
            [SystemButton.Overcharge]: "LA.flow.overcharge.label",
            [SystemButton.BasicAttack]: "LA.flow.rollAttack.label",
            [SystemButton.Damage]: "LA.flow.rollDamage.label",
            [SystemButton.TechAttack]: "LA.flow.rollTechAttack.label",
        };
        return getLocalized(labels[build] || "LA.placeholder");
    }

    public static getSystemButtonTip(build: SystemButton | string, ownerUUID?: string): string
    {
        if (build === SystemButton.Overcharge && ownerUUID)
        {
            const actor = fromUuidSync(ownerUUID) as any;
            if (actor)
            {
                const overchargeSequence = actor.system.overcharge_sequence.split(",");
                const overchargeStage = actor.system.overcharge;
                return formatString(getLocalized("LA.flow.overcharge.tooltip"), overchargeSequence[overchargeStage]);
            }
            Logger.error("Actor required to get overcharge sequence for tooltip.");
        }
        const tips: Record<string, string> = {
            [SystemButton.Stabilize]: "LA.flow.stabilize.tooltip",
            [SystemButton.Overcharge]: "LA.flow.overcharge.tooltip",
            [SystemButton.BasicAttack]: "LA.flow.rollAttack.tooltip",
            [SystemButton.Damage]: "LA.flow.rollDamage.tooltip",
            [SystemButton.TechAttack]: "LA.flow.rollTechAttack.tooltip",
        };
        return getLocalized(tips[build] || "LA.flow.tooltip");
    }

    public static getSystemButtonTipHeader(build: SystemButton | string): string | undefined
    {
        const headers: Partial<Record<string, string>> = {
            [SystemButton.Stabilize]: "LA.action.full.label",
            [SystemButton.Overcharge]: "LA.action.overcharge.label",
        };
        return headers[build] ? getLocalized(headers[build]!) : undefined;
    }

    private static buildSystemButton(
        target: HTMLElement, ownerUUID: string, type: SystemButton,
        label: string, tip: string, tipHeader: string | undefined): void
    {
        mount(FlowButton, {
            target: target,
            props: {
                text: label,

                flowClass: FlowClass.Standard,
                uuid: ownerUUID,
                flowType: type,

                tooltip: tip,
                tooltipHeader: tipHeader,
                logText: tip,
                logType: TextLogHook.MechHeader,
                logTypeReset: TextLogHook.MechHeaderReset,
            }
        });
    }

    private static buildMacroButton(
        target: HTMLElement, ownerUUID: string, macroUUID: string): void
    {
        function onClickHandler(ownerUUID: string, macroUUID: string)
        {
            let macroData = {
                uuid: macroUUID,
            } as UUIDData;
            RunMacroBase.getInstance().startFlow(ownerUUID, macroData);
        }

        // Mount the button onto the element
        fromUuid(macroUUID).then((item) =>
        {
            // Build a macro button
            mount(FlowButton, {
                target: target,
                props: {
                    text: item?.name || getLocalized("LA.placeholder"),
                    flowClass: CustomFlowClass.RunMacro,
                    onClick: () => onClickHandler(ownerUUID, macroUUID),
                    logType: TextLogHook.MechHeader,
                    logTypeReset: TextLogHook.MechHeaderReset,
                }
            });
        });
    }
}