import { HelperOptions } from "handlebars";
import { resolveHelperDotpath } from "../lancer/helpers/common";
import { renderActionArray } from "../item";
import { collapseID } from "../lancer/helpers/collapse";
import { getLocalized } from "../helpers";

export function renderTalents(talentPath: string, options: HelperOptions)
{
    let collapse = resolveHelperDotpath(options, "collapse") as any;
    let mech = resolveHelperDotpath(options, "actor") as any;
    let talents = resolveHelperDotpath(options, talentPath) as any;
    if (!talents)
        return "";

    let renderArray: string[] = talents.map((talent: any, _index: number) =>
    {
        let ranks = renderTalentArray(talent, options);
        return `
<!-- Talent -->
<div class="la-details -fullwidth -talent
    ref set"
    data-uuid="${talent.uuid}"
    draggable="true">
    <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-pilot la-text-header -fontsize2
            collapse-trigger"
        data-la-collapse-id="${collapseID(collapse, talent, false)}">
        <!-- Icon, Name -->
        <div class="la-left la-combine-h">
            <i class="la-icon cci cci-talent -fontsize3"></i>
            <span class="la-name__span -fontsize2">${talent.name} ${talent.system.curr_rank}</span>
        </div>
        <!-- Options -->
        <div class="la-right la-combine-h">
            <span class="la-divider-v la-bckg-header">&nbsp;</span>
            <div class="la-options la-combine-h">
                <button type="button"
                    class="lancer-context-menu -glow-header -glow-primary-hover -fontsize2" data-path="${talentPath}">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </div>
        </div>
    </summary>
    <div class="la-details-wrapper la-brdr-exotic
            collapse collapsed"
        data-la-collapse-id="${collapseID(collapse, talent, true)}">
        <div class="la-generated -fullwidth -gap1 la-combine-v">
            <!-- Generated Content -->
            ${ranks}
        </div>
    </div>
</div>
        `;
    });

    let collID = `${mech.uuid}_talents`;
    return `
<!-- Talent List -->
<h1 class="la-subcontent la-bckg-exotic la-text-header clipped-top -fontsize2
        collapse-trigger"
    data-la-collapse-id="${collapseID(collapse, collID, false)}">
    <span class="la-terminal la-text-header -fadein">>//: </span>${getLocalized("LA.pilot.talent.label")} <span
        class="la-extension la-text-header -lower -fadein">--${getLocalized("LA.scan.label")}</span><span
        class="la-cursor la-anim-header -fadein">
    </span>
</h1>
<div class="la-details-wrapper la-brdr-exotic
        collapse collapsed"
    data-la-collapse-id="${collapseID(collapse, collID, true)}">
    ${renderArray.join("")}
</div> 
    `;
}

function renderTalentArray(talent: any, options: HelperOptions)
{
    let collapse = resolveHelperDotpath(options, "collapse") as any;

    let ranksArray: string[] = talent.system.ranks
        .filter((_rank: any, i: number) => i < talent.system.curr_rank)
        .map((rank: any, i: number) =>
    {
        let actions = "";
        if (rank.actions)
        {
            actions = renderActionArray(talent, `system.ranks.${i}.actions`);
        }

        let collID = `${talent.uuid}_${i}`;
        return `
<!-- Talent Rank -->
<div class="la-details -fullwidth -talent
    ref set"
    data-uuid="${talent.uuid}"
    draggable="true">
    <summary class="la-details__summary la-combine-h clipped-bot-alt la-bckg-pilot la-text-header -fontsize2
            collapse-trigger"
        data-la-collapse-id="${collapseID(collapse, collID, false)}">
        <!-- Icon, Name -->
        <div class="la-left la-combine-h">
            <i class="la-icon cci cci-rank-${i + 1} -fontsize3"></i>
            <span class="la-name__span -fontsize2">${rank?.name}</span>
        </div>
        <!-- Options -->
        <div class="la-right la-combine-h">
            <span class="la-divider-v la-bckg-header">&nbsp;</span>
            <div class="la-options la-combine-h">
                <button type="button"
                    class="chat-flow-button -glow-header -glow-primary-hover -fontsize2"
                data-uuid="${talent.uuid}"
                data-rank="${i}">
                    <i class="mdi mdi-message"></i>
                </button>
            </div>
        </div>
    </summary>
    <div class="la-details-wrapper -borderoff
            collapse collapsed"
        data-la-collapse-id="${collapseID(collapse, collID, true)}">
        <span class="la-details-wrapper__span la-effectbox la-bckg-card la-brdr-exotic -fontsize1">
            <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0">
                ${getLocalized("LA.pilot.trait.label")}
            </span>
            ${rank?.description}
        </span>
        <div class="la-generated -fullwidth -gap1 la-combine-v">
            <!-- Generated Content -->
            ${actions
                ? `<div class="la-spacer -medium">&nbsp</div>${actions}`
                : ""
            }
        </div>
    </div>
</div>
        `;
    });

    return ranksArray.join("");
}