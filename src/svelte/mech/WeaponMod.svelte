<script lang="ts">
    import type { WeaponModProps } from "@/interfaces/mech/WeaponModProps";

    import { getLocalized } from "@/scripts/helpers";
    import { getMechSheetTooltipEnabled } from "@/scripts/mech/settings";
    import { getCSSDocumentTheme } from "@/scripts/theme";

    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { CounterBoxType } from "@/enums/CounterBoxType";
    import { AcceptType } from "@/enums/AcceptType";

    import HeaderSecondary, { H2_HEADER_STYLE, H2_TEXT_SIZE } from "@/svelte/shared/header/HeaderSecondary.svelte";
    import RangeArray from "@/svelte/shared/RangeArray.svelte";
    import DamageArray from "@/svelte/shared/DamageArray.svelte";
    import TagArray from "@/svelte/shared/TagArray.svelte";
    import CounterBox from "@/svelte/shared/counter/CounterBox.svelte";
    import EffectBox from "@/svelte/shared/EffectBox.svelte";
    import ActionBox from "@/svelte/shared/ActionBox.svelte";
    import BonusBox from "@/svelte/shared/BonusBox.svelte";
    import TotalSP from "@/svelte/shared/decoration/TotalSP.svelte";
    import GlyphButton from "@/svelte/shared/button/GlyphButton.svelte";
    import FlowButton from "@/svelte/shared/button/FlowButton.svelte";
    import EffectButton from "@/svelte/shared/button/EffectButton.svelte";
    import LimitedBox from "@/svelte/shared/counter/LimitedBox.svelte";
    import EmptyBox from "@/svelte/shared/EmptyBox.svelte";
    import { H2_BUTTON_ICON_STYLE } from "@/svelte/shared/button/Button.svelte";

    const {
        actor,
        mod,
        path,
    }: WeaponModProps = $props();
    let effectButtonHover = $state(false);
    let editButtonHover = $state(false);

    const collID = mod ? `${mod.uuid}.action` : "empty";
    const tooltipEnabled = getMechSheetTooltipEnabled();
    const qualityMode = true; // TODO: change to a setting
</script>

