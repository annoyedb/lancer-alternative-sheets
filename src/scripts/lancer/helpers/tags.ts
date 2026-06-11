// Reimplementation of bare-minimum foundryvtt-lancer functionality (src/module/helpers/tags.ts)

// A small tag display containing just the label and value
export function compactTag(tagPath: string, tag: any, editable: boolean = true): string
{
    return tagView(tagPath, tag, true, editable);
}

function tagView(tagPath: string, tag: any, compact: boolean = true, editable: boolean = true): string
{
    // Format the {VAL} out of the name
    let interpolatedName = tag.name.replace("{VAL}", `${tag.val ?? "?"}`);
    let interpolatedDescription = tag.description.replace("{VAL}", `${tag.val ?? "?"}`) ?? "";
    return `<div
    class="${editable ? "editable-tag-instance" : ""} ${compact ? "compact-tag flexrow" : "large-tag"}"
    ${editable ? `data-path="${tagPath}"` : ""}
    ${compact ? `data-tooltip="${interpolatedDescription}"` : ""}
  >
    ${compact
            ? `
    <i class="mdi mdi-label i--s i--light"></i>
    <span style="margin: 3px;" >${interpolatedName}</span>`
            : `
    <div class="tag-header flexrow">
      <i class="mdi mdi-label i--s i--light"></i>
      <span style="margin: 3px;" >${interpolatedName}</span>
      ${editable
                ? `
      <div class="tag-controls">
        <a class="tag-edit-button fas fa-edit" data-path="${tagPath}"></a>
        <a class="gen-control fas fa-trash" data-action="splice" data-path="${tagPath}"></a>
      </div>`
                : ""
            }
    </div>
    <div class="tag-description">${interpolatedDescription}</div>`
        }
  </div>`;
}
