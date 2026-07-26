<script lang="ts">
    import { onMount } from 'svelte';
    import { resetTextConsole, sendToTextConsole } from '@/scripts/store/text-log';
    import { getActorContext } from '@/scripts/context';
    import type { MacroDropBoxProps } from '@/interfaces/actor/dragdrop/MacroDropBoxProps';
    import type { TooltipProps } from '@/interfaces/actor/TooltipProps';
    import type { TextLogEventProps } from '@/interfaces/actor/TextLogEventProps';
    import { Logger } from "@/classes/Logger";
    import { TooltipFactory } from '@/classes/TooltipFactory';
    import { ButtonFactory } from '@/classes/ButtonFactory';
    import { RunMacroBase } from '@/classes/flows/RunMacro';
    import { SkillTriggerOtherBase } from '@/classes/flows/SkillTriggerOther';
    import { getCSSDocumentTheme } from '@/scripts/theme';
    import { CustomFlowClass, FlowClass } from "@/enums/FlowClass";
    import { LADataType } from '@/enums/LADataType';
    import { SystemButton } from '@/enums/SystemButton';
    import { TooltipDirection } from '@/enums/TooltipDirection';
    import { getLocalized } from '@/scripts/helpers';
    import FlowButton from "@/svelte/shared/button/FlowButton.svelte";
    import DragDropHandle from '@/svelte/shared/dragdrop/DragDropHandle.svelte';
    import SkillTriggerButton from '@/svelte/shared/button/SkillTriggerButton.svelte';
    import { FLOW_BUTTON_STYLE } from '@/svelte/shared/TerminalText.svelte';

    const {
        uuid,
        getExes,
        setExes,
        hintDropArea,
        allowDrop,

        iconStyle,
        buttonStyle,
        buttonTextStyle,
        innerStyle,

        tooltipHeader,
        tooltipClass,
        tooltipDirection,
        tooltipEnabled,

        logging,
    }: MacroDropBoxProps & TooltipProps & TextLogEventProps = $props();
    const actorUuid = getActorContext()?.uuid;
    interface LocalDropData { type: string; index: number; }

    let component: HTMLElement | null = $state(null);
    // svelte-ignore state_referenced_locally
    let executables = $state(getExes);

    const systemTypes = Object.values(SystemButton);
    const theme = $derived(getCSSDocumentTheme(uuid))

    const tipMain = $derived(TooltipFactory.buildTooltip(getLocalized("LA.advanced.addMacro.tooltip.0"), tooltipHeader));
    const tipAlt = $derived(TooltipFactory.buildTooltip(getLocalized("LA.advanced.addMacro.tooltip.1"), tooltipHeader));
    const logMain = getLocalized("LA.advanced.addMacro.tooltip.0");
    const logAlt = getLocalized("LA.advanced.addMacro.tooltip.1");
    const log = $derived(allowDrop ? logAlt : logMain);

    onMount(() => {
        if (component)
        {
            macroDropHandler.bind(component);
        }
    });
    
    function isSystemFlow(item: string) 
    {
        return systemTypes.includes(item as SystemButton);
    }

    function isSkillTrigger(item: string) 
    {
        return (fromUuidSync(item) as any)?.type === "skill";
    }

    function handleFlowDrop(
        _event: DragEvent, 
        dropData: LocalDropData, 
        thisData: LocalDropData)
    {
        if (dropData.type === LADataType.Sorting)
        {
            const [movedItem] = executables.splice(dropData.index, 1);
            executables.splice(thisData.index, 0, movedItem);
            setExes(uuid, executables);
        }
    }

    function buildFlowData(_button: string, index: number)
    {
        return {
            type: LADataType.Sorting, 
            index,
        }
    }

    function handleDelete(event: MouseEvent, index: number)
    {
        event.stopPropagation();
        executables.splice(index, 1);
        setExes(uuid, executables);
    }

    // Foundry drag and drop handler -------------------------------------------------
    // Drag and drop handler for Foundry document items
    const macroDropHandler = new foundry.applications.ux.DragDrop.implementation({
        dropSelector: ".macro-droppable",
        callbacks: {
            drop: (event) => handleMacroDocumentDrop(event),
        }
    });

    function handleMacroDocumentDrop(event: DragEvent)
    {
        if (!allowDrop) return;
        
        const data = event.dataTransfer?.getData("text/plain");
        if (!data) return;

        const obj = JSON.parse(data);
        // TODO: Handle dropping flows
        switch (obj.type)
        {
            case "Macro":
                executables.push(obj.uuid);
                setExes(uuid, executables);
                break;
            case LADataType.Sorting:
                break;
            default:
                Logger.log("Unsupported drop type", obj);
        }
    }
</script>
<div bind:this={component}
    class="la-flexcol -widthfull
    {hintDropArea ? '-divider la-prmy-accent' : ''}"
