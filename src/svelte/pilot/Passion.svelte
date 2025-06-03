<script lang="ts">
    import { FlowClass } from "@/enums/FlowClass";
    import { TooltipDirection } from "@/enums/TooltipDirection";
    import { TextLogHook } from "@/enums/TextLogHook";
    import { getBondQNAMode, setBondQNAMode } from "@/scripts/store/bond";
    import { getLocalized } from "@/scripts/helpers";
    import { getBondImageSrc, getPilotSheetTooltipEnabled, setBondImageSrc } from "@/scripts/pilot/settings";
    import { getAdvancedState } from "@/scripts/store/advanced";
    import { getBrightness, getDocumentTheme } from "@/scripts/theme";
    import { getSheetStore } from "@/scripts/store/module-store";
    import StatusBar from "@/svelte/actor/StatusBar.svelte";
    import FlowButton from "@/svelte/actor/button/FlowButton.svelte";
    import GlyphButton from "@/svelte/actor/button/GlyphButton.svelte";

    const props = $props();
    const {
        actor,
        system,
    } = props;
    let advancedOptions = $derived(getAdvancedState(actor.uuid));
    let questionAnswer = $derived(getBondQNAMode(actor.uuid));
    let bondImageSrc = $state(getBondImageSrc(actor.uuid));

    const tooltipEnabled = getPilotSheetTooltipEnabled();
    const qualityMode = true; // TODO: change to a setting

    function getGlowColor()
    {
        return getBrightness(getSheetStore(actor.uuid).currentTheme) === "dark" ? "la-prmy-text" : "la-prmy-primary";
    }

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

    function tallyAndUpdate(event: Event)
    {
        event.stopPropagation();

        let expTotal = 0;

        // Tally XP from the checklist
        const updatedMajorIdeals = system.bond_state.xp_checklist.major_ideals.map((major: boolean) => 
        {
            if (major === true) expTotal++;
            return false;
        });
        if (system.bond_state.xp_checklist.minor_ideal === true)
            expTotal++;
        if (system.bond_state.xp_checklist.veteran_power === true)
            expTotal++;

        // Update XP and set their checked state to false
        if (expTotal > 0)
            actor.update({
                ["system.bond_state.xp.value"]: system.bond_state.xp.value + expTotal,
                ["system.bond_state.xp_checklist"]: {
                    major_ideals: updatedMajorIdeals,
                    minor_ideal: false,
                    veteran_power: false,
                },
            });
    }
</script>

{#if system.bond}
<div class="la-bg-scroll-alt la-combine-v -widthfull -margin1-b -padding1-tb la-reveal-hover">
    <!-- Bond Name -->
    <span class="-fontsize4 -letterspacing1 -upper">
        {system.bond.name}
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
        class="la-bond-card la-combine-h -positionrelative -widthfull -aligncenter"
    >
        <!-- Bond Image -->
        <div class="la-bond-card__img-anchor -margin5-t -margin5-b"
        >
            <img
                class="la-bond-card__img"
                src="{bondImageSrc}"
                alt="{getLocalized("LA.placeholder")}"
            />
        </div>
    {#if !questionAnswer}
        <div class="la-bond-card__content la-combine-v -positionabsolute -margin0-tb -heightfull -justifyevenly la-reveal">
            <!-- Major Ideals -->
            <div class="la-bond-major la-combine-v -alignstart la-bckg-darken-1 clipped -widthfull -padding0 -padding1-r">
                {#each system.bond.system.major_ideals as major, index}
                    <div class="la-combine-h">
                        <input type="checkbox"
                            class=""
                            name="system.bond_state.xp_checklist.major_ideals.{index}"
                            checked={system.bond_state.xp_checklist.major_ideals[index]}
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
            <div class="la-bond-minor la-combine-v -alignstart la-bckg-darken-1 clipped -widthfull -padding0 -padding1-r">
                <div class="la-combine-h -widthfull">
                    <input type="checkbox"
                        class=""
                        name="system.bond_state.xp_checklist.minor_ideal"
                        checked={system.bond_state.xp_checklist.minor_ideal}
                    />
                {#if advancedOptions}
                    <select
                        class="la-bond__select -fontsize1 -lineheight3 la-bckg-transparent la-text-text -widthfull"
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
                        checked={system.bond_state.xp_checklist.veteran_power}
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
            <div class="la-bond-question la-combine-v -alignstart la-bckg-darken-1 clipped -widthfull -padding2-lr -padding0-t -padding1-b">
                <span
                    class="-fontsize1 -lineheight3"
                >
                    {qna.question}
                </span>
                <select 
                    class="la-bond__select -fontsize1 -lineheight3 la-bckg-transparent la-text-text"
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

            flowClass={FlowClass.None}

            tooltipEnabled={tooltipEnabled}
            tooltipTheme={getDocumentTheme(actor.uuid)}
            tooltipDirection={TooltipDirection.DOWN}
            tooltip={getLocalized("LA.pilot.bond.tally.tooltip")}
            logText={getLocalized("LA.pilot.bond.tally.tooltip")}
            logType={TextLogHook.PilotHeader}
            logTypeReset={TextLogHook.PilotHeaderReset}

            onClick={tallyAndUpdate}
        />
        <div class="la-combine-h -positionabsolute -right0 -padding3-r -gap2 {advancedOptions ? "" : "-visibilityhidden"}">
            <!-- Edit Bond Image -->
            <GlyphButton
                style={["mdi mdi-image-edit", "la-text-secondary", "-fontsize5", "la-combine-h", "-justifycenter", "-aligncenter", `${qualityMode ? "-glow-prmy la-prmy-primary -glow-prmy-hover " + getGlowColor() : ""}`]}

                flowClass={FlowClass.None}

                tooltipEnabled={tooltipEnabled}
                tooltip={getLocalized("LA.pilot.bond.changeImage.tooltip")}
                logText={getLocalized("LA.pilot.bond.changeImage.tooltip")}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}

                onClick={browseImage}
            />
            <!-- Edit Bond -->
            <GlyphButton
                style={["fas fa-edit", "la-text-secondary", "-fontsize4", "-lineheight6", `${qualityMode ? "-glow-prmy la-prmy-primary -glow-prmy-hover " + getGlowColor() : ""}`, "-justifycenter", "-aligncenter"]}

                flowClass={FlowClass.ContextMenu}
                uuid={system.bond.uuid}
                path="itemTypes.bond"

                tooltipEnabled={tooltipEnabled}
                tooltip={getLocalized("LA.edit.tooltip")}
                logText={getLocalized("LA.edit.tooltip")}
                logType={TextLogHook.PilotHeader}
                logTypeReset={TextLogHook.PilotHeaderReset}
            />
        </div>
        <div class="la-combine-h -positionabsolute -left0 -padding3-l -gap1">
            <!-- Q&A Toggle -->
            <i class="mdi mdi-swap-vertical -fontsize la-text-text -positionabsolute -left0 {qualityMode ? "-glow-prmy la-prmy-primary -glow-prmy-hover " + getGlowColor() : ""}"></i>
            <GlyphButton
                style={[`${questionAnswer ? "mdi mdi-list-box" : "mdi mdi-help-circle"}`, "la-text-secondary", "-fontsize5", "la-combine-h", "-justifycenter", "-aligncenter", `${qualityMode ? "-glow-prmy la-prmy-primary -glow-prmy-hover " + getGlowColor() : ""}`]}

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
                style={["mdi mdi-refresh-circle", "la-text-secondary", "-fontsize5", "-justifycenter", `${qualityMode ? "-glow-prmy la-prmy-primary -glow-prmy-hover " + getGlowColor() : ""}`]}

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