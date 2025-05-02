<script lang="ts">
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { getBondQNAMode, setBondQNAMode } from "@/scripts/store/bond";
    import { getLocalized } from "@/scripts/helpers";
    import { getBondImageSrc, getPilotSheetTooltipEnabled, setBondImageSrc } from "@/scripts/pilot/settings";
    import { getAdvancedState } from "@/scripts/store/advanced";
    import StatusBar from "@/svelte/actor/StatusBar.svelte";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";
    import GlyphButton from "@/svelte/actor/button/GlyphButton.svelte";

    const props = $props();
    const {
        actor,
        system,

        bondIndex,
    } = props;
    let advancedOptions = $derived(getAdvancedState(actor.uuid));
    let questionAnswer = $derived(getBondQNAMode(actor.uuid));
    let bondImageSrc = $state(getBondImageSrc(actor.uuid));

    const tooltipEnabled = getPilotSheetTooltipEnabled();
    const qualityMode = true; // TODO: change to a setting

    function browseImage()
    {
        const fp = new FilePicker({
            current: bondImageSrc,
            type: "image",
            callback: (path) => {
                setBondImageSrc(actor.uuid, path);
                bondImageSrc = path;
            },
        });

        fp.render(true);
    }
</script>

{#if system.bond}
<div class="la-combine-v -widthfull -margin1-b la-reveal-hover">
    <!-- Bond Name -->
    <span class="-fontsize4 -letterspacing1 -upper">
        THE TITAN
    </span>
    <!-- Bond XP -->
    <div class="-widthhalf -padding0-tb">
        <StatusBar
            dataName={"system.bond_state.xp.value"}
            currentValue={system.bond_state.xp.value}
            maxValue={system.bond_state.xp.max}
            barStyle={["la-bckg-bar-health"]}
            barStyleSecondary={["la-bckg-bar-shield", "-shield"]}
            barStyleTertiary={["la-bckg-bar-burn", "-burn"]}
            textStyle={["la-text-text"]}
            clipPath={"clipped"}

            tooltipEnabled={tooltipEnabled}
            tooltip={getLocalized("LA.hitpoint.tooltip")}
            tooltipDirection={TooltipDirection.RIGHT}
        />
    </div>
    <div
        class="la-bond-card la-bg-scroll-alt la-combine-h -positionrelative -widthfull -aligncenter"
    >
        <!-- Bond Image -->
        <div class="la-bond-card__img-anchor -margin5-t -margin5-b"
        >
            <img
                class="la-bond-card__img"
                src="{bondImageSrc}"
                alt="BondImage"
            />
        </div>
    {#if !questionAnswer}
        <div class="la-bond-card__content la-combine-v -positionabsolute -margin0-tb -heightfull -justifyevenly la-reveal">
            <!-- Major Ideals -->
            <div class="la-bond-major la-combine-v -alignstart lancer-bckg-darken-1 clipped -widthfull -padding0 -padding1-r">
                {#each system.bond.system.major_ideals as major, index}
                    <div class="la-combine-h">
                        <input type="checkbox"
                            class=""
                            name="system.bond_state.xp_checklist.major_ideals.{index}"
                        />
                        <span
                            class="-fontsize1 -lineheight3"
                        >
                            {major}
                        </span>
                    </div>
                {/each}
            </div>
            <!-- Minor Ideals -->
            <div class="la-bond-minor la-combine-v -alignstart lancer-bckg-darken-1 clipped -widthfull -padding0 -padding1-r">
                <div class="la-combine-h -widthfull">
                    <input type="checkbox"
                        class=""
                        name="system.bond_state.xp_checklist.minor_ideal"
                    />
                {#if advancedOptions}
                    <select
                        class="-fontsize1 -lineheight3 la-bckg-transparent la-text-text -widthfull"
                        name="system.bond_state.minor_ideal" 
                        data-type="String"
                    >
                    {#each system.bond.system.minor_ideals as minor}
                        <option
                            value="{minor}"
                            selected={minor === system.bond_state.minor_ideal}
                        >
                            {minor}
                        </option>
                    {/each}
                    </select>
                {:else}
                    <span
                        class="-fontsize1 -lineheight3 -widthfull"
                    >
                        {system.bond_state.minor_ideal}
                    </span>
                {/if}
                </div>
                <div class="la-combine-h">
                    <input type="checkbox"
                        class=""
                        name="system.bond_state.xp_checklist.veteran_power"
                    />
                    <span
                        class="-fontsize1 -lineheight3"
                    >
                        {getLocalized("LA.pilot.bond.other.label")}
                    </span>
                </div>
            </div>
        </div>
    {:else}
        <div class="la-bond-card__content la-combine-v -positionabsolute -margin0-tb -heightfull -justifyevenly la-reveal">
            <!-- Q&A -->
            {#each system.bond.system.questions as qna, index}
            <div class="la-bond-question la-combine-v -alignstart lancer-bckg-darken-1 clipped -widthfull -padding2-lr -padding0-t -padding1-b">
                <span
                    class="-fontsize1 -lineheight3"
                >
                    {qna.question}
                </span>
                <select 
                    class="-fontsize1 -lineheight3 la-bckg-transparent la-text-text"
                    name="system.bond_state.answers.{index}" 
                    data-type="String"
                >
                {#each qna.options as answer}
                    <option
                        value="{answer}"
                        selected={answer === system.bond_state.answers[index]}
                    >
                        {answer}
                    </option>
                {/each}
                </select>
            </div>
            {/each}
        </div>
    {/if}
    </div>
    <div class="la-combine-h">
    <!-- Bond XP Tally -->
        <FlowButton
            text={getLocalized("LA.pilot.bond.tally.label")}
            style={["clipped", "la-bckg-secondary", "-padding0-tb", "-flex1"]}

            flowClass={FlowClass.BondTallyXP}

            tooltipEnabled={tooltipEnabled}
            tooltip={getLocalized("LA.pilot.bond.tally.tooltip")}
            logText={getLocalized("LA.pilot.bond.tally.tooltip")}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}
        />
    <!-- Editing -->
    {#if advancedOptions}
        <file-picker
            type="image"
            name=""
        ></file-picker>
        <div class="la-combine-h -positionabsolute -right0 -padding3-r -gap2">
            <GlyphButton
                style={["mdi mdi-image-edit", "la-text-secondary", "-fontsize5", "la-combine-h", "-justifycenter", "-aligncenter", `${qualityMode ? "la-pulse-glow-color la-anim-primary" : ""}`]}

                flowClass={FlowClass.None}

                tooltipEnabled={tooltipEnabled}
                tooltip={getLocalized("LA.pilot.bond.swap.tooltip")}
                logText={getLocalized(!questionAnswer ? "LA.pilot.bond.qa.tooltip" : "LA.pilot.bond.xp.tooltip")}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}

                onClick={browseImage}
            />
            <GlyphButton
                style={["fas fa-edit", "la-text-secondary", "-fontsize4", "-lineheight6", `${qualityMode ? "la-pulse-glow-color la-anim-primary" : ""}`, "-justifycenter", "-aligncenter"]}

                flowClass={FlowClass.ContextMenu}
                path="system.bond.{bondIndex}"

                tooltipEnabled={tooltipEnabled}
                tooltip={getLocalized("LA.edit.tooltip")}
                logText={getLocalized("LA.edit.tooltip")}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
        </div>
    {/if}
        <div class="la-combine-h -positionabsolute -left0 -padding3-l -gap1">
            <!-- Q&A Toggle -->
            <i class="mdi mdi-swap-vertical -fontsize la-text-text -positionabsolute -left0 la-pulse-glow-color la-anim-primary"></i>
            <GlyphButton
                style={[`${questionAnswer ? "mdi mdi-list-box" : "mdi mdi-help-circle"}`, "la-text-secondary", "-fontsize5", "la-combine-h", "-justifycenter", "-aligncenter", `${qualityMode ? "la-pulse-glow-color la-anim-primary" : ""}`]}

                flowClass={FlowClass.None}

                tooltipEnabled={tooltipEnabled}
                tooltip={getLocalized("LA.pilot.bond.swap.tooltip")}
                logText={getLocalized(!questionAnswer ? "LA.pilot.bond.qa.tooltip" : "LA.pilot.bond.xp.tooltip")}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}

                onClick={() => { setBondQNAMode(actor.uuid, !questionAnswer); }}
            >
            </GlyphButton>
            <!-- Refresh Powers -->
            <GlyphButton
                style={["mdi mdi-refresh-circle", "la-text-secondary", "-fontsize5", "-justifycenter", `${qualityMode ? "la-pulse-glow-color la-anim-primary" : ""}`]}

                flowClass={FlowClass.BondPowerRefresh}

                tooltipEnabled={tooltipEnabled}
                tooltip={getLocalized("LA.pilot.bond.power.refresh.tooltip")}
                logText={getLocalized("LA.pilot.bond.power.refresh.tooltip")}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}

                onClick={() => { setBondQNAMode(actor.uuid, !questionAnswer); }}
            />
        </div>
    </div>
</div>
{/if}