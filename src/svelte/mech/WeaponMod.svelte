<script lang="ts">
    import type { WeaponModProps } from "@/interfaces/mech/WeaponModProps";
    import { getLocalized } from "@/scripts/helpers";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import HeaderSecondary, { H2_HEADER_STYLE, H2_TEXT_SIZE } from "@/svelte/actor/header/HeaderSecondary.svelte";
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";
    import RangeArray from "@/svelte/actor/RangeArray.svelte";
    import DamageArray from "@/svelte/actor/DamageArray.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";
    import CounterBox from "@/svelte/actor/CounterBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import BonusBox from "@/svelte/actor/BonusBox.svelte";
    import TotalSp from "@/svelte/actor/decoration/TotalSP.svelte";
    import EditButton from "@/svelte/actor/button/EditButton.svelte";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";
    import EffectButton from "@/svelte/actor/button/EffectButton.svelte";

    const {
        collapse,
        mod,
        path,
    }: WeaponModProps = $props();

    let collID = mod ? `${mod.uuid}_action` : "empty";

    //@ts-ignore
    function log(any: any)
    {
        console.log(any);
    }

</script>

{#if mod}
    {#snippet headerSecondaryLeftOptions()}
    <EffectButton
        iconStyle={["cci", "cci-weaponmod", "-fontsize5"]}

        flowClass={FlowClass.SendEffectToChat}
        path={path}

        tooltip={mod.system.effect || getLocalized("LA.mech.mod.effect.tooltip")}
        tooltipDirection={TooltipDirection.LEFT}
    />
    {/snippet}

    {#snippet headerSecondaryRightOptions()}
    <TotalSp
        value={mod.system.sp}
        style={[H2_TEXT_SIZE, "-margin1-r"]}
        tooltip={getLocalized("LA.mech.system.points.tooltip")}
    />
    <EditButton
        flowClass={FlowClass.ContextMenu}
        path={path}
    />
    {/snippet}

    <HeaderSecondary
        uuid={mod.uuid}
        path={path}
        acceptTypes={"weapon_mod"}
        text={mod.name}
        headerStyle={[H2_HEADER_STYLE, "la-bckg-header-anti"]}
        textStyle={[H2_TEXT_SIZE]}
        
        collapseID={mod.uuid}
        startCollapsed={false}

        headerContentLeft={headerSecondaryLeftOptions}
        headerContentRight={headerSecondaryRightOptions}
    >
        <div class="la-generated -widthfull -gap2 la-combine-v">
            <!-- Generated Content -->
        {#if !!(mod.system.uses.max || mod.system.counters.length)}
            <div class="la-combine-h">
            {#if mod.system.uses.max}
                <div class="la-combine-h clipped-alt la-bckg-header-anti -widthfull -margin2-l">
                    <LimitedBox
                        usesValue={mod.system.uses.value}
                        usesMax={mod.system.uses.max}
                        path={path}
                    />
                </div>
            {/if}
            {#if mod.system.counters.length}
            {#each mod.system.counters as counter, index}
                <CounterBox
                    name={counter.name}
                    usesValue={counter.value}
                    usesMax={counter.max}
                    path={`${path}.system.counters.${index}`}
                />
            {/each}
            {/if}
            </div>
        {/if}
        {#if mod.system.added_range.length || mod.system.added_damage.length}
            <div class="la-combine-h -widthfull">
            {#if mod.system.added_range.length}
                <EffectBox
                    name={getLocalized("LA.mech.mod.range.label")}
                    innerStyle={["-fontsize3"]}
                    outerStyle={mod.system.added_range.length && mod.system.added_damage.length ? ["-bordersround"] : []}
                >
                    <RangeArray
                        ranges={mod.system.added_range}
                    />
                </EffectBox>
            {/if}
            {#if mod.system.added_damage.length}
                <EffectBox
                    name={getLocalized("LA.mech.mod.damage.label")}
                    innerStyle={["-fontsize3"]}
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
            >
                <FlowButton
                    text={getLocalized("LA.use.label")}
                    flowClass={FlowClass.SendEffectToChat}
                />
                <hr>
                {@html mod.system.effect}
            </EffectBox>
            <ActionBox
                actions={mod.system.actions}
                uuid={mod.uuid}
                path={`system.actions`}
                collapse={collapse}
                collapseID={collID}
                startCollapsed={false}
            />
        </div>
    </HeaderSecondary>
{:else}
    <details class="la-details -widthfull la-combine-v
            ref set drop-settable weapon_mod"
        data-accept-types="weapon_mod"
        data-path={path}>
        <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1-l -widthfull">
            <div class="la-left la-combine-h">
                <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
                <span class="la-name__span -fontsize2">{getLocalized("LA.mech.mod.empty.label")}</span>
            </div>
        </summary>
        <div class="la-details__wrapper -bordersround -bordersoff">
            <div class="la-warn__span la-details__span la-text-repcap -padding3 -fontsize3 -textaligncenter -widthfull">{getLocalized("LA.mech.mod.empty.subLabel")}</div>
        </div>
    </details>
{/if}