// Our own collapse.ts! With blackjack! And hookers!
// Temporary until the system implements these fixes

export function applyCollapseListeners(html: JQuery<HTMLElement>)
{
    html.find(".collapse-trigger").each((_index, element) => {
        $(element).on("click", (event) => {
            handleCollapse(event, html);
        });
    });
}

// Collapse handler using JQuery on the DOM so that it is compatible with PopOut! module
function handleCollapse(event: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>, html: JQuery<HTMLElement>)
{
    event.stopPropagation();
    let id = $(event.currentTarget).attr("data-la-collapse-id");
    let collapse = html.find(`.collapse[data-la-collapse-id="${id}"]`);
    if (collapse.hasClass("collapsed"))
    {
        collapse.removeClass("collapsed");
        sessionStorage.setItem(`lancer-alternative-collapse-${id}`, "opened");
    } else
    {
        collapse.addClass("collapsed");
        sessionStorage.setItem(`lancer-alternative-collapse-${id}`, "closed");
    }
}

export function initializeCollapses(html: JQuery)
{
    let collapse_sections = html.find(".collapse");
    // Init according to session store.
    collapse_sections.each((_index, section) =>
    {
        let id = section.getAttribute("data-la-collapse-id");
        if (id)
        {
            let ssv = sessionStorage.getItem("lancer-alternative-collapse-" + id);
            if (ssv == "opened")
            {
                section.classList.remove("collapsed");
            } else if (ssv == "closed")
            {
                section.classList.add("collapsed");
            }
        }
    });
}

export function isCollapsed(id: string): boolean
{
    return sessionStorage.getItem(`lancer-alternative-collapse-${id}`) == "closed";
}