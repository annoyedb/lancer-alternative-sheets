<script lang="ts">
    import type { TemplateProps } from "@/interfaces/npc/TemplateProps";
    import { getLocalized } from "@/scripts/helpers";

    const {
        uuid,
        name,
        path,
    }: TemplateProps = $props();
</script>

<div class="
        click-open ref set"
    data-uuid={uuid}
>
    <span class="-upper -fontsize2">{name}</span>
    <button type="button" 
        class="fas fa-edit -fontsize0 -positionabsolute
            lancer-context-menu"
        data-path={path}
        aria-label={getLocalized("LA.edit.label")}
    ></button>
</div>