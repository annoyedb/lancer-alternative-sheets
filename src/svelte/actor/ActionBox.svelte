<script lang="ts">
    import type { ActionBoxProps } from "@/interfaces/actor/ActionBoxProps";
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { ACTIVATION_COLOR_MAP, ACTIVATION_ICON_MAP, ACTIVATION_LOCALIZE_MAP, ACTIVATION_TOOLTIP_LOCALIZE_MAP } from "@/scripts/constants";
    import { getLocalized } from "@/scripts/helpers";
    import { slugify } from "@/scripts/lancer/util/lid";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";
    import EffectBox from "@/svelte/actor/EffectBox.svelte";
    import HeaderQuinary from "@/svelte/actor/header/HeaderQuinary.svelte";
    import EffectButton from "@/svelte/actor/button/EffectButton.svelte";
    import { H2_ICON_SIZE } from "@/svelte/actor/header/HeaderSecondary.svelte";

    const {
        children,
        flowButton,

        actions,
        path,
        uuid,

        editable,
        editDetails,
        collapseID,
        startCollapsed,

        onClick,
        disableLeftButton,
    }: ActionBoxProps = $props();

    let defaultPlaceholder = getLocalized("LA.placeholder");
    
    function getActivationClass(activation: string): string 
    {
        return `activation-${slugify(activation, "-")}`;
    }

    function getActivationName(activation: string): string 
    {
        return `${getLocalized("LA.use.label")} ${getLocalized(ACTIVATION_LOCALIZE_MAP[activation])}`;
    }

    function getReactionTooltip(action: any): string 
    {
        if (action.trigger)
            return `
                ${getLocalized("LA.trigger.label")}: ${action.trigger}
                <br><br>
                ${getLocalized("LA.mech.system.effect.label")}: ${action.detail}
                <br><br>
                ${getLocalized(ACTIVATION_TOOLTIP_LOCALIZE_MAP[action.activation])}`;
        else
            return `${action.detail}<br><br>${getLocalized(ACTIVATION_TOOLTIP_LOCALIZE_MAP[action.activation])}`;
    }

    //@ts-ignore
    function log(any: any)
    {
        console.log(any);
    }
</script>

{#if actions.length > 0}
{#each actions as action, index}
{#snippet defaultFlowButton()}
    <FlowButton
        text={getActivationName(action.activation)}
        flowClass={action && uuid && path 
            ? `${FlowClass.CoreActivation} ${getActivationClass(action.activation)}`
            : getActivationClass(action.activation)
        }
        tooltipHeader={getLocalized(ACTIVATION_LOCALIZE_MAP[action.activation]).toUpperCase()}
        tooltip={getLocalized(ACTIVATION_TOOLTIP_LOCALIZE_MAP[action.activation])}
        tooltipDirection={undefined}
        uuid={uuid}
        path={`${path}.${index}`}
        style={["clipped-bot", ACTIVATION_COLOR_MAP[action.activation]]}
    />
{/snippet}
{#snippet outercontent()}    
    {#if flowButton}
        {@render flowButton()}
    {/if}
{/snippet}
{#snippet headerQuinaryRightOptions()}
    <!-- TODO: test edit actions -->
    {#if editable}
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
{/snippet}
{#snippet headerQuinaryLeftOptions()}
    <EffectButton
        iconStyle={[H2_ICON_SIZE, ACTIVATION_ICON_MAP[action.activation]]}

        flowClass={action && uuid && path 
            ? `${FlowClass.CoreActivation} ${getActivationClass(action.activation)}`
            : getActivationClass(action.activation)
        }
        uuid={uuid}
        path={`${path}.${index}`}
        onClick={onClick ? (event) => onClick(event, action) : undefined}

        tooltipHeader={getLocalized(ACTIVATION_LOCALIZE_MAP[action.activation]).toUpperCase()}
        tooltip={getReactionTooltip(action)}
        tooltipDirection={TooltipDirection.LEFT}

        disabled={disableLeftButton}
    />    
{/snippet}
    <HeaderQuinary
        text={action.name}
        headerStyle={[ACTIVATION_COLOR_MAP[action.activation], "-padding0-l"]}
        
        uuid={uuid}
        path={`${path}.${index}`}
        collapseID={collapseID}
        startCollapsed={startCollapsed}

        headerContentLeft={headerQuinaryLeftOptions}
        headerContentRight={headerQuinaryRightOptions}
        renderOutsideCollapse={outercontent}
    >    
    <!-- Action Box Content -->
    {#if action.trigger}
        <div class="-fontsize1">
            <div class="la-divider-h la-bckg-primary -margin0-tb -margin2-b"></div>
            <!-- Trigger -->
            <EffectBox
                name={getLocalized("LA.trigger.label")}
                outerStyle={["-bordersround"]}
            >
            {#if !collapseID}
                {@render defaultFlowButton()}
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
        {#if children}
            {@render children()}
        {/if}
        </div>
    {:else}
        <div class="-fontsize1">
            <div class="la-divider-h la-bckg-primary -margin0-tb -margin2-b"></div>
            {#if !collapseID}
                {@render defaultFlowButton()}
                <hr class="-widthfull">
            {/if}
            <EffectBox
                name={getLocalized(ACTIVATION_LOCALIZE_MAP[action.activation])}
                outerStyle={["-bordersround"]}
            >
                {@html action.detail || defaultPlaceholder}
            </EffectBox>
        {#if children}
            {@render children()}
        {/if}
        </div>
    {/if}
    <!-- The original source reference opened the potential for tags to appear here,
        but official Lancer data does not have tags for IActionData 
    -->
    </HeaderQuinary>
{/each}
{/if}