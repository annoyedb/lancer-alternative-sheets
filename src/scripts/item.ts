import { HelperOptions } from "handlebars";
import { resolveDotpath, spoofHelper } from "./lancer/helpers/common";
import { getLocalized, getTagArray, randomExtension } from "./helpers";
import { compactTagList, compactTagListHBS } from "./lancer/helpers/tags";
import { ACTIVATION_COLOR_MAP, ACTIVATION_ICON_MAP } from "./constants";
import { slugify } from "./lancer/util/lid";

export function renderActionArray(document: any, path: string, options?: HelperOptions & {
    detail: string; trigger: string; activation: string; name: string;
    editable?: boolean; hideChip?: boolean; nonInteractive?: boolean; full?: boolean; tags?: boolean;
})
{
    let actions = resolveDotpath(document, path, []) as any[];
    let out = actions.map((_: any, index: number) =>
    {
        let action = resolveDotpath(document, `${path}.${index}`, options);
        console.log(action);
        if (!action) return "";

        let defaultPlaceholder = getLocalized("LA.placeholder");
        let button = "";
        if (!options?.hideChip)
        {
            button = renderActionButton(
                action.activation,
                { uuid: document.uuid, path: `${path}.${index}` },
                { nonInteractive: options?.nonInteractive }
            );
        }

        // Details
        let editDetails = "";
        if (options?.editable)
        {
            editDetails = `
                <!-- LA: I have not been restyled -->
                <a class="fas fa-edit popout-text-edit-button" data-path="${path}.detail"></a>
                <!-- /LA: I have not been restyled -->
            `;
        }

        let detailText = "";
        if (!action.trigger)
        {
            detailText = `
                <div class="-fontsize1">
                    <div class="la-divider-h la-bckg-primary"></div>
                    ${button}
                    ${editDetails}
                    ${action.detail || defaultPlaceholder}
                </div>
            `;
        } else
        {
            detailText = `
                <div class="-fontsize1 ${options?.full ? "" : "collapsed"}">
                    <div class="la-divider-h la-bckg-primary"></div>
                    <!-- Trigger -->
                    <div class="la-effectbox la-combine-v -borderbottom -align-left -descriptive">
                        <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0">${getLocalized("LA.trigger.label")}</span>
                        ${button}
                        <div class="la-spacer -medium">&nbsp</div>
                        <span class="-fontsize1">${action.trigger || defaultPlaceholder}</span>
                    </div>
                    <div class="la-spacer -medium">&nbsp</div>
                    <!-- Effect -->
                    <div class="la-effectbox -descriptive">
                        <span class="la-effectbox__span clipped-bot la-bckg-primary la-text-header -fontsize0">${getLocalized("LA.mech.system.effect.label")} ${editDetails}</span>
                        <span class="-fontsize1">${action.detail || defaultPlaceholder}</span>
                    </div>
                </div>
            `;
        }

        // Editable
        let editor = "";
        if (options?.editable)
        {
            editor = `
                <!-- LA: I have not been restyled -->
                <div class="action-editor-wrapper -fontsize1">
                    <a class="gen-control" data-uuid="${document.uuid}" data-action="splice" data-path="${path}">
                        <i class="fas fa-trash"></i>
                    </a>
                    <a class="action-editor fas fa-edit" data-path="${path}"></a>
                </div>
                <!-- /LA: I have not been restyled -->
            `;
        }

        // Tags
        let tags = "";
        //@ts-ignore
        if (options?.tags && doc instanceof LancerItem && document.getTags())
        {
            tags = compactTagListHBS("tags", spoofHelper({ tags: document.getTags()! }));
        }

        return `
<!-- Action Array -->
<div class="la-effectbox la-bckg-card -descriptive -largeheader">
    <div class="la-actionheader la-combine-h la-bckg-secondary la-text-header clipped">
        <i class="cci ${ACTIVATION_ICON_MAP[action.activation]} -fontsize5"></i>
        <span class="-fontsize2">
            ${action.name?.toUpperCase() ?? document.name}
        </span>
        ${editor}
    </div>
    ${detailText}
    ${tags}
</div>
        `;
    }).filter(Boolean);

    return out.join("");
}

// Equivalent to "buildChipHTML" in foundryvtt-lancer
export function renderActionButton(
    activation: any,
    flowData?: {
        icon?: any;
        label?: string;
        // These must both be provided in order to use a flow
        uuid?: string;
        path?: string;
    },
    options?: { nonInteractive?: boolean }
)
{
    const activationClass = `activation-${slugify(activation, '-')}`;
    const themeClass = ACTIVATION_COLOR_MAP[activation] || "la-bckg-repcap";
    const interactiveClass = options?.nonInteractive ? "noninteractive" : "";
    const label = flowData?.label
        ? `${flowData.label.toUpperCase()} - ${activation.toUpperCase()}`
        : `${!options?.nonInteractive ? getLocalized("LA.use.label") + " " : ""}${activation.toUpperCase()}`;

    if (flowData && flowData.uuid && flowData.path !== undefined)
    {
        return `
<!-- Action Button Flow -->
<button type="button"
    class="la-flow la-button la-text-header clipped-bot ${themeClass}
        activation-flow ${activationClass} ${interactiveClass}"
    data-uuid=${flowData.uuid} 
    data-path="${flowData.path}">
    <span class="la-terminal -fadein">>//: </span>${label}<span class="la-extension -lower -fadein">${randomExtension()}</span><span class="la-cursor -fadein"></span>
</button>
        `;
    }
    else
    {
        return `
<!-- Action Button -->
<span
    class="la-text-header ${activationClass} ${themeClass} ${interactiveClass}"
    data-uuid=${flowData?.uuid} data-path="${flowData?.path}">
    ${flowData?.icon ? flowData.icon : ""}
    ${label}
</span>
        `;
    }
}

export function renderTagsArray(tagsPath: string, options: HandlebarsHelpers & { editable?: boolean }): string
{
    let tagArray = getTagArray(tagsPath, options as any);
    let tags = "";
    if (tagArray.length > 0)
    {
        tags = compactTagList(tagArray, tagsPath, options);
    }

    return tags;
}