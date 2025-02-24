<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/actor/MechSheetProps";
    import { SYSTEM_ICON_MAP, SYSTEM_LOCALIZE_MAP } from "@/scripts/constants";
    import { getLocalized } from "@/scripts/helpers";
    import HeaderMain from "@/svelte/actor/HeaderMain.svelte";
    import HeaderTertiary from "@/svelte/actor/HeaderTertiary.svelte";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import DeployableBox from "@/svelte/actor/DeployableBox.svelte";
    import BonusBox from "@/svelte/actor/BonusBox.svelte";
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";

    const props: MechSheetProps = $props();  
    const {
        actor,
        collapse,
        system,
    } = props;

    // Unlinking leaves an array with null values; unsure if it's intended but it specifically breaks this sheet, and doesn't seem intended
    let systemComponents = system.loadout.systems.filter((item: any) => item !== null);
    let collID = systemComponents.length
        ? `${actor.uuid}_system`
        : `${actor.uuid}_systemempty`;

    function getDestroyed(component: any)
    {
        return component.value.system.destroyed;
    }

    function getTitleStyle(component: any)
    {
        return getDestroyed(component)
            ? "la-text-repcap -strikethrough"
            : "la-text-header";
    }

    function getSubtitleStyle(component: any)
    {
        return getDestroyed(component)
            ? "la-text-error horus--very--subtle"
            : "la-text-header";
    }

    function getIconStyle(component: any)
    {
        let icon = SYSTEM_ICON_MAP[component.value.system.type] || "cci-system";
        return getDestroyed(component)
            ? `cci ${icon} la-text-repcap`
            : `cci ${icon}`;
    }

    function getSPStyle(component: any)
    {
        return getDestroyed(component)
            ? "la-text-repcap"
            : "la-text-header";
    }

    function getSubtitle(component: any)
    {
        return getDestroyed(component)
            ? getLocalized("LA.mech.system.destroyed.label")
            : getLocalized(SYSTEM_LOCALIZE_MAP[component.value.system.type]) || getLocalized("LA.mech.system.system.label");
    }

    
</script>

{#if system.loadout.frame}
<HeaderMain
    title={getLocalized("LA.mech.system.label")}
    headerStyle={["la-bckg-system", "clipped-top", "-padding0-tb", "-padding3-lr"]}
    headerFontStyle={["la-text-header", "-fontsize2"]}
    borderStyle={["la-brdr-system"]}
    collapse={collapse}
    collapseID={collID}
    startCollapsed={true}
    spOption={true}
    spCurrent={system.loadout.sp.value}
    spMax={system.loadout.sp.max}
    spTextStyle={["la-text-header", "-fontsize2"]}
    spIconStyle={["la-text-header", "-fontsize5", "-lineheight3", "-width3"]}
>
{#if systemComponents.length}
{#each systemComponents as component, index}
    <HeaderTertiary
        itemID={component.value.uuid}
        uuid={component.value.uuid}
        path={`system.loadout.systems.${index}.value`}
        acceptTypes={"mech_system"}

        title={component.value.name}
        headerStyle={["la-bckg-pilot", "clipped-bot-alt", "-padding0-tb", "la-text-header"]}
        headerFontStyle={[getTitleStyle(component), "-fontsize3"]}

        subTitle={getSubtitle(component)}
        subHeaderFontStyle={[getSubtitleStyle(component), "-fontsize0"]}
        iconStyle={[getIconStyle(component), "-fontsize6", "-lineheight8"]}

        borderStyle={["-borderoff"]}

        collapse={collapse}
        collapseID={component?.value.uuid}

        spOption={true}
        spValue={component.value.system.sp}
        spTextStyle={[getSPStyle(component), "-fontsize2"]}
        spIconStyle={[getSPStyle(component), "-fontsize5"]}

        messageOption={true}
        messageIconStyle={["-lineheight0"]}
        editOption={true}
        editIconStyle={["-lineheight0"]}
    >
    {#if !getDestroyed(component)}
        <div class="la-generated -widthfull -gap1 la-combine-v">
            <LimitedBox
                usesValue={component.value.system.uses.value}
                usesMax={component.value.system.uses.max}
                path={`system.loadout.systems.${index}.value`}
            />
            <BonusBox
                bonuses={component.value.system.bonuses}
                bonusPath={`system.loadout.systems.${index}.value.system.bonuses`}
            />
            <EffectBox
                name={getLocalized("LA.mech.system.effect.label")}
                effect={component.value.system.effect}
            />
            <ActionBox
                uuid={component.value.uuid}
                actions={component.value.system.actions}
                path={`system.actions`}
            />
            <DeployableBox
                source={actor}
                lidSource={component.value.system}
            />
        </div>
    {/if}
    </HeaderTertiary>
{/each}
{:else}
    <details class="la-details -widthfull la-combine-v
            ref set drop-settable mech_system"
        data-accept-types="mech_system"
        data-path="system.loadout.systems">
        <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1-l">
            <div class="la-left la-combine-h">
                <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
                <span class="la-name__span -fontsize2">{getLocalized("LA.mech.system.empty.label")}</span>
            </div>
        </summary>
        <div class="la-details-wrapper -borderoff">
            <span class="la-warn__span la-details__span la-text-repcap la-locked -fontsize3">{getLocalized("LA.mech.system.empty.subLabel")}</span>
        </div>
    </details>
{/if}
</HeaderMain>
{/if}