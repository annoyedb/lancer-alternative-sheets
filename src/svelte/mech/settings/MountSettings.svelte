<script lang="ts">
    import type { Snippet } from "svelte";
    import { activeTabs, advancedStates } from "@/scripts/advanced";
    import { MOUNT_LOCALIZE_MAP } from "@/scripts/constants";
    import { getLocalized } from "@/scripts/helpers";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import MountOptions from "@/svelte/mech/settings/MountOptions.svelte";
    import { SETTINGS_BUTTON_STYLE, SETTINGS_HEADER_STYLE } from "@/svelte/mech/settings/AdvancedSettings.svelte";
    import MountDelete from "@/svelte/mech/settings/MountDelete.svelte";
    import MountAdd from "@/svelte/mech/settings/MountAdd.svelte";
    import { getMechSheetTipEnabled } from "@/scripts/mech/settings";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { resetLog, sendToLog } from "@/scripts/text-log";
    import { ActiveTab } from "@/enums/ActiveTab";

    const props: MechSheetProps = $props();
    const {
        actor,
        document,
        system,
    } = props;
    
    let advancedOptions = $derived($advancedStates[actor.uuid]?.enabled || false);// This is initialized in the Header's onMount function
    let active = $derived($activeTabs[actor.uuid]?.active[ActiveTab.Primary] || "loadout");// This is set to match the initial tab on the sheet setup
    let toggles = $state(new Array(system.loadout.weapon_mounts.length).fill(false));
    let tooltipElements = new Array(system.loadout.weapon_mounts.length).fill(null);
    let removeToggle = $state(false);
    let editToggle = $state(false);
    let removeElement: HTMLElement | null = null;
    let editElement: HTMLElement | null = null;
    // (#8*) This looks redundant but it's necessary since tooltips aren't updated when the actor sheet does a rerender
    let mountNames = $state(system.loadout.weapon_mounts.map((mount: any) => MOUNT_LOCALIZE_MAP[mount.type] || ""));
    // (#8*)
    let mountIndices = $state(system.loadout.weapon_mounts.map((_mount: any, index: number) => index));

    const weaponMounts = system.loadout.weapon_mounts;

    const tipEnabled = getMechSheetTipEnabled();
    const removeTip = TooltipFactory.buildTooltip(getLocalized("LA.advanced.mount.remove.tooltip"));
    const editTip = TooltipFactory.buildTooltip(getLocalized("LA.advanced.mount.edit.tooltip"));

    // (#8) When the user modifies the mounts, the sheet is rerendered, so 
    // these tooltips lose their event handlers. A possible solution could 
    // be to close the tooltip on rerender/use, but that feels bad UX-wise 

    function handleSelection(event: MouseEvent, snippet: Snippet, index: number)
    {
        event.stopPropagation();

        function clearOtherToggles() 
        {
            toggles.forEach((toggle, jndex) => {
                if (toggle && jndex !== index) 
                {
                    TooltipFactory.unrenderTooltip(tooltipElements[jndex]);
                    tooltipElements[jndex] = null;
                    toggles[jndex] = false;
                }
            });
        }
        function clearToggles() 
        {
            TooltipFactory.unrenderTooltip(tooltipElements[index]);
            tooltipElements[index] = null;
        }

        clearOtherToggles()
        if (toggles[index])
        {
            clearToggles()
        }
        else
        {
            tooltipElements[index] = TooltipFactory.renderTooltipSvelte(
                event, 
                { content: snippet },
                {
                    direction: TooltipDirection.UP, 
                    cssClass: "la-tooltip -widthfull",
                    locked: true,
                }
            )
        }

        toggles[index] = !toggles[index];
    }

    function handleRemove(event: MouseEvent, snippet: Snippet) 
    {
        handleToggle(event, snippet, 'remove');
    }

    function handleEdit(event: MouseEvent, snippet: Snippet) 
    {
        handleToggle(event, snippet, 'edit');
    }

    function handleToggle(event: MouseEvent, snippet: Snippet, type: 'remove' | 'edit' | 'select') 
    {
        event.stopPropagation();

        function clearOtherToggles() 
        {
            toggles.forEach((toggle, index) => {
                if (toggle) 
                {
                    TooltipFactory.unrenderTooltip(tooltipElements[index]);
                    tooltipElements[index] = null;
                    toggles[index] = false;
                }
            });
            TooltipFactory.unrenderTooltip(removeElement);
            removeElement = null;
            removeToggle = false;
            TooltipFactory.unrenderTooltip(editElement);
            editElement = null;
            editToggle = false;
        }

        function clearToggles() 
        {
            if (type === 'remove') 
            {
                TooltipFactory.unrenderTooltip(removeElement);
                removeElement = null;
            }
            else 
            {
                toggles.forEach((toggle, index) => {
                    if (toggle) 
                    {
                        TooltipFactory.unrenderTooltip(tooltipElements[index]);
                        tooltipElements[index] = null;
                        toggles[index] = false;
                    }
                });
                TooltipFactory.unrenderTooltip(editElement);
                editElement = null;
            }
        }

        clearOtherToggles();
        if ((type === 'remove' && removeToggle) || 
            (type === 'edit' && editToggle)) 
        {
            clearToggles();
        }
        else 
        {
            const element = TooltipFactory.renderTooltipSvelte(
                event,
                {
                    content: snippet,
                    unrenderCallback: clearToggles,
                },
                {
                    direction: TooltipDirection.RIGHT,
                    cssClass: "la-tooltip -widthfull",
                    locked: true,
                }
            );
            if (type === 'remove') 
                removeElement = element;
            else 
                editElement = element;
        }

        if (type === 'remove') 
            removeToggle = !removeToggle;
        else 
            editToggle = !editToggle;
    }