>
{#if hintDropArea}
    {#if allowDrop}
        <div role="none"
            class="la-flexrow -justifybetween -widthfull -upper -fontsizesmall -letterspacing0 -padding0-lr"
            onpointerenter={ logging ? event => sendToTextConsole(event, log, actorUuid!) : undefined }
            onpointerleave={ logging ? event => resetTextConsole(event, actorUuid!) : undefined }
        >
            <i class="mdi mdi-arrow-down-left"></i>
            <span>
                {getLocalized("LA.advanced.addMacro.hint")}
            </span>
            <i class="mdi mdi-arrow-down-right"></i>
        </div>
    {:else}
        <span class="la-prmy-transparent -fontsizesmall">&nbsp;</span>
    {/if}
{/if}
    <div class="la-macroflows la-dropshadow la-flexcol -widthfull
        {innerStyle?.join(' ')}
        macro-droppable"
    >
    {#if executables.length}
    <!-- 
    `type` will be a string (e.g "Overcharge") if a system flow
    or a UUID if a macro or skill trigger.  
    -->
    {#each executables as type, index}
        <DragDropHandle
            index={index}
            root={component}
            data={buildFlowData(type, index)}
            style={["-justifyend"]}
            iconStyle={["-fontsize4 -padding1-lr", ...(iconStyle || [])]}
            onDrop={handleFlowDrop}
            onDelete={event => handleDelete(event, index)}

            disabled={!allowDrop}
            deleteDisabled={isSystemFlow(type) || isSkillTrigger(type)}

            logging={logging}
        >
        {#if isSkillTrigger(type)}
            <SkillTriggerButton
                buttonStyle={[...(buttonStyle || [])]}
                buttonTextStyle={[FLOW_BUTTON_STYLE, ...(buttonTextStyle || [])]}
                item={fromUuidSync(type)}
                tooltipEnabled={tooltipEnabled}
                tooltipTheme={theme}
                tooltipHeader={tooltipHeader}
                logging={logging}
            />
        {:else if isSystemFlow(type)}
            {#if type === SystemButton.SkillTriggerOther}
                <div class="la-skilltrigger la-flexrow -justifyend -widthfull">
                    <FlowButton
                        style={[...(buttonStyle || [])]}
                        textStyle={[FLOW_BUTTON_STYLE, ...(buttonTextStyle || [])]}
                        text={ButtonFactory.getSystemButtonLabel(type)}

                        flowClass={FlowClass.None}
                        uuid={uuid}

                        tooltipEnabled={tooltipEnabled}
                        tooltipTheme={theme}
                        tooltipHeader={ButtonFactory.getSystemButtonTipHeader(type)}
                        tooltip={ButtonFactory.getSystemButtonTip(type, uuid)}
                        logText={ButtonFactory.getSystemButtonTip(type, uuid)}
                        logging={logging}
                        
                        onClick={event => {
                            event.stopPropagation();
                            SkillTriggerOtherBase.getInstance()
                                .startFlow(uuid, {} as any);
                        }}
                    />
                    <span class="la-skilltrigger__span -bordersround-rtb -small la-brdr-secondary la-bckg-darken-2">
                        <span class="la-skilltrigger__inner -bordersround-rtb -small la-brdr-darken-2 la-text-text -fontsize4 -fontface-stylized -textaligncenter -overflowhidden -padding0-lr">
                            &nbsp;0
                        </span>
                    </span>
                </div>
            {:else}
                <FlowButton
                    style={[...(buttonStyle || [])]}
                    textStyle={[FLOW_BUTTON_STYLE, ...(buttonTextStyle || [])]}
                    text={ButtonFactory.getSystemButtonLabel(type)}

                    flowClass={FlowClass.Standard}
                    uuid={uuid}
                    flowType={type}

                    tooltipEnabled={tooltipEnabled}
                    tooltipTheme={theme}
                    tooltipHeader={ButtonFactory.getSystemButtonTipHeader(type)}
                    tooltip={ButtonFactory.getSystemButtonTip(type, uuid)}
                    logText={ButtonFactory.getSystemButtonTip(type, uuid)}
                    logging={logging}
                />
            {/if}
        {:else}
            <FlowButton
                style={[...(buttonStyle || [])]}
                textStyle={[FLOW_BUTTON_STYLE, ...(buttonTextStyle || [])]}
                text={(fromUuidSync(type)?.name as string) || getLocalized("LA.placeholder")}
                flowClass={CustomFlowClass.RunMacro}
                onClick={event => {
                    event.stopPropagation();
                    RunMacroBase.getInstance().startFlow(uuid, {uuid: type});
                }}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={theme}
                logging={logging}
            />
        {/if}
        </DragDropHandle>
    {/each}
    {:else}
        <details class="la-details -widthfull la-flexcol">
            <summary class="la-details__summary la-flexrow clipped-bot-alt la-bckg-repcap la-text-header -padding1-l -widthfull"
                data-tooltip={tooltipEnabled 
                    ? allowDrop ? tipAlt : tipMain 
                    : undefined}
                data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${theme}`}
                data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
                onpointerenter={ logging ? event => sendToTextConsole(event, log, actorUuid!) : undefined }
                onpointerleave={ logging ? event => resetTextConsole(event, actorUuid!) : undefined }
            >
                <span class="la-left la-flexrow">
                    {#if allowDrop}
                    <span class="la-name__span -fontsize4">
                        {getLocalized("LA.advanced.addMacro.subLabel")}
                    </span>
                    {:else}
                    <i class="la-icon mdi mdi-card-off-outline -fontsize4 -margin1-lr"></i>
                    <span class="la-name__span -fontsize4">
                        {getLocalized("LA.advanced.addMacro.label")}
                    </span>
                    {/if}
                </span>
            </summary>
        </details>
    {/if}
    </div>
</div>