<script lang="ts">
    import type { WeaponModProps } from "@/interfaces/actor/WeaponModProps";
    import { getLocalized } from "@/scripts/helpers";
    import HeaderSecondary from "@/svelte/actor/HeaderSecondary.svelte";
    import LimitedBox from "@/svelte/actor/LimitedBox.svelte";

    const {
        collapse,
        mod,
        path,
    }: WeaponModProps = $props();

    console.log(mod?.system.sp, mod?.uuid, mod?.name);
</script>

{#if mod}
    <HeaderSecondary
        title={mod.name}
        rootStyle={["ref", "set", "drop-settable", "weapon_mod"]}
        headerStyle={["la-bckg-pilot", "clipped-bot-alt", "-padding0", "la-text-header", "-padding3-r"]}
        headerFontStyle={["-fontsize2"]}
        headerIconStyle={["cci", "cci-weaponmod", "-fontsize5", "-lineheight3"]}
        uuid={mod.uuid}
        path={path}
        acceptTypes={"weapon_mod"}
        collapse={collapse}
        collapseID={mod}
        startCollapsed={false}
        
        spOption={true}
        spValue={mod.system.sp}
        spTextStyle={["-fontsize2"]}
        spIconStyle={["-fontsize5", "-lineheight3", "-padding3-r"]}

        editOption={true}
        editIconStyle={["-lineheight3"]}
    >
    <!-- <div class="la-generated -widthfull -gap1 la-combine-v"> -->
        <!-- Generated Content --> TODO: LEFT OFF HERE
        <LimitedBox
            usesValue={mod.system.uses.value}
            usesMax={mod.system.uses.max}
            path={path}
        />
        <!-- ${resources}
        ${modifiers}
        ${effect}
        ${bonuses}
        ${actions}
    </div>
    ${tags} -->
    </HeaderSecondary>
{:else}
    <details class="la-details -widthfull la-combine-v"
        data-accept-types="weapon_mod"
        data-path={path}>
        <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1-l">
            <div class="la-left la-combine-h">
                <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
                <span class="la-name__span -fontsize2">{getLocalized("LA.mech.mod.empty.label")}</span>
            </div>
        </summary>
        <div class="la-details-wrapper -borderoff">
            <span class="la-warn__span la-details__span la-text-repcap la-locked -fontsize3">{getLocalized("LA.mech.mod.empty.subLabel")}</span>
        </div>
    </details>
{/if}