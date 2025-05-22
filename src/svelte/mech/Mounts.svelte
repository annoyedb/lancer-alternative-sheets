<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { MOUNT_LOCALIZE_MAP } from "@/scripts/constants";
    import { getMechSheetTooltipEnabled } from "@/scripts/mech/settings";
    import { TextLogHook } from "@/enums/TextLogHook";
    import HeaderMain, { MAIN_HEADER_STYLE } from "@/svelte/actor/header/HeaderMain.svelte";
    import Weapon from "@/svelte/mech/Weapon.svelte";
    import CollapseAllButton from "@/svelte/actor/button/CollapseAllButton.svelte";
    import MountNames from "@/svelte/actor/decoration/MountNames.svelte";
    import EmptyBox from "@/svelte/actor/EmptyBox.svelte";

    const props: MechSheetProps = $props();  
    const {
        actor,
        system,
    } = props;
    let collapseAllButtonHover = $state(false);

    const tooltipEnabled = getMechSheetTooltipEnabled();
    const weaponMounts = system.loadout.weapon_mounts;
    
    function getCollapseID(index: number)
    {
        return `${actor.uuid}.mount.${index}`;
    }

    function aggregateMountWeaponNames(mount: any)
    {
        let names = mount.slots.map((slot: any) => slot.weapon?.value.name);
        return names.filter((name: any) => name !== undefined);
    }
</script>

{#if system.loadout.frame && weaponMounts.length}
{#each weaponMounts as mount, index}
    {#snippet headerOptions()}
    <MountNames
        mountNames={aggregateMountWeaponNames(mount)}

        logText={getLocalized("LA.mech.mount.preview.tooltip")}
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}
    />
    <CollapseAllButton
        collapseID={getCollapseID(index)}
        tooltipEnabled={tooltipEnabled}
        logType={TextLogHook.MechHeader}
        logTypeReset={TextLogHook.MechHeaderReset}

        onPointerEnter={() => {collapseAllButtonHover = true;}}
        onPointerLeave={() => {collapseAllButtonHover = false;}}
    />
    {/snippet}
    <HeaderMain 
        text={getLocalized(MOUNT_LOCALIZE_MAP[mount.type])}
        headerStyle={[MAIN_HEADER_STYLE, "la-bckg-primary"]}
        textStyle={["la-text-header", "-fontsize2", "-overflowhidden"]}
        borderStyle={["la-brdr-primary"]}
        extensionTextFunction={() => {
            if (collapseAllButtonHover)
                return `--${getLocalized("LA.collapseAll.extension")}`;
            return undefined;
        }}

        collapseID={getCollapseID(index)}
        startCollapsed={true}

        headerContent={headerOptions}
    >
    {#if mount.bracing}
        <EmptyBox
            label={getLocalized("LA.mech.mount.locked.label")}
            subLabel={getLocalized("LA.mech.mount.locked.subLabel")}
        />
    {:else}
        <div class="la-combine-v -gap0 -widthfull">
            <Weapon
                mount={mount}
                mountIndex={index}
            />
        </div>
    {/if}
    </HeaderMain>
{/each}
{/if}