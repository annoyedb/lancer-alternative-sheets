<script lang="ts">
    import type { WeaponModProps } from "@/interfaces/mech/WeaponModProps";
    import { getLocalized } from "@/scripts/helpers";
    import HeaderSecondary from "@/svelte/actor/header/HeaderSecondary.svelte";
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";
    import RangeArray from "@/svelte/actor/RangeArray.svelte";
    import DamageArray from "@/svelte/actor/DamageArray.svelte";
    import TagArray from "@/svelte/actor/TagArray.svelte";
    import CounterBox from "@/svelte/actor/CounterBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import BonusBox from "@/svelte/actor/BonusBox.svelte";
    import { FlowClass } from "@/enums/FlowClass";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";

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
    <HeaderSecondary
        title={mod.name}
        headerStyle={["la-bckg-pilot", "clipped-bot-alt", "-padding0", "la-text-header", "-padding3-r"]}
        headerFontStyle={["-fontsize2"]}
        headerIconStyle={["cci", "cci-weaponmod", "-fontsize5", "-lineheight3", "-glow-primary-hover", "-glow-header"]}
        
        uuid={mod.uuid}
        path={path}
        acceptTypes={"weapon_mod"}
        collapse={collapse}
        collapseID={mod.uuid}
        startCollapsed={false}
        
        spOption={true}
        spValue={mod.system.sp}
        spTextStyle={["-fontsize2"]}
        spIconStyle={["-fontsize5", "-lineheight3", "-padding3-r"]}

        editOption={true}
        editIconStyle={["-lineheight3"]}

        useEffectOption={true}
        useEffectTooltip={mod.system.effect || getLocalized("LA.mech.mod.effect.tooltip")}
        useEffectTooltipDirection={"LEFT"}
        useEffectBackgroundStyle={["-fontsize5", "-lineheight3", "la-text-scrollbar-secondary", "-padding0-l"]}
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
                    flowClass={FlowClass.SendToChatEffect}
                    textStyle={["clipped-bot", "la-bckg-secondary"]}
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