<script lang="ts">
    import { onMount } from 'svelte';
    import { resetLog, sendToLog } from '@/scripts/store/text-log';
    import type { MacroDropBoxProps } from '@/interfaces/actor/dragdrop/MacroDropBoxProps';
    import type { TooltipProps } from '@/interfaces/actor/TooltipProps';
    import type { TextLogEventProps } from '@/interfaces/actor/TextLogEventProps';
    import { Logger } from "@/classes/Logger";
    import { TooltipFactory } from '@/classes/TooltipFactory';
    import { ButtonFactory } from '@/classes/ButtonFactory';
    import { RunMacroBase } from '@/classes/flows/RunMacro';
    import { SkillTriggerOtherBase } from '@/classes/flows/SkillTriggerOther';
    import { getDocumentTheme } from '@/scripts/theme';
    import { CustomFlowClass, FlowClass } from "@/enums/FlowClass";
    import { LADataType } from '@/enums/LADataType';
    import { SystemButton } from '@/enums/SystemButton';
    import { TooltipDirection } from '@/enums/TooltipDirection';
    import { getLocalized } from '@/scripts/helpers';
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";
    import DragDropHandle from '@/svelte/actor/dragdrop/DragDropHandle.svelte';
    import SkillTriggerButton from '@/svelte/actor/button/SkillTriggerButton.svelte';

    const {
        uuid,
        getExes,
        setExes,
        hintDropArea,
        allowDrop,

        iconStyle,
        buttonStyle,

        tooltipHeader,
        tooltipClass,
        tooltipDirection,
        tooltipEnabled,

        logType,
        logTypeReset,
    }: MacroDropBoxProps & TooltipProps & TextLogEventProps = $props();
    let component: HTMLElement | null = $state(null);
    let executables = $state(getExes);

    const systemTypes = Object.values(SystemButton);
    interface LocalDropData { type: string; index: number; }

    const tipMain = TooltipFactory.buildTooltip(getLocalized("LA.advanced.addMacro.tooltip.0"), tooltipHeader);
    const tipAlt = TooltipFactory.buildTooltip(getLocalized("LA.advanced.addMacro.tooltip.1"), tooltipHeader);
    const logging = logType && logTypeReset;
    const logMain = getLocalized("LA.advanced.addMacro.tooltip.0");
    const logAlt = getLocalized("LA.advanced.addMacro.tooltip.1");
    const log = allowDrop ? logAlt : logMain;

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
    const macroDropHandler = new DragDrop({
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

<div class="la-combine-v -widthfull {hintDropArea ? "-divider la-prmy-accent" : ""}">
{#if hintDropArea}
    {#if allowDrop}
        <div 
            class="la-combine-h -justifybetween -widthfull -upper -fontsize0 -letterspacing0 -padding0-lr"
            onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
            onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
        >
            <i class="mdi mdi-arrow-down-left"></i>
            <span>
                {getLocalized("LA.advanced.addMacro.hint")}
            </span>
            <i class="mdi mdi-arrow-down-right"></i>
        </div>
    {:else}
        <span class="la-prmy-transparent -fontsize0">&nbsp;</span>
    {/if}
{/if}
    <div class="la-macroflows la-dropshadow la-combine-v -widthfull
        macro-droppable"
        bind:this={component}
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
            iconStyle={["-fontsize2", "-padding1-lr", ...(iconStyle || [])]}
            onDrop={handleFlowDrop}
            onDelete={event => handleDelete(event, index)}

            disabled={!allowDrop}
            deleteDisabled={isSystemFlow(type) || isSkillTrigger(type)}

            logType={logType}
            logTypeReset={logTypeReset}
        >
        {#if isSkillTrigger(type)}
            <SkillTriggerButton
                item={fromUuidSync(type)}
                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(uuid)}
                tooltipHeader={tooltipHeader}
                logType={logType}
                logTypeReset={logTypeReset}
            />
        {:else if isSystemFlow(type)}
            {#if type === SystemButton.SkillTriggerOther}
                <div class="la-skilltrigger la-combine-h -justifyend">
                    <FlowButton
                        text={ButtonFactory.getSystemButtonLabel(type)}

                        flowClass={FlowClass.None}
                        uuid={uuid}

                        tooltipEnabled={tooltipEnabled}
                        tooltipTheme={getDocumentTheme(uuid)}
                        tooltipHeader={ButtonFactory.getSystemButtonTipHeader(type)}
                        tooltip={ButtonFactory.getSystemButtonTip(type, uuid)}
                        logText={ButtonFactory.getSystemButtonTip(type, uuid)}
                        logType={logType}
                        logTypeReset={logTypeReset}
                        
                        onClick={event => {
                            event.stopPropagation();
                            SkillTriggerOtherBase.getInstance()
                                .startFlow(uuid, {} as any);
                        }}
                    />
                    <span class="la-skilltrigger__span -bordersround-rtb -small la-brdr-secondary la-bckg-darken-2">
                        <div class="la-skilltrigger__inner -bordersround-rtb -small la-brdr-darken-2 la-text-text -fontsize2 -textaligncenter -overflowhidden -height3">
                            0
                        </div>
                    </span>
                </div>
            {:else}
                <FlowButton
                    text={ButtonFactory.getSystemButtonLabel(type)}

                    flowClass={FlowClass.Standard}
                    uuid={uuid}
                    flowType={type}

                    tooltipEnabled={tooltipEnabled}
                    tooltipTheme={getDocumentTheme(uuid)}
                    tooltipHeader={ButtonFactory.getSystemButtonTipHeader(type)}
                    tooltip={ButtonFactory.getSystemButtonTip(type, uuid)}
                    logText={ButtonFactory.getSystemButtonTip(type, uuid)}
                    logType={logType}
                    logTypeReset={logTypeReset}
                />
            {/if}
        {:else}
            <FlowButton
                textStyle={["-padding1-r", "-padding0-tb", "-height3", "-letterspacing0", "la-text-header", "la-prmy-header", ...(buttonStyle || [])]}
                text={fromUuidSync(type)?.name || getLocalized("LA.placeholder")}
                flowClass={CustomFlowClass.RunMacro}
                onClick={event => {
                    event.stopPropagation();
                    RunMacroBase.getInstance().startFlow(uuid, {uuid: type});
                }}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getDocumentTheme(uuid)}
                logType={logType}
                logTypeReset={logTypeReset}
            />
        {/if}
        </DragDropHandle>
    {/each}
    {:else}
        <details class="la-details -widthfull la-combine-v">
            <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1-l -widthfull"
                data-tooltip={tooltipEnabled 
                    ? allowDrop ? tipAlt : tipMain 
                    : undefined}
                data-tooltip-class={`${tooltipClass || "clipped-bot la-tooltip"} ${getDocumentTheme(uuid)}`}
                data-tooltip-direction={tooltipDirection || TooltipDirection.UP}
                onpointerenter={ logging ? event => sendToLog(event, log, logType) : undefined }
                onpointerleave={ logging ? event => resetLog(event, logTypeReset) : undefined }
            >
                <div class="la-left la-combine-h">
                    {#if allowDrop}
                    <span class="la-name__span -fontsize2">
                        {getLocalized("LA.advanced.addMacro.subLabel")}
                    </span>
                    {:else}
                    <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
                    <span class="la-name__span -fontsize2">
                        {getLocalized("LA.advanced.addMacro.label")}
                    </span>
                    {/if}
                </div>
            </summary>
        </details>
    {/if}
    </div>
</div>