{#if mod}
    {#snippet headerSecondaryLeftOptions()}
    <EffectButton
        iconStyle={["cci cci-weaponmod -fontsize7"]}
        iconBackgroundStyle={[
            "-fontsize7 la-prmy-secondary", 
            qualityMode ? "-pulse-prmy" : "la-text-scrollbar-secondary"
        ]}

        flowClass={FlowClass.SendEffectToChat}
        path={path}

        tooltipEnabled={tooltipEnabled}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltipDirection={TooltipDirection.LEFT}
        tooltip={mod.system.effect || getLocalized("LA.mech.mod.effect.tooltip")}
        logText={getLocalized("LA.mech.mod.effect.tooltip")}
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}

        onPointerEnter={() => {effectButtonHover = true;}}
        onPointerLeave={() => {effectButtonHover = false;}}
    />
    {/snippet}

    {#snippet headerSecondaryRightOptions()}
    <TotalSP
        value={mod.system.sp}
        style={[H2_TEXT_SIZE, "-margin1-r"]}

        logText={getLocalized("LA.mech.system.points.tooltip")}
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}
    />
    <!-- Edit -->
    <GlyphButton
        style={[H2_BUTTON_ICON_STYLE]}
        flowClass={FlowClass.ContextMenu}
        path={path}

        tooltipEnabled={tooltipEnabled}
        tooltipDirection={TooltipDirection.UP}
        tooltipTheme={getCSSDocumentTheme(actor.uuid)}
        tooltip={getLocalized("LA.edit.tooltip")}
        logText={getLocalized("LA.edit.tooltip")}
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}

        onPointerEnter={() => {editButtonHover = true;} }
        onPointerLeave={() => {editButtonHover = false;} }
    >
        <i class="fas fa-ellipsis-v"></i>
    </GlyphButton>
    {/snippet}

    {#snippet outerContent()}
        {#if !!(mod.system.uses.max || mod.system.counters.length)}
            <div class="la-flexcol -gap0 -widthfull">
            <!-- Limited Use -->
            {#if mod.system.uses.max}
                <div class="la-flexrow clipped-alt la-bckg-header-anti -widthfull -margin2-l">
                    <LimitedBox
                        usesValue={mod.system.uses.value}
                        usesMax={mod.system.uses.max}
                        path={path}
                        
                        logType={TextLogHook.MechHeader}
                        logTypeReset={TextLogHook.MechHeaderReset}
                    />
                </div>
            {/if}
            <!-- Counters -->
            {#if mod.system.counters.length}
            {#each mod.system.counters as counter, index}
                <CounterBox
                    text={counter.name}
                    type={CounterBoxType.Counter}
                    usesValue={counter.value}
                    usesMax={counter.max}
                    path="{path}.system.counters.{index}"
            
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}
                />
            {/each}
            {/if}
            </div>
        {/if}
    {/snippet}

    <HeaderSecondary
        uuid={mod.uuid}
        path={path}
        acceptTypes={"weapon_mod"}

        text={mod.name}
        headerStyle={[H2_HEADER_STYLE, "la-bckg-header-anti"]}
        textStyle={[H2_TEXT_SIZE]}
        borderStyle={["la-brdr-weapon-mod"]}
        extensionTextFunction={() => {
            if (effectButtonHover)
                return `--${getLocalized("LA.use.label")}`;
            if (editButtonHover)
                return `--${getLocalized("LA.edit.extension")}`;
            return undefined;
        }}
        
        collapseID={mod.uuid}
        startCollapsed={true}

        renderOutsideCollapse={outerContent}
        contentLeft={headerSecondaryLeftOptions}
        contentRight={headerSecondaryRightOptions}
    >
        <div class="la-generated -widthfull -gap2 la-flexcol">
        <!-- Generated Content -->
        {#if mod.system.added_range.length || mod.system.added_damage.length}
            <div class="la-flexrow -widthfull">
            {#if mod.system.added_range.length}
                <EffectBox
                    name={getLocalized("LA.mech.mod.range.label")}
                    innerStyle={["-fontsize5"]}
                    outerStyle={mod.system.added_range.length && mod.system.added_damage.length ? ["-bordersround"] : []}

                    tooltipEnabled={tooltipEnabled}
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}
                >
                    <RangeArray
                        ranges={mod.system.added_range}
                    />
                </EffectBox>
            {/if}
            {#if mod.system.added_damage.length}
                <EffectBox
                    name={getLocalized("LA.mech.mod.damage.label")}
                    innerStyle={["-fontsize5"]}

                    tooltipEnabled={tooltipEnabled}
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}
                >
                    <DamageArray
                        damages={mod.system.added_damage}
                    />
                </EffectBox>
            {/if}
            </div>
        {/if}
            <BonusBox
                bonuses={mod.system.bonuses}
                bonusPath={`${path}.system.bonuses`}
            />
            <EffectBox
                name={getLocalized("LA.mech.mod.tags.label")}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            >
                <TagArray
                    tags={mod.system.added_tags}
                    path={`${path}.system.added_tags`}
                />
                <TagArray
                    tags={mod.system.tags}
                    path={`${path}.system.tags`}
                />
            </EffectBox>
            <EffectBox
                name={getLocalized("LA.mech.mod.effect.label")}

                tooltipEnabled={tooltipEnabled}
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            >
                <FlowButton
                    style={["clipped-bot la-bckg-secondary"]}
                    text={getLocalized("LA.use.label")}

                    flowClass={FlowClass.SendEffectToChat}

                    tooltipEnabled={tooltipEnabled}
                    tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                    logType={TextLogHook.MechHeader}
                    logTypeReset={TextLogHook.MechHeaderReset}
                />
                <hr>
                {@html mod.system.effect}
            </EffectBox>
            <ActionBox
                actions={mod.system.actions}
                uuid={mod.uuid}
                path={`system.actions`}

                collapseID={collID}
                startCollapsed={false}

                tooltipEnabled={tooltipEnabled}
                tooltipTheme={getCSSDocumentTheme(actor.uuid)}
                logType={TextLogHook.MechHeader}
                logTypeReset={TextLogHook.MechHeaderReset}
            />
        </div>
    </HeaderSecondary>
{:else}
    <EmptyBox
        label={getLocalized("LA.mech.mod.empty.label")}
        subLabel={getLocalized("LA.mech.mod.empty.subLabel")}
        type={AcceptType.MechWeaponMod}
        path={path}
    />
{/if}