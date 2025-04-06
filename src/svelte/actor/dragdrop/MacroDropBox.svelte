<script lang="ts">
    import { onMount } from 'svelte';
    import { Logger } from "@/classes/Logger";
    import { ButtonFactory } from '@/classes/ButtonFactory';
    import { RunMacroBase } from '@/classes/flows/RunMacro';
    import { CustomFlowClass, FlowClass } from "@/enums/FlowClass";
    import { SystemButton } from '@/enums/SystemButton';
    import { TextLogHook } from '@/enums/TextLogHook';
    import { getLocalized } from '@/scripts/helpers';
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";
    import DragDropHandle from '@/svelte/actor/dragdrop/DragDropHandle.svelte';
    import { LADataType } from '@/enums/LADataType';

    const {
        uuid,
        getExes,
        setExes,
        hintDropArea,
        allowDrop,
        iconStyle,
        buttonStyle,
    } = $props();
    let component: HTMLElement | null = $state(null);
    let executables = $state(getExes);

    const buttonTypes = Object.values(SystemButton);
    interface LocalDropData { type: string; index: number; }

    onMount(() => {
        if (component)
        {
            macroDropHandler.bind(component);
        }
    });
    
    function isMacro(item: string) 
    {
        return !buttonTypes.includes(item as SystemButton);
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
        switch (obj.type)
        {
            case "Macro":
                executables.push(obj.uuid);
                setExes(uuid, executables);
                break;
            case LADataType.Sorting:
                break;
            default:
                Logger.log("Unsupported drop type", obj.type);
        }
    }
</script>

<div class="la-combine-v -widthfull {hintDropArea ? "-divider la-anim-accent" : ""}">
{#if hintDropArea}
    {#if allowDrop}
        <div class="la-combine-h -justifybetween -widthfull la-text-text -upper -fontsize0 -letterspacing0 -padding0-lr">
            <i class="mdi mdi-arrow-down-left"></i>
            <span class="">
                {getLocalized("LA.advanced.addMacro.subLabel")}
            </span>
            <i class="mdi mdi-arrow-down-right"></i>
        </div>
    {:else}
        <span class="la-anim-transparent -fontsize0">&nbsp;</span>
    {/if}
{/if}
    <div class="la-macroflows la-dropshadow la-combine-v -widthfull
        macro-droppable"
        bind:this={component}
    >
    {#if executables.length}
    {#each executables as type, index}
        <DragDropHandle
            index={index}
            root={component}
            data={buildFlowData(type, index)}
            style={["-justifyend"]}
            iconStyle={["-fontsize2", "-padding1-lr", "-padding0-tb", ...iconStyle]}
            onDrop={handleFlowDrop}
            onDelete={event => handleDelete(event, index)}

            disabled={!allowDrop}
            deleteDisabled={!isMacro(type)}

            logType={TextLogHook.MechHeader}
            logTypeReset={TextLogHook.MechHeaderReset}
        >
        {#if isMacro(type)}
            <FlowButton
                textStyle={["-padding1-r", "-padding0-tb", "-height3", "-letterspacing0", "la-text-header", "la-anim-header", ...buttonStyle]}
                text={fromUuidSync(type)?.name || getLocalized("LA.placeholder")}
                flowClass={CustomFlowClass.RunMacro}
                onClick={event => {
                    event.stopPropagation();
                    RunMacroBase.getInstance().startFlow(uuid, {uuid: type});
                }}
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            />
        {:else}
            <FlowButton
                text={ButtonFactory.getSystemButtonLabel(type)}

                flowClass={FlowClass.Standard}
                uuid={uuid}
                flowType={type}

                tooltipHeader={ButtonFactory.getSystemButtonTipHeader(type)}
                tooltip={ButtonFactory.getSystemButtonTip(type, uuid)}
                logText={ButtonFactory.getSystemButtonTip(type, uuid)}
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            />
        {/if}
        </DragDropHandle>
    {/each}
    {:else}
        <details class="la-details -widthfull la-combine-v">
            <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1-l -widthfull">
                <div class="la-left la-combine-h">
                    <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
                    <span class="la-name__span -fontsize2">{getLocalized("LA.advanced.addMacro.label")}</span>
                </div>
            </summary>
            <div class="la-details__wrapper -bordersround -bordersoff">
                <div class="la-warn__span la-details__span la-text-repcap -padding3 -fontsize3 -textaligncenter -widthfull">{getLocalized("LA.advanced.addMacro.subLabel")}</div>
            </div>
        </details>
    {/if}
    </div>
</div>