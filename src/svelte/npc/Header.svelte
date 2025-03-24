<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import Template from "@/svelte/npc/Template.svelte";
    import Stats from "@/svelte/npc/Stats.svelte";
    import ActiveEffects from "@/svelte/actor/ActiveEffects.svelte";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";

    const props = $props();
    const {
        actor,
        system,
        itemTypes,
    }: NPCSheetProps = props;

    const templates = itemTypes.npc_template;
    const activeEffectsCollID = `${actor.uuid}.status.activeEffects`;
</script>

<div class="la-combine-v -widthfull -heightfull">
    <!-- Name & Templates -->
    <div class="la-bckg-primary la-bg-scroll -widthfull -height10">
        <div class="la-combine-v -widthfull -heightfull -padding1-lr">
            <input 
                class="la-mechname__input la-text-header -upper -fontsize4 -textaligncenter"
                name="name" 
                type="text" 
                value="{actor.name}" 
                placeholder="{getLocalized("LA.namePlaceholder")}"
            />
            <div class="la-combine-h -gap5 la-text-header -widthfull -textaligncenter -padding0-tb">
            {#if templates.length}
            {#each templates as template, index}
                <Template
                    name={template.name}
                    uuid={template.uuid}
                    path={`itemTypes.npc_template.${index}`}
                />
            {/each}
            {/if}
            {#if system.class}
                <Template
                    name={system.class.name}
                    uuid={system.class.uuid}
                    path={`system.class`}
                />
            {/if}
            </div>
        </div>
    </div>

    <Stats {...props} />
    
    <HeaderMain 
        text={getLocalized("LA.npc.utilities.label")}
        headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
        textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
        borderStyle={["la-bckg-card", "la-brdr-transparent", "clipped-bot-alt", "-padding0-r"]}

        collapseID={`${actor.uuid}.status.utilities`}
        startCollapsed={true}
    >
        <FlowButton 
            text={getLocalized("LA.npc.recharge.label")}
            style={["clipped", "la-bckg-secondary", "-flex1", "-overflowhidden", "-widthfull", "-margin0-b"]}
            
            flowClass={FlowClass.RechargeFeatures}
            tooltip={getLocalized("LA.npc.recharge.tooltip")}
            tooltipHeader={getLocalized("LA.action.startofturn.label")}
            tooltipDirection={TooltipDirection.UP}
        />
        <div class="la-combine-grid -horizontal2 -widthfull -gap0">
            <FlowButton 
                text={getLocalized("LA.flow.rollAttack.label")}
                style={["clipped", "la-bckg-secondary", "-flex1", "-overflowhidden"]}

                uuid={actor.uuid}
                flowClass={FlowClass.Standard}
                flowType={"BasicAttack"}

                tooltip={getLocalized("LA.flow.rollAttack.tooltip")}
                tooltipDirection={TooltipDirection.UP}
            />
            <FlowButton 
                text={getLocalized("LA.flow.rollDamage.label")}
                style={["clipped", "la-bckg-secondary", "-flex1", "-overflowhidden"]}

                uuid={actor.uuid}
                flowClass={FlowClass.Standard}
                flowType={"Damage"}

                tooltip={getLocalized("LA.flow.rollDamage.tooltip")}
                tooltipDirection={TooltipDirection.UP}
            />
            <FlowButton 
                text={getLocalized("LA.flow.rollTechAttack.label")}
                style={["clipped", "la-bckg-secondary", "-flex1", "-overflowhidden"]}

                uuid={actor.uuid}
                flowClass={FlowClass.Standard}
                flowType={"TechAttack"}

                tooltip={getLocalized("LA.flow.rollTechAttack.tooltip")}
                tooltipDirection={TooltipDirection.UP}
            />
            <FlowButton
                text={getLocalized("LA.flow.extinguish.label")}
                style={["clipped", "la-bckg-secondary", "-flex1", "-overflowhidden"]}

                uuid={actor.uuid}
                flowClass={FlowClass.Standard}
                flowType={"Burn"}

                tooltipHeader={getLocalized("LA.action.endofturn.label")}
                tooltip={getLocalized("LA.flow.extinguish.tooltip")}
                tooltipDirection={TooltipDirection.UP}
            />
        </div>
    </HeaderMain>

    {#snippet headerOptions()}
    <CollapseAllButton
        collapseID={activeEffectsCollID}
    />
    {/snippet}
    <HeaderMain 
        text={getLocalized("LA.tab.status.effects.label")}
        headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
        textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
        borderStyle={["la-bckg-card", "la-brdr-transparent", "clipped-bot-alt"]}

        collapseID={activeEffectsCollID}
        startCollapsed={false}

        headerContent={headerOptions}
    >
        <ActiveEffects {...props} />
    </HeaderMain>
</div>