<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import { getPilotSheetTooltipEnabled } from "@/scripts/pilot/settings";
    import { FlowClass } from "@/enums/FlowClass";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import HeaderSecondary, { H2_HEADER_STYLE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import EditButton, { HEADER_SECONDARY_STYLE as HEADER_SECONDARY_ICON_OPTION_STYLE } from "@/svelte/actor/button/EditButton.svelte";
    import MessageButton from "@/svelte/actor/button/MessageButton.svelte";
    import EffectButton from "@/svelte/actor/button/EffectButton.svelte";

    const {
        actor,
        skills
    } = $props();
    let collapseAllButtonHover = $state(false);
    let editButtonHover = $state(false);
    let messageButtonHover = $state(false);
    let effectButtonHover = $state(false);

    const collID = `${actor.uuid}.skills`;
    const tooltipEnabled = getPilotSheetTooltipEnabled();
    const qualityMode = true; // TODO: change to a setting

    function getSkillPath(index: number)
    {
        return `itemTypes.skill.${index}`;
    }
</script>

{#snippet headerOptions()}
<CollapseAllButton
    collapseID={collID}
    tooltipEnabled={tooltipEnabled}

    onPointerEnter={() => {collapseAllButtonHover = true;}}
    onPointerLeave={() => {collapseAllButtonHover = false;}}
/>
{/snippet}

<HeaderMain
    text={getLocalized("LA.pilot.skill.label")}
    headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
    textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
    borderStyle={["la-brdr-primary"]}
    extensionTextFunction={() => {
        if (collapseAllButtonHover)
            return `--${getLocalized("LA.collapseAll.extension")}`;
        return undefined;
    }}
    
    collapseID={collID}
    startCollapsed={true}
    
    headerContent={headerOptions}
>
{#if skills.length}
    <div class="la-combine-v -gap0 -widthfull">
    {#each skills as skill, index}
    {#snippet headerSecondaryLeftOptions()}
        <EffectButton
            iconStyle={["la-text-header", "cci", "cci-skill", "-fontsize5"]}
            iconBackgroundStyle={["-padding0-l", "-fontsize5", "la-anim-secondary", `${qualityMode ? "la-pulse-color" : "la-text-scrollbar-secondary"}`]}
            
            flowClass={FlowClass.Skill}
            uuid={skill.uuid}

            tooltipEnabled={tooltipEnabled}
            tooltip={skill.system.description}
            tooltipHeader={getLocalized("LA.pilot.skillTrigger.label")}
            tooltipDirection={TooltipDirection.LEFT}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}
                        
            onPointerEnter={() => {effectButtonHover = true;} }
            onPointerLeave={() => {effectButtonHover = false;} }
        />
    {/snippet}
    {#snippet headerSecondaryRightOptions()}
        <span class="la-combine-h -gap0 -padding2-r">
            {#if skill.system.curr_rank > 0}
            <span class="-fontsize2">
                +
            </span>
            {:else if skill.system.curr_rank < 0}
            <span class="-fontsize2">
                -
            </span>
            {/if}
            {skill.system.curr_rank * 2}
        </span>
        <EditButton
            flowClass={FlowClass.ContextMenu}
            path={getSkillPath(index)}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}

            tooltipEnabled={tooltipEnabled}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onPointerEnter={() => {editButtonHover = true;}}
            onPointerLeave={() => {editButtonHover = false;}}
        />
        <MessageButton
            flowClass={FlowClass.SendToChat}
            uuid={skill.uuid}

            style={[HEADER_SECONDARY_ICON_OPTION_STYLE, "-padding0-lr"]}
            
            tooltipEnabled={tooltipEnabled}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onPointerEnter={() => {messageButtonHover = true;}}
            onPointerLeave={() => {messageButtonHover = false;}}
        />
    {/snippet}
        <HeaderSecondary
            text={skill.name}
            headerStyle={[H2_HEADER_STYLE, "la-bckg-pilot"]}
            textStyle={["la-text-header", "la-anim-header", "-fontsize2", "-overflowhidden"]}
            borderStyle={["-bordersoff"]}
            extensionTextFunction={() => {
                if (effectButtonHover)
                    return `--${getLocalized("LA.use.label")}`;
                if (messageButtonHover)
                    return `--${getLocalized("LA.chat.extension")}`;
                if (editButtonHover)
                    return `--${getLocalized("LA.edit.extension")}`;
                return undefined;
            }}

            itemID={skill.lid}
            uuid={skill.uuid}
            path={getSkillPath(index)}
            acceptTypes={"skill"}
            
            collapseID={skill.uuid}
            startCollapsed={true}

            headerContentLeft={headerSecondaryLeftOptions}
            headerContentRight={headerSecondaryRightOptions}
        >
            <EffectBox
                name={getLocalized("LA.description.label")}
                effect={skill.system.description}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
            <EffectBox
                name={getLocalized("LA.detail.label")}
                effect={skill.system.detail}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
        </HeaderSecondary>
    {/each}
    </div>
{:else}
    <details class="la-details -widthfull la-combine-v
            ref set drop-settable skill"
        data-accept-types="skill"
        data-path={`itemTypes.skill.${skills.length}`}
    >
        <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1-l -widthfull">
            <div class="la-left la-combine-h">
                <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
                <span class="la-name__span -fontsize2">{getLocalized("LA.pilot.skill.empty.label")}</span>
            </div>
        </summary>
        <div class="la-details__wrapper -bordersround -bordersoff">
            <div class="la-warn__span la-details__span la-text-repcap -padding3 -fontsize3 -textaligncenter -widthfull -upper">{getLocalized("LA.pilot.skill.empty.subLabel")}</div>
        </div>
    </details>
{/if}
</HeaderMain>