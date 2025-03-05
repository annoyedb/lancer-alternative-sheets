<script lang="ts">
    import { getLocalized } from "@/scripts/helpers";
    import type { NPCSheetProps } from "@/interfaces/npc/NPCSheetProps";
    import Template from "@/svelte/npc/Template.svelte";
    import Stats from "@/svelte/npc/Stats.svelte";
    import ActiveEffects from "@/svelte/actor/ActiveEffects.svelte";
    import HeaderMain from "@/svelte/actor/HeaderMain.svelte";
    import FlowButton from "@/svelte/actor/FlowButton.svelte";
    import { FlowClass } from "@/enums/FlowClass";

    const props = $props();
    const {
        actor,
        collapse,
        system,
        itemTypes,
    }: NPCSheetProps = props;

    let templates = itemTypes.npc_template;
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
        title={getLocalized("LA.npc.utilities.label")}
        headerStyle={["la-bckg-primary", "clipped-top", "-padding0-tb", "-padding3-lr"]}
        headerFontStyle={["la-text-header", "-fontsize2"]}
        borderStyle={["la-bckg-card", "la-brdr-transparent", "clipped-bot-alt"]}

        collapse={collapse}
        collapseID={`${actor.uuid}_status_activeeffects`}
        startCollapsed={false}
    >
        <FlowButton 
            flowClass={FlowClass.RechargeFeatures}
            name={getLocalized("LA.npc.recharge.label")}
            tooltip={getLocalized("LA.npc.recharge.tooltip")}
            tooltipHeader={getLocalized("LA.action.startofturn.label")}
            tooltipDirection={"UP"}
            style={["clipped", "la-bckg-secondary", "-flex1", "-overflowhidden", "-widthfull", "-margin0-b"]}
        />
        <div class="la-combine-grid -horizontal2 -widthfull -gap0">
            <FlowButton 
                flowClass={FlowClass.Standard}
                name={getLocalized("LA.flow.rollAttack.label")}
                tooltip={getLocalized("LA.flow.rollAttack.tooltip")}
                tooltipDirection={"UP"}
                uuid={actor.uuid}
                flowType="BasicAttack"
                style={["clipped", "la-bckg-secondary", "-flex1", "-overflowhidden"]}
            />
            <FlowButton 
                flowClass={FlowClass.Standard}
                name={getLocalized("LA.flow.rollDamage.label")}
                tooltip={getLocalized("LA.flow.rollDamage.tooltip")}
                tooltipDirection={"UP"}
                uuid={actor.uuid}
                flowType="Damage"
                style={["clipped", "la-bckg-secondary", "-flex1", "-overflowhidden"]}
            />
            <FlowButton 
                flowClass={FlowClass.Standard}
                name={getLocalized("LA.flow.rollTechAttack.label")}
                tooltip={getLocalized("LA.flow.rollTechAttack.tooltip")}
                tooltipDirection={"UP"}
                uuid={actor.uuid}
                flowType="TechAttack"
                style={["clipped", "la-bckg-secondary", "-flex1", "-overflowhidden"]}
            />
            <FlowButton
                name={getLocalized("LA.flow.extinguish.label")}
                uuid={actor.uuid}
                flowClass={FlowClass.Standard}
                tooltipHeader={getLocalized("LA.action.endofturn.label")}
                tooltip={getLocalized("LA.flow.extinguish.tooltip")}
                tooltipDirection={"UP"}
                flowType={"Burn"}
                style={["clipped", "la-bckg-secondary", "-flex1", "-overflowhidden"]}
            />
        </div>
    </HeaderMain>

    <HeaderMain
        title={getLocalized("LA.tab.status.effects.label")}
        headerStyle={["la-bckg-primary", "clipped-top", "-padding0-tb", "-padding3-lr"]}
        headerFontStyle={["la-text-header", "-fontsize2"]}
        borderStyle={["la-bckg-card", "la-brdr-transparent", "clipped-bot-alt"]}

        collapse={collapse}
        collapseID={`${actor.uuid}_status_activeeffects`}
        startCollapsed={false}

        collapseAllOption={true}
        >
        <ActiveEffects {...props} />
    </HeaderMain>
</div>