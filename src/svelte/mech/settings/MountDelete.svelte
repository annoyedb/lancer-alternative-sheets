<script lang="ts">
    import { MOUNT_LOCALIZE_MAP } from "@/scripts/constants";
    import { getLocalized } from "@/scripts/helpers";
    import { handleMountDelete } from "@/scripts/advanced-mech-sheet";

    const {
        actorSheet,
        mount,
        mountIndex, // depends on mountIndices which changes, do not assume it's always the true index for path
        mountIndices,
    } = $props();

    function deleteMount(event: MouseEvent)
    {
        event.stopPropagation();
        handleMountDelete(
            event.currentTarget as HTMLButtonElement, 
            actorSheet,
            callback
        );
    }

    function callback(button: JQuery<HTMLButtonElement>)
    {
        // Deletion is handled by Lancer system, but buttons here are outside the sheet,
        // so delete and shift `data-path` attributes down by 1
        const parent = button.parent();
        if (parent.length)
        {
            const buttons = parent.find('button');
            const index = buttons.index(button);
            for (let i = index; i < buttons.length; i++) 
            {
                mountIndices[i] = mountIndices[i] - 1;   
            }
            button.css('display', 'none');
        }
    }
</script>

<!-- (#5*) -->
<button type="button"
    class="lancer-bckg-secondary lancer-text-light -fontsize1 -letterspacing0
        gen-control"
    data-action={"splice"}
    data-path={`system.loadout.weapon_mounts.${mountIndex}`}
    onclick={event => deleteMount(event)}
>
    {getLocalized(MOUNT_LOCALIZE_MAP[mount.type])}
    <i class="mdi mdi-close-circle-outline -positionabsolute -left2 -fontsize2"></i>
</button>