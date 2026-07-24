import { getContext, setContext } from "svelte";

// One key per independently-mounted Svelte root (see mountComponents in the sheet base classes).
// Context does not cross separate mount() calls, so this must be set at the top of every
// top-level mounted component. Descendants of that root can then read it at any depth.
//
// This is an attempt to avoid prop drilling without throwing literally everything into a store.
// Note that this works because we remount every single component on the sheet's render() call (contexts aren't reactive),
//
// but idk what we'll do once Lancer implements refreshable data without rerendering as a feature of AppV2.
// That's a problem for future me
const ACTOR_CONTEXT = Symbol("actor");

export function setActorContext(actor: any): void
{
    setContext(ACTOR_CONTEXT, actor);
}

export function getActorContext(): any
{
    return getContext(ACTOR_CONTEXT);
}