</script>

<!-- Remove mount snippet -->
{#snippet removeMount()}
    <h3 class="-widthfull">{getLocalized("LA.advanced.mount.remove.label")}</h3>
    <div class="la-combine-v -widthfull -heightfull -gap0 -padding0">
    {#each weaponMounts as mount, index}
        <MountDelete
            actorSheet={document._sheet.actor}
            mount={mount}
            mountIndex={mountIndices[index]}
            mountIndices={mountIndices}
        />
    {/each}
    </div>
{/snippet}

<!-- Edit mount snippet -->
{#snippet editMount()}
    <h3 class="-widthfull">{getLocalized("LA.advanced.mount.edit.label")}</h3>
    <div class="la-combine-v -widthfull -heightfull -gap0 -padding0">
    {#each weaponMounts as mount, index}
        {#snippet dropdownContent()}
            <MountOptions
                actorSheet={document._sheet.actor}
                mount={mount}
                mountIndex={index}
                mountNames={mountNames}
            />
        {/snippet}

        <!-- (#5*) -->
        <button type="button"
            class="lancer-bckg-secondary lancer-text-light -fontsize1 -letterspacing0"
            onclick={(event) => handleSelection(event, dropdownContent, index)}
        >
            {getLocalized(mountNames[index])}
            <!-- {getLocalized(MOUNT_LOCALIZE_MAP[mount.type])} -->
        {#if toggles[index]}
            <i class="mdi mdi-arrow-up-drop-circle-outline -positionabsolute -left2 -fontsize2"></i>
        {:else}
            <i class="mdi mdi-arrow-right-drop-circle-outline -positionabsolute -left2 -fontsize2"></i>
        {/if}
        </button>
    {/each}
    </div>
{/snippet}

<!-- Component -->
<div class="-heightfull
    {advancedOptions && active === "loadout" ? "la-combine-h" : "-displaynone"}"
>    
    <span class="{SETTINGS_HEADER_STYLE} -alignend">
        {getLocalized("LA.advanced.mount.label")}
    </span>
    <div class="la-combine-v -alignstart -padding0-b -heightfull">
        <MountAdd/>
        <button type="button" 
            class={SETTINGS_BUTTON_STYLE}
            data-tooltip={tipEnabled ? removeTip : undefined}
            data-tooltip-direction={TooltipDirection.RIGHT}
            data-tooltip-class={"la-tooltip clipped-bot"}
            onpointerenter={ event => sendToLog(event, getLocalized("LA.advanced.mount.remove.tooltip"), TextLogHook.MechHeader) }
            onpointerleave={ event => resetLog(event, TextLogHook.MechHeaderReset) }
            onclick={event => handleRemove(event, removeMount)}
            aria-label={getLocalized("LA.advanced.mount.remove.tooltip")}
        >
            <i class="mdi mdi-minus-box -verticalaligntop"></i>
        </button>
        <!-- (#5*) -->
        <!-- svelte-ignore event_directive_deprecated -->
        <button type="button" 
            class={SETTINGS_BUTTON_STYLE}
            data-tooltip={tipEnabled ? editTip : undefined}
            data-tooltip-direction={TooltipDirection.RIGHT}
            data-tooltip-class={"la-tooltip clipped-bot"}
            onpointerenter={ event => sendToLog(event, getLocalized("LA.advanced.mount.edit.tooltip"), TextLogHook.MechHeader) }
            onpointerleave={ event => resetLog(event, TextLogHook.MechHeaderReset) }
            onclick={event => handleEdit(event, editMount)}
            aria-label={getLocalized("LA.advanced.mount.edit.tooltip")}
        >
            <i class="mdi mdi-list-box -verticalaligntop"></i>
        </button>
    </div>
</div>