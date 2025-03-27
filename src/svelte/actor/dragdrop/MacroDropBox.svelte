<script lang="ts">
    import { onMount } from 'svelte';
    import { ButtonFactory } from '@/classes/ButtonFactory';
    import { RunMacroBase } from '@/classes/flows/RunMacro';
    import { CustomFlowClass, FlowClass } from "@/enums/FlowClass";
    import { SystemButton } from '@/enums/SystemButton';
    import { TextLogHook } from '@/enums/TextLogHook';
    import { getLocalized } from '@/scripts/helpers';
    import { advancedStates } from '@/scripts/advanced';
    import { getSidebarExecutables, setSidebarExecutables } from "@/scripts/mech/settings";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";
    import DragDropHandle from '@/svelte/actor/dragdrop/DragDropHandle.svelte';
    import { LADataType } from '@/enums/LADataType';

    const {
        uuid,
    } = $props();
    let component: HTMLElement | null = $state(null);
    let advancedOptions = $derived($advancedStates[uuid]?.enabled || false);// This is initialized in the Header's onMount function
    let sidebarExes = $state(getSidebarExecutables(uuid));

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
            [sidebarExes[thisData.index], sidebarExes[dropData.index]] = 
            [sidebarExes[dropData.index], sidebarExes[thisData.index]];
            setSidebarExecutables(uuid, sidebarExes);
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
        sidebarExes.splice(index, 1);
        setSidebarExecutables(uuid, sidebarExes);
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
        if (!advancedOptions) return;
        
        const data = event.dataTransfer?.getData("text/plain");
        if (!data) return;

        const obj = JSON.parse(data);
        switch (obj.type)
        {
            case "Macro":
                sidebarExes.push(obj.uuid);
                setSidebarExecutables(uuid, sidebarExes);
                break;
            case LADataType.Sorting:
                break;
            default:
                console.info("Lancer Alternative Sheets: Unsupported drop type:", obj.type);
        }
    }
</script>

<div class="la-macroflows la-dropshadow la-combine-v -widthfull
    macro-droppable"
    bind:this={component}
>
{#each sidebarExes as type, index}
    <DragDropHandle
        uuid={uuid}
        index={index}
        root={component}
        data={buildFlowData(type, index)}
        style={["-justifyend"]}
        iconStyle={["-fontsize2", "-padding1-lr", "-padding0-tb"]}
        onDrop={handleFlowDrop}
        onDelete={event => handleDelete(event, index)}
        deleteDisabled={!isMacro(type)}

        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}
    >
        {#if isMacro(type)}
            <FlowButton
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
</div>