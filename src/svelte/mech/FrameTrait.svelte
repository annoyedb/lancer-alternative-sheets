<script lang="ts">
    import type { MechSheetProps } from "@/interfaces/actor/MechSheetProps";
    import { getLocalized } from "@/scripts/helpers";
    import ActionBox from "@/svelte/actor/ActionBox.svelte";
    import HeaderSecondary from "@/svelte/actor/HeaderSecondary.svelte";
    import DeployableBox from "../actor/DeployableBox.svelte";

    const {
        actor,
        collapse,
        system,
    }: MechSheetProps = $props();

    let frame: any = system.loadout.frame!.value;

    function getCollapseID(index: number)
    {
        return `${actor.uuid}_${frame.id}_trait_${index}`;
    }
</script>

{#if frame.system.traits.length}
{#each frame.system.traits as trait, index}
<!-- Frame Traits -->
<HeaderSecondary
    title={trait.name}
    headerStyle={["la-bckg-pilot", "clipped-bot-alt", "-justifybetween", "-padding0", "-padding3-r", "la-text-header"]}
    headerIconStyle={["cci", "cci-frame", "-fontsize5", "-lineheight3"]}
    borderStyle={["-borderoff"]}
    collapse={collapse}
    collapseID={getCollapseID(index)}
    messageOption={true}
    messageUUID={frame.uuid}
    messageType="trait"
    messageIndex={index}
    startCollapsed={false}
>
    <div class="la-generated -widthfull -gap1 la-combine-v">
        <span class="la-details-wrapper__span la-effectbox la-bckg-card la-brdr-frame -fontsize1">
            <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0">
                {getLocalized("LA.mech.frame.trait.label")}
            </span>
            {trait.description}
        </span>
        <!-- Generated Content -->
        <ActionBox
            uuid={frame.uuid}
            actions={trait.actions}
            actionsPath={`system.traits.${index}.actions`}
        />
        <DeployableBox
            source={actor}
            lidSource={trait}
        />
        <!-- TODO: TAGS -->
    </div>
</HeaderSecondary>
{/each}
{/if}