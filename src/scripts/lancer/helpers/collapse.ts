// Reimplementation of bare-minimum foundryvtt-lancer functionality

export type CollapseRegistry = { [LID: string]: number };

/**
 * Generate a unique id for the given collapse item
 * @param collapse Collapse ID registry to operate in
 * @param doc The document / id we are generating a new ID based off of
 * @param no_inc Whether we should re-use the previous index, if one exists. This allows consecutively generated IDs to be aliased to each other - they will collapse each other
 */
export function collapseID(
  collapse: CollapseRegistry,
  doc: string | any | any | null | undefined,
  no_inc: boolean
): string
{
  // On sheet, enable collapse.
  let doc_id: string;
  if (doc instanceof foundry.abstract.Document)
  {
    doc_id = doc.id ?? "ephem";
  } else if (typeof doc == "string")
  {
    doc_id = doc;
  } else
  {
    doc_id = "uncat";
  }
  if (collapse[doc_id] == undefined) collapse[doc_id] = 0;
  let collapse_index: number;
  if (no_inc)
  {
    collapse_index = collapse[doc_id];
  } else
  {
    collapse_index = ++collapse[doc_id];
  }
  return `${doc_id}_${collapse_index}`;
}