// Minimal hand-authored Lancer-system + fvtt-types glue: the fvtt-types V13
// configuration/global augmentations this module relies on, plus the only two
// Lancer type symbols it imports (`FlowState`, `EmbeddedRef`). Re-audit against
// the system on each Lancer bump.
//
// Provenance (shapes mirrored from Eranziel/foundryvtt-lancer):
//   FlowState    <- src/module/flows/flow.ts       (actor/item loosened to the call sites)
//   EmbeddedRef  <- src/module/source-template.ts  (a string alias)

// --- Lancer system types actually imported by the module -------------------

/** A reference to an embedded document by its id. (`= string` in the system.) */
export type EmbeddedRef = string;

/**
 * Encapsulates the current state of a Lancer Flow. Only `data` and `actor` are
 * touched by this module, so `actor`/`item` are intentionally loose.
 */
export interface FlowState<T> {
  name: string;
  actor: any;
  item: any;
  currentStep: string;
  data?: T;
}

// --- fvtt-types V13 configuration ------------------------------------------

interface LancerInitiativeConfig<T extends string = string> {
  module: T;
  templatePath?: string;
  def_appearance?: {
    icon: string;
    deactivate: string;
    icon_size: number;
    player_color: string;
    friendly_color: string;
    neutral_color: string;
    enemy_color: string;
    done_color: string;
  };
  activations?: string | number;
  enable_initiative?: boolean;
  sort?: boolean;
}

// Opt into "assume the ready hook has run" so globals like `game` and `canvas`
// are typed as their initialized (non-`undefined`) state.
declare module "fvtt-types/configuration" {
  interface AssumeHookRan {
    ready: never;
  }

  // Register this module's settings namespace (and the one Lancer-system key we
  // read) with fvtt-types so `game.settings.register/get/set` accept them. The
  // rewrite constrains the namespace argument to declared `SettingConfig` keys;
  // a template-literal index keeps every key valid without enumerating all ~38.
  interface SettingConfig {
    // `any` (not `unknown`): with `unknown` the rewrite types the `type:` field of
    // `register` as `undefined`; `any` lets `ToRuntimeType` accept the Boolean/
    // String/Number/Array constructors these settings actually use.
    [K: `lancer-alternative-sheets.${string}`]: any;
    [K: `lancer.${string}`]: any;
    // Core setting the module reads but which fvtt-types does not (yet) declare.
    "core.photosensitiveMode": boolean;
  }

  // Custom hooks this module fires/listens for. Declaring them lets the rewrite's
  // typed `Hooks.on`/`Hooks.call` accept them with correct callback signatures.
  // `HookConfig` is re-exported under the `Hooks` namespace of the configuration
  // module (`export * as Hooks`), so the augmentation must be nested likewise.
  namespace Hooks {
    interface HookConfig {
      laOverrideTheme: (uuid: string, theme: string) => void;
      laForceRerender: (uuid: string, callback?: () => void) => void;
    }
  }
}

declare global {
  // Custom properties the Lancer system attaches to the global `game` object.
  // With `AssumeHookRan { ready }` the global `game` is typed as `ReadyGame`, so
  // the augmentation must target that lifecycle interface (augmenting `Game`
  // alone does not propagate to it). `action_manager` is typed loosely - the
  // module never reads it, it only needs the property to exist on the shape.
  interface Game {
    lancer: Record<string, unknown>;
    action_manager?: unknown;
  }
  interface ReadyGame {
    lancer: Record<string, unknown>;
    action_manager?: unknown;
  }

  interface CONFIG {
    LancerInitiative: LancerInitiativeConfig;
  }
}
