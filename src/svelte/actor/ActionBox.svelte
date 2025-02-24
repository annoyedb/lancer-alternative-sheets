<script lang="ts">
    import { FlowClass } from "@/enums/FlowClass";
    import type { ActionBoxProps } from "@/interfaces/actor/ActionBoxProps";
    import { ACTIVATION_COLOR_MAP, ACTIVATION_ICON_MAP, ACTIVATION_LOCALIZE_MAP, ACTIVATION_TOOLTIP_LOCALIZE_MAP } from "@/scripts/constants";
    import { getLocalized } from "@/scripts/helpers";
    import { slugify } from "@/scripts/lancer/util/lid";
    import FlowButton from "@/svelte/actor/FlowButton.svelte";
    import EffectBox from "./EffectBox.svelte";

    const {
        actions,
        path,
        uuid,
        edit,
        editDetails,
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
</script>

{#if actions.length > 0}
{#each actions as action, index}
    <!-- Action Array -->
    <div class="la-effectbox la-bckg-card la-brdr-repcap -largeheader -bordersround-ltb -widthfull -bordersround">
        <div class="la-actionheader la-combine-h la-bckg-secondary la-text-header clipped -padding0">
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
    {#if action.trigger}
        <div class="-fontsize1">
            <div class="la-divider-h la-bckg-primary"></div>
            <!-- Trigger -->
            <EffectBox
                name={getLocalized("LA.trigger.label")}
                outerStyle={["-bordersround"]}
            >
                <!-- TODO: Move to a snippet? -->
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
                    style={["clipped-bot"]}
                    backgroundStyle={ACTIVATION_COLOR_MAP[action.activation]}
                />
                <hr class="-widthfull">
                {@html action.trigger || defaultPlaceholder}
            </EffectBox>
            <!-- Effect -->
            <div class="la-effectbox la-brdr-repcap -bordersround-ltb -widthfull -bordersround">
                <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0"><!--
                --->{getLocalized("LA.mech.system.effect.label")}<!--
            --->{#if editDetails}
                    <!-- TODO: allow edit details -->
                    <button type="button" 
                        class="fas fa-edit popout-text-edit-button" 
                        data-path={`${path}.detail`}
                        aria-label={getLocalized("LA.edit.label")}>
                    </button><!--
            --->{/if}<!--
            ---></span>
                <span class="-fontsize1">{@html action.detail || defaultPlaceholder}</span>
            </div>
        </div>
    {:else}
        <div class="-fontsize1">
            <div class="la-divider-h la-bckg-primary"></div>
            <!-- TODO: Move to a snippet? -->
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
                style={["clipped-bot"]}
                backgroundStyle={ACTIVATION_COLOR_MAP[action.activation]}
            />
            <hr>
            {@html action.detail || defaultPlaceholder}
        </div>
    {/if}
    <!-- The original source reference opened the potential for tags to appear here,
        but official Lancer data does not have tags for IActionData 
    -->
    </div>
{/each}
{/if}