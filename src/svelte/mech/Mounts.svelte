<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/mech/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import { MOUNT_LOCALIZE_MAP } from "@/scripts/constants";
    import HeaderMain from "@/svelte/actor/HeaderMain.svelte";
    import Weapon from "@/svelte/mech/Weapon.svelte";

    const props: MechSheetProps = $props();  
    const {
        actor,
        collapse,
        system,
    } = props;

    let weaponMounts = system.loadout.weapon_mounts;
    
    function getCollapseID(index: number)
    {
        return `${actor.uuid}_mount_${index}`;
    }

    function aggregateMountWeaponNames(mount: any)
    {
        let names = mount.slots.map((slot: any) => slot.weapon?.value.name);
        return names.filter((name: any) => name !== undefined);
    }
</script>

{#if system.loadout.frame && weaponMounts.length}
{#each weaponMounts as mount, index}
    <HeaderMain
        title={getLocalized(MOUNT_LOCALIZE_MAP[mount.type])}
        headerStyle={["la-bckg-primary", "clipped-top", "-padding0-tb", "-padding3-lr"]}
        headerFontStyle={["la-text-header", "-fontsize2"]}
        borderStyle={["la-brdr-primary"]}

        collapse={collapse}
        collapseID={getCollapseID(index)}
        startCollapsed={true}
        
        mountOption={true}
        mountNames={aggregateMountWeaponNames(mount)}

        collapseAllOption={true}
    >
    {#if mount.bracing}
        <details class="la-details -widthfull la-combine-v">
            <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-repcap la-text-header -padding1-l -widthfull">
                <div class="la-left la-combine-h">
                    <i class="la-icon mdi mdi-card-off-outline -fontsize2 -margin1-lr"></i>
                    <span class="la-name__span -fontsize2">{getLocalized("LA.mech.mount.locked.label")}</span>
                </div>
            </summary>
            <div class="la-details__wrapper -bordersround -bordersoff">
                <div class="la-warn__span la-details__span la-text-repcap -padding3 -fontsize3 -textaligncenter -widthfull">{getLocalized("LA.mech.system.empty.subLabel")}</div>
            </div>
        </details>
    {:else}
        <div class="la-combine-v -gap0 -widthfull">
            <Weapon
                mount={mount}
                mountIndex={index}
                collapse={collapse}
            />
        </div>
    {/if}
    </HeaderMain>
{/each}
{/if}