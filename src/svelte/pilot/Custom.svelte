<script lang="ts">
    import type { PilotSheetProps } from "@/interfaces/pilot/PilotSheetProps";
    import { setActorContext } from "@/scripts/context";
    import { getLocalized } from "@/scripts/helpers";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/shared/header/HeaderMain.svelte";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { getExtraEffectsEnabled } from "@/scripts/settings";
    import { getBrightness, getCSSDocumentTheme } from "@/scripts/theme";
    import { TooltipFactory } from "@/classes/TooltipFactory";
    import HeaderSecondary, { H2_HEADER_STYLE, H2_TEXT_SIZE } from "@/svelte/shared/header/HeaderSecondary.svelte";
    import EffectBox from "@/svelte/shared/EffectBox.svelte";
    import { resetTextConsole, sendToTextConsole } from "@/scripts/store/text-log";
    import { CustomFlagContentType } from "@/enums/CustomFlagContentType";
    import { CustomFlagKey } from "@/enums/CustomFlagKey";
    import { LADataType } from "@/enums/LADataType";
    import type { CustomFlag } from "@/interfaces/actor/CustomFlagData";
    import { addCustomFlag, deleteCustomFlag, getCustomFlagPath, getCustomFlags, reorderCustomFlags, updateCustomFlag } from "@/scripts/flags";
    import { getEnricher } from "@/scripts/enrichers";
    import { getThemeKey } from "@/scripts/store/theme";
    import { getCustomFlagsSortable, setCustomFlagsSortable } from "@/scripts/store/advanced";
    import DragDropHandle from "@/svelte/shared/dragdrop/DragDropHandle.svelte";

    const {
        actor,
    }: PilotSheetProps = $props();
    setActorContext(actor);

    let component: HTMLElement | null = $state(null);
    let deleteButtonHover = $state(false);
    let addButtonHover = $state(false);
    let sortButtonHover = $state(false);

    const theme = $derived(getCSSDocumentTheme(actor.uuid));
    const customFlags = $derived(getCustomFlags(actor, CustomFlagKey.Pilot));
    const flagEntries = $derived(Object.entries(customFlags));
    const sortable = $derived(getCustomFlagsSortable(actor.uuid));

    const tooltipEnabled = getPilotSheetTooltipEnabled();
    const qualityMode = getExtraEffectsEnabled();
    const refCopyTip = TooltipFactory.buildTooltip(getLocalized("LA.tab.custom.flag.ref.tooltip"));
    const enrichCopyTip = TooltipFactory.buildTooltip(getLocalized("LA.tab.custom.flag.enricher.tooltip"));

    function handleAddCustomFlag(_event: Event, actor: any)
    {
        addCustomFlag(actor, CustomFlagKey.Pilot);
    }

    function handleDeleteCustomFlag(event: Event, actor: any, id: string)
    {
        event.stopPropagation();
        deleteCustomFlag(actor, CustomFlagKey.Pilot, id);
    }

    function handleUpdateCustomFlag(actor: any, id: string, changes: Partial<CustomFlag>)
    {
        updateCustomFlag(actor, CustomFlagKey.Pilot, id, changes);
    }

    function handleReorderCustomFlag(_event: DragEvent, dropData: { type: string, index: number }, thisData: { type: string, index: number })
    {
        if (dropData.type !== LADataType.Sorting)
            return;
        reorderCustomFlags(actor, CustomFlagKey.Pilot, dropData.index, thisData.index);
    }

    function getTypeIcon(type: string)
    {
        return type == CustomFlagContentType.Fraction ? 'mdi-fraction-one-half' : 'mdi-numeric'
    }
</script>

{#snippet headerOptions()}
    <GlyphButton type="button"
        flowClass={FlowClass.None}
        style={["la-text-header la-prmy-header la-scdy-primary -fontsize5 -alignselfcenter",
                qualityMode ? " -glow-prmy -glow-scdy-hover " : "",
                sortable ? " mdi mdi-sort-variant-lock-open " : " mdi mdi-sort-variant-lock "]}

        tooltipEnabled={tooltipEnabled}
        tooltipDirection={TooltipDirection.UP}
        tooltipTheme={theme}
        tooltip={getLocalized("LA.tab.custom.sort.tooltip")}
        logText={getLocalized("LA.tab.custom.sort.tooltip")}
        logging={true}

        onClick={() => setCustomFlagsSortable(actor.uuid, !sortable)}
        onPointerEnter={() => {sortButtonHover = true;} }
        onPointerLeave={() => {sortButtonHover = false;} }
    ></GlyphButton>
    <GlyphButton type="button"
        flowClass={FlowClass.None}
        style={["mdi mdi-plus-thick la-text-header la-prmy-header la-scdy-primary -fontsize5 -alignselfcenter",
                qualityMode ? " -glow-prmy -glow-scdy-hover " : ""]}

        tooltipEnabled={tooltipEnabled}
        tooltipDirection={TooltipDirection.UP}
        tooltipTheme={theme}
        tooltip={getLocalized("LA.tab.custom.add.tooltip")}
        logText={getLocalized("LA.tab.custom.add.tooltip")}
        logging={true}

        onClick={event => handleAddCustomFlag(event, actor)}
        onPointerEnter={() => {addButtonHover = true;} }
        onPointerLeave={() => {addButtonHover = false;} }
    ></GlyphButton>
{/snippet}

{#snippet headerSecondaryInnerLeftOptions()}
    <i
        class="mdi mdi-code-json -padding0-lr"
    ></i>
{/snippet}

<div class="la-custom__list la-flexcol -widthfull">
    <HeaderMain
        text={getLocalized("LA.tab.custom.subLabel")}
        headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
        textStyle={["la-text-header -fontsize4 -overflowhidden"]}
        borderStyle={["la-brdr-transparent clipped-bot-alt"]}
        extensionTextFunction={() => {
            if (addButtonHover)
                return `--${getLocalized("LA.tab.custom.add.extension")}`;
            if (sortButtonHover)
                return `--${getLocalized("LA.tab.custom.sort.extension")}`;
            return undefined;
        }}

        headerContent={headerOptions}
    >
        <div class="la-generated -widthfull -gap1 la-flexcol"
            bind:this={component}
        >
        {#each flagEntries as [id, flag], index (id)}
            {#snippet headerSecondaryLeftOptions()}
                <i
                    class="mdi -padding0-lr
                {getTypeIcon(flag.contentType)}"
                ></i>
            {/snippet}

            {#snippet headerSecondaryRightOptions()}
                <GlyphButton type="button"
                    flowClass={FlowClass.None}
                    style={["mdi mdi-close-thick la-prmy-header la-scdy-primary -fontsize5 -alignselfcenter",
                    qualityMode ? " -glow-prmy -glow-scdy-hover " : ""]}

                    tooltipEnabled={tooltipEnabled}
                    tooltipDirection={TooltipDirection.UP}
                    tooltipTheme={theme}
                    tooltip={getLocalized("LA.tab.custom.delete.tooltip")}
                    logText={getLocalized("LA.tab.custom.delete.tooltip")}
                    logging={true}

                    onClick={event => handleDeleteCustomFlag(event, actor, id)}
                    onPointerEnter={() => {deleteButtonHover = true;} }
                    onPointerLeave={() => {deleteButtonHover = false;} }
                ></GlyphButton>
            {/snippet}

            <DragDropHandle
                style={[sortable ? "-padding5-l" : ""]}
                iconStyle={[sortable ? "" : "-displaynone"]}
                index={index}
                root={component}
                data={{ type: LADataType.Sorting, index }}
                onDrop={handleReorderCustomFlag}
                deleteDisabled={true}
                logging={false}
                disabled={!sortable}
            >
            <HeaderSecondary
                text={flag.name || getLocalized("LA.tab.custom.flag.name.label")}
                headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
                textStyle={[H2_TEXT_SIZE, "-fontface-stylized"]}
                borderStyle={["la-brdr-pilot"]}
                extensionTextFunction={() => {
                    if (deleteButtonHover)
                        return `--${getLocalized("LA.tab.custom.delete.extension")}`;
                    return undefined;
                }}

                collapseID={`custom.${id}`}
                startCollapsed={false}

                contentLeft={headerSecondaryLeftOptions}
                contentRight={headerSecondaryRightOptions}
            >
                <div class="la-generated -widthfull -gap1 la-flexcol">
                    <EffectBox
                        name={getLocalized("LA.tab.custom.flag.name.label")}
                    >
                        <input type="text"
                            class="la-customvalue__input la-text-text -bordersround -small la-brdr-repcap -padding0-lr"
                            value={flag.name}
                            placeholder={getLocalized("LA.namePlaceholder")}
                            onchange={event => handleUpdateCustomFlag(actor, id, { name: (event.target as HTMLInputElement).value })}
                            onfocus={event => event.currentTarget.select()}
                        />
                    </EffectBox>
                    <EffectBox
                        name={getLocalized("LA.tab.custom.flag.contentType.label")}
                    >
                        <select
                            class="la-customvalue__select la-text-text -bordersround -small la-brdr-repcap -padding0-lr -widthfull"
                            onchange={event => handleUpdateCustomFlag(actor, id, { contentType: (event.target as HTMLSelectElement).value as CustomFlagContentType })}
                        >
                            <option value={CustomFlagContentType.Value}
                                selected={flag.contentType === CustomFlagContentType.Value}
                            >{getLocalized("LA.tab.custom.flag.contentType.value.label")}</option>
                            <option value={CustomFlagContentType.Fraction}
                                selected={flag.contentType === CustomFlagContentType.Fraction}
                            >{getLocalized("LA.tab.custom.flag.contentType.fraction.label")}</option>
                        </select>
                    </EffectBox>
                    <EffectBox
                        name={getLocalized("LA.tab.custom.flag.content.label")}
                    >
                        <div class="la-flexrow -gap1">
                            <div class="la-flexcol -gap0">
                                <span class="-fontsizesmall -upper">{getLocalized("LA.tab.custom.flag.content.value.label")}</span>
                                <input type="number"
                                    class="la-customvalue__input la-text-text -bordersround -small la-brdr-repcap -padding0-lr"
                                    value={flag.content.value}
                                    onchange={event => handleUpdateCustomFlag(actor, id, { content: { ...flag.content, value: Number((event.target as HTMLInputElement).value) } })}
                                    onfocus={event => event.currentTarget.select()}
                                />
                            </div>
                            {#if flag.contentType === CustomFlagContentType.Fraction}
                                <div class="la-flexcol -gap0">
                                    <span class="-fontsizesmall -upper">{getLocalized("LA.tab.custom.flag.content.max.label")}</span>
                                    <input type="number"
                                        class="la-customvalue__input la-text-text -bordersround -small la-brdr-repcap -padding0-lr"
                                        value={flag.content.max}
                                        onchange={event => handleUpdateCustomFlag(actor, id, { content: { ...flag.content, max: Number((event.target as HTMLInputElement).value) } })}
                                        onfocus={event => event.currentTarget.select()}
                                    />
                                </div>
                                <div class="la-flexcol -gap0">
                                    <span class="-fontsizesmall -upper">{getLocalized("LA.tab.custom.flag.content.min.label")}</span>
                                    <input type="number"
                                        class="la-customvalue__input la-text-text -bordersround -small la-brdr-repcap -padding0-lr"
                                        value={flag.content.min}
                                        onchange={event => handleUpdateCustomFlag(actor, id, { content: { ...flag.content, min: Number((event.target as HTMLInputElement).value) } })}
                                        onfocus={event => event.currentTarget.select()}
                                    />
                                </div>
                            {/if}
                        </div>
                    </EffectBox>
                    <EffectBox
                        name={getLocalized("LA.tab.custom.flag.sidebarToggle.label")}
                    >
                        <input type="checkbox"
                            class="-widthfull"
                            checked={flag.showInSidebar}
                            onchange={event => handleUpdateCustomFlag(actor, id, { showInSidebar: (event.target as HTMLInputElement).checked })}
                        />
                    </EffectBox>
                    <EffectBox
                        name={getLocalized("LA.tab.custom.flag.color.label")}
                    >
                        <input type="color"
                            class="la-customvalue__input -widthfull"
                            value={flag.color}
                            onchange={event => handleUpdateCustomFlag(actor, id, { color: (event.target as HTMLInputElement).value })}
                        />
                    </EffectBox>
                    <EffectBox
                        name={getLocalized("LA.tab.custom.flag.icon.label")}
                    >
                        <input type="text"
                            class="la-customvalue__input la-text-text -bordersround -small la-brdr-repcap -padding0-lr"
                            value={flag.icon}
                            placeholder={"mdi mdi-abacus"}
                            onchange={event => handleUpdateCustomFlag(actor, id, { icon: (event.target as HTMLInputElement).value })}
                            onfocus={event => event.currentTarget.select()}
                        />
                    </EffectBox>
                    <HeaderSecondary
                        text={getLocalized("LA.tab.custom.flag.assist.label")}
                        headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
                        textStyle={[H2_TEXT_SIZE, "-fontface-stylized"]}
                        borderStyle={["la-brdr-pilot"]}

                        collapseID={`custom.${id}.assist`}
                        startCollapsed={false}

                        contentLeft={headerSecondaryInnerLeftOptions}
                    >
                        <div class="la-generated -widthfull -gap1 la-flexcol">
                            <EffectBox
                                name={getLocalized("LA.tab.custom.flag.ref.label")}
                            >
                                <div class="la-combine-grid -horizontal2-auto -aligncenter -gap1 -widthfull">
                                    <span class=" -upper">{getLocalized("LA.tab.custom.flag.content.value.label")}</span>
                                    <input type="text" readonly
                                        class="la-customvalue__input -bordersround -small -padding0-lr -widthfull
                                        { getBrightness(getThemeKey(actor.uuid)) === 'light'
                                        ? 'la-brdr-darken-3 la-text-darken-7 la-bckg-darken-1'
                                        : 'la-brdr-lighten-3 la-text-lighten-7 la-bckg-lighten-1' }"
                                        value={getCustomFlagPath(CustomFlagKey.Pilot, id, "value")}

                                        data-tooltip={tooltipEnabled ? refCopyTip : undefined}
                                        data-tooltip-class="clipped-bot la-tooltip {theme}"
                                        data-tooltip-direction={TooltipDirection.DOWN}

                                        onpointerenter={ event => sendToTextConsole(event, getLocalized("LA.tab.custom.flag.ref.tooltip"), actor.uuid) }
                                        onpointerleave={ event => resetTextConsole(event, actor.uuid) }
                                        onfocus={event => event.currentTarget.select()}
                                    />
                                    {#if flag.contentType === CustomFlagContentType.Fraction}
                                        <span class=" -upper">{getLocalized("LA.tab.custom.flag.content.max.label")}</span>
                                        <input type="text" readonly
                                            class="la-customvalue__input -bordersround -small -padding0-lr -widthfull
                                            { getBrightness(getThemeKey(actor.uuid)) === 'light'
                                            ? 'la-brdr-darken-3 la-text-darken-7 la-bckg-darken-1'
                                            : 'la-brdr-lighten-3 la-text-lighten-7 la-bckg-lighten-1' }"
                                            value={getCustomFlagPath(CustomFlagKey.Pilot, id, "max")}

                                            data-tooltip={tooltipEnabled ? refCopyTip : undefined}
                                            data-tooltip-class="clipped-bot la-tooltip {theme}"
                                            data-tooltip-direction={TooltipDirection.DOWN}

                                            onpointerenter={ event => sendToTextConsole(event, getLocalized("LA.tab.custom.flag.ref.tooltip"), actor.uuid) }
                                            onpointerleave={ event => resetTextConsole(event, actor.uuid) }
                                            onfocus={event => event.currentTarget.select()}
                                        />
                                        <span class=" -upper">{getLocalized("LA.tab.custom.flag.content.min.label")}</span>
                                        <input type="text" readonly
                                            class="la-customvalue__input -bordersround -small -padding0-lr -widthfull
                                            { getBrightness(getThemeKey(actor.uuid)) === 'light'
                                            ? 'la-brdr-darken-3 la-text-darken-7 la-bckg-darken-1'
                                            : 'la-brdr-lighten-3 la-text-lighten-7 la-bckg-lighten-1' }"
                                            value={getCustomFlagPath(CustomFlagKey.Pilot, id, "min")}

                                            data-tooltip={tooltipEnabled ? refCopyTip : undefined}
                                            data-tooltip-class="clipped-bot la-tooltip {theme}"
                                            data-tooltip-direction={TooltipDirection.DOWN}

                                            onpointerenter={ event => sendToTextConsole(event, getLocalized("LA.tab.custom.flag.ref.tooltip"), actor.uuid) }
                                            onpointerleave={ event => resetTextConsole(event, actor.uuid) }
                                            onfocus={event => event.currentTarget.select()}
                                        />
                                    {/if}
                                </div>
                            </EffectBox>
                            <EffectBox
                                name={getLocalized("LA.tab.custom.flag.enricher.label")}
                            >
                                <div class="la-combine-grid -horizontal2-auto -aligncenter -gap1 -widthfull">
                                    <span class=" -upper">{getLocalized("LA.tab.custom.flag.content.value.label")}</span>
                                    <input type="text" readonly
                                        class="la-customvalue__input -bordersround -small -padding0-lr -widthfull
                                        { getBrightness(getThemeKey(actor.uuid)) === 'light'
                                        ? 'la-brdr-darken-3 la-text-darken-7 la-bckg-darken-1'
                                        : 'la-brdr-lighten-3 la-text-lighten-7 la-bckg-lighten-1' }"
                                        value={getEnricher(actor.uuid, CustomFlagKey.Pilot, id, "value")}

                                        data-tooltip={tooltipEnabled ? enrichCopyTip : undefined}
                                        data-tooltip-class="clipped-bot la-tooltip {theme}"
                                        data-tooltip-direction={TooltipDirection.DOWN}

                                        onpointerenter={ event => sendToTextConsole(event, getLocalized("LA.tab.custom.flag.enricher.tooltip"), actor.uuid) }
                                        onpointerleave={ event => resetTextConsole(event, actor.uuid) }
                                        onfocus={event => event.currentTarget.select()}
                                    />
                                    {#if flag.contentType === CustomFlagContentType.Fraction}
                                        <span class=" -upper">{getLocalized("LA.tab.custom.flag.content.max.label")}</span>
                                        <input type="text" readonly
                                            class="la-customvalue__input -bordersround -small -padding0-lr -widthfull
                                            { getBrightness(getThemeKey(actor.uuid)) === 'light'
                                            ? 'la-brdr-darken-3 la-text-darken-7 la-bckg-darken-1'
                                            : 'la-brdr-lighten-3 la-text-lighten-7 la-bckg-lighten-1' }"
                                            value={getEnricher(actor.uuid, CustomFlagKey.Pilot, id, "max")}

                                            data-tooltip={tooltipEnabled ? enrichCopyTip : undefined}
                                            data-tooltip-class="clipped-bot la-tooltip {theme}"
                                            data-tooltip-direction={TooltipDirection.DOWN}

                                            onpointerenter={ event => sendToTextConsole(event, getLocalized("LA.tab.custom.flag.enricher.tooltip"), actor.uuid) }
                                            onpointerleave={ event => resetTextConsole(event, actor.uuid) }
                                            onfocus={event => event.currentTarget.select()}
                                        />
                                        <span class=" -upper">{getLocalized("LA.tab.custom.flag.content.min.label")}</span>
                                        <input type="text" readonly
                                            class="la-customvalue__input -bordersround -small -padding0-lr -widthfull
                                            { getBrightness(getThemeKey(actor.uuid)) === 'light'
                                            ? 'la-brdr-darken-3 la-text-darken-7 la-bckg-darken-1'
                                            : 'la-brdr-lighten-3 la-text-lighten-7 la-bckg-lighten-1' }"
                                            value={getEnricher(actor.uuid, CustomFlagKey.Pilot, id, "min")}

                                            data-tooltip={tooltipEnabled ? enrichCopyTip : undefined}
                                            data-tooltip-class="clipped-bot la-tooltip {theme}"
                                            data-tooltip-direction={TooltipDirection.DOWN}

                                            onpointerenter={ event => sendToTextConsole(event, getLocalized("LA.tab.custom.flag.enricher.tooltip"), actor.uuid) }
                                            onpointerleave={ event => resetTextConsole(event, actor.uuid) }
                                            onfocus={event => event.currentTarget.select()}
                                        />
                                    {/if}
                                </div>
                            </EffectBox>
                        </div>
                    </HeaderSecondary>
                </div>
            </HeaderSecondary>
            </DragDropHandle>
        {/each}
        </div>
    </HeaderMain>
</div>
