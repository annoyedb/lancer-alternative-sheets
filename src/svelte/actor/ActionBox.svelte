<script lang="ts">
    import { collapseID as registerCollapse } from "@/scripts/lancer/helpers/collapse";
    import { FlowClass } from "@/enums/FlowClass";
    import type { ActionBoxProps } from "@/interfaces/actor/ActionBoxProps";
    import { ACTIVATION_COLOR_MAP, ACTIVATION_ICON_MAP, ACTIVATION_LOCALIZE_MAP, ACTIVATION_TOOLTIP_LOCALIZE_MAP } from "@/scripts/constants";
    import { getLocalized } from "@/scripts/helpers";
    import { slugify } from "@/scripts/lancer/util/lid";
    import FlowButton from "@/svelte/actor/FlowButton.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";

    const {
        actions,
        path,
        uuid,
        edit,
        editDetails,
        collapse,
        collapseID,
        startCollapsed
    }: ActionBoxProps = $props();

    let collapsing = collapse && collapseID;
    let collapsed = collapsing && startCollapsed ? "collapsed" : "";
    let defaultPlaceholder = getLocalized("LA.placeholder");
    
    function getActivationClass(activation: string): string 
    {
        return `activation-${slugify(activation, "-")}`;
    }

    function getActivationName(activation: string): string 
    {
        return `${getLocalized("LA.use.label")} ${getLocalized(ACTIVATION_LOCALIZE_MAP[activation])}`;
    }
    //@ts-ignore
    function log(any: any)
    {
        console.log(any);
    }
</script>

{#if actions.length > 0}
{#each actions as action, index}
{#snippet flowButton()}
    <FlowButton
        name={getActivationName(action.activation)}
        flowClass={action && uuid && path 
            ? `${FlowClass.Activation} ${getActivationClass(action.activation)}`
            : getActivationClass(action.activation)
        }
        tooltipHeader={getLocalized(ACTIVATION_LOCALIZE_MAP[action.activation]).toUpperCase()}
        tooltip={`${getLocalized(ACTIVATION_TOOLTIP_LOCALIZE_MAP[action.activation])}`}
        tooltipDirection={"LEFT"}
        uuid={uuid}
        dataPath={`${path}.${index}`}
        style={["clipped-bot", ACTIVATION_COLOR_MAP[action.activation]]}
    />
{/snippet}
    <!-- Action Array -->
    <div class="la-collapsegroup la-combine-v la-effectbox la-bckg-card la-brdr-repcap -largeheader -bordersround-ltb -widthfull -bordersround">
        <div class="la-actionheader la-combine-h la-bckg-secondary la-text-header clipped -padding0
                {collapsing ? "collapse-trigger" : ""}"
            data-la-collapse-id={collapsing ? registerCollapse(collapse, collapseID, false) : ""}
        >
            <i class="cci {ACTIVATION_ICON_MAP[action.activation]} -height3 -lineheight3 -fontsize5 -flexthird"></i>
            <span class="-fontsize2 -flexthird -textwrapnowrap -textaligncenter"><!--
            --->{action.name?.toUpperCase() ?? getLocalized("LA.placeholder")}<!--
        ---></span>
            <div class="-flexthird la-combine-h -justifyend -height3">
            <!-- TODO: allow edit actions -->
            {#if edit}
                <button type="button"
                    class="la-actionheader__button mdi mdi-pencil -fontsize3" 
                    aria-label={getLocalized("LA.edit.label")}>
                </button>
                <button 
                    class="la-actionheader__button mdi mdi-delete -fontsize3" 
                    data-action="splice"
                    data-uuid={uuid}
                    data-path={path}
                    aria-label={getLocalized("LA.delete.label")}
                >
                </button>
            {/if}
            <!-- ${editor} -->
            </div>
        </div>
        {#if collapsing}
        <div class="-padding0-t -widthfull">
            {@render flowButton()}
        </div>
        {/if}
        <div class="la-collapsegroup__wrapper -widthfull
                {collapsing ? "collapse" : ""} {collapsed}"
            data-la-collapse-id="{collapsing ? registerCollapse(collapse, collapseID, true) : ""}"
        >
        {#if action.trigger}
            <div class="-fontsize1">
                <div class="la-divider-h la-bckg-primary -margin0-tb -margin2-b"></div>
                <!-- Trigger -->
                <EffectBox
                    name={getLocalized("LA.trigger.label")}
                    outerStyle={["-bordersround"]}
                >
                {#if !collapsing}
                    {@render flowButton()}
                    <hr class="-widthfull">
                {/if}
                    {@html action.trigger || defaultPlaceholder}
                </EffectBox>
                <!-- TODO: allow editDetails -->
                <EffectBox
                    name={getLocalized("LA.mech.system.effect.label")}
                    outerStyle={["-bordersround"]}

                    editOption={editDetails}
                    editPath={`${path}.detail`}
                >
                    {@html action.detail || defaultPlaceholder}
                </EffectBox>
            </div>
        {:else}
            <div class="-fontsize1">
                <div class="la-divider-h la-bckg-primary -margin0-tb -margin2-b"></div>
                {#if !collapsing}
                    {@render flowButton()}
                    <hr class="-widthfull">
                {/if}
                <EffectBox
                    name={getLocalized(ACTIVATION_LOCALIZE_MAP[action.activation])}
                    outerStyle={["-bordersround"]}
                >
                    {@html action.detail || defaultPlaceholder}
                </EffectBox>
            </div>
        {/if}
    <!-- The original source reference opened the potential for tags to appear here,
        but official Lancer data does not have tags for IActionData 
    --></div>
    </div>
{/each}
{/if}