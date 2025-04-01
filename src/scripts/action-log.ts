// Rebinds the buttons in ActionLog to the appropriate Lancer system function, since 
// these buttons are dynamically added to the DOM and not part of the original HTML
// These are semi-rewrites from the base Lancer system
import { Logger } from "@/classes/Logger";
import { getLocalized } from "@/scripts/helpers";
import { AppliedDamage } from "./lancer/actor/damage-calc";
import { Damage } from "./lancer/models/bits/damage";

export function rebindButtons(messageData: any, messageContainer: HTMLElement): void
{
    const buttons = $(messageContainer).find('.lancer-button').toArray();

    buttons.forEach((buttonElement) =>
    {
        const button = $(buttonElement) as JQuery<HTMLButtonElement>;

        if (button.hasClass('lancer-damage-flow'))
        {
            handleDamageFlow(messageData, button);
        }
        else if (button.hasClass('lancer-damage-apply'))
        {
            handleDamageApply(messageData, button);
        }
        else if (button.hasClass('flow-button'))
        {
            const flowType = button.data('flow-type');
            if (flowType)
            {
                if (flowType === "cascade")
                {
                    handleCascadeFlow(messageData, button);
                }
                else if (flowType === "secondaryStructure")
                {
                    handleSecondaryStructureFlow(messageData, button);
                }
                else if (flowType === "check")
                {
                    handleCheckFlow(messageData, button);
                }
                else
                {
                    Logger.warn(`Unknown flow button class: ${flowType}. Please report this to Lancer Alternative Sheets author with the action in the chat that caused it. Like for realsies.`, button);
                }
            } 
            else
            {
                Logger.warn(`Flow button missing [data-flow-type] attribute`);
            }
        }
        else
        {
            Logger.warn(`Unknown lancer button class: ${button.attr('class')}. Please report this to Lancer Alternative Sheets author with the action in the chat that caused it. No, really.`, button);
        }
    });
}

function handleDamageFlow(messageData: any, button: JQuery<HTMLButtonElement>)
{
    async function runDamageFlow(): Promise<void>
    {
        // if it wasn't good enough for the system to display to chat, it isn't good enough for us, don't bother with data validation
        const attackData = messageData?.flags.lancer?.attackData;
        const actor = await fromUuid(attackData?.attackerUuid) as any;
        const item = await fromUuid(attackData?.attackerItemUuid) as any;
        if (!item && !attackData)
            return;

        const hitResults: Array<any> = attackData?.targets.map(async (target: any) => 
        {
            if (!target || target.documentName !== "Token")
                return;

            return {
                target: await fromUuid(target.id),
                total: target.total,
                usedLockOn: target.setConditions.lockOn === false ? true : false,
                hit: target.hit,
                crit: target.crit,
            };
        });

        const damage: any = [];
        const bonusDamage: any = [];
        if (attackData?.invade)
            damage.push({ type: "Heat", val: "2" });

        const DamageRollFlow = (game.lancer.flows as Map<string, any>).get("DamageRollFlow") as any;
        const flow = new DamageRollFlow(item?.uuid || attackData?.attackerUuid,
            {
                title: `${item?.name || actor?.name}  ${getLocalized("LA.damage.label").toUpperCase()}`,
                configurable: true,
                invade: attackData?.invade,
                hit_results: hitResults,
                has_normal_hit: hitResults?.some((hr: any) => hr.hit && !hr.crit),
                has_crit_hit: hitResults?.some((hr: any) => hr.crit),
                damage: damage,
                bonus_damage: bonusDamage,
            });

        flow.begin();
    }
    button.on('click', async () =>
    {
        runDamageFlow();
    });
}

function handleDamageApply(messageData: any, button: JQuery<HTMLButtonElement>): void
{
    async function runApplyDamageFlow(event: JQuery.ClickEvent): Promise<void>
    {
        // if it wasn't good enough for the system to display to chat, it isn't good enough for us, don't bother with data validation
        const buttonGroup = event.currentTarget.closest('.lancer-damage-button-group');
        const data = buttonGroup?.dataset;
        const target = await fromUuid(data.target) as any;
        const actor = target?.actor;
        if (!data || !actor)
            return;

        const damageData = messageData?.flags.lancer?.damageData;
        const hydratedTargets = damageData.targetDamageResults.map((dmgTarget: { target: string; }) => 
        {
            const target = fromUuidSync(dmgTarget.target) as any;
            if (!target)
                return null;
            else
                return {
                    ...dmgTarget,
                    target: target,
                };
        }).filter((t: null) => t !== null);
        const targetDamage = hydratedTargets.find((dmgTarget: any) =>
        {
            return dmgTarget?.target?.uuid === data.target;
        });
        const multiple = parseFloat(buttonGroup.querySelector('select')?.value) || 1;

        await actor.damageCalc(
            new AppliedDamage(targetDamage.damage.map((damage: { type: any; amount: { toString: () => any; }; }) => 
            {
                return new Damage({
                    type: damage.type,
                    val: damage.amount.toString(),
                });
            })),
            {
                multiple: multiple,
                addBurn: data.addBurn === "true",
                isCrit: data.isCrit === "true",
                isHit: data.isHit === "true",
                ap: targetDamage.ap,
                paracausal: targetDamage.paracausal,
            }
        );
    }

    button.on('click', async (event) =>
    {
        runApplyDamageFlow(event);
    });
}

function handleCascadeFlow(messageData: any, button: JQuery<HTMLButtonElement>): void
{
    async function runCascadeFlow(): Promise<void>
    {
        console.log(`Actor.${messageData.speaker.actor}`);
        const CascadeFlow = (game.lancer.flows as Map<string, any>).get("CascadeFlow") as any;
        const flow = new CascadeFlow(`Actor.${messageData.speaker.actor}`);

        flow.begin();
    }

    button.on('click', async () =>
    {
        runCascadeFlow();
    });
}

function handleSecondaryStructureFlow(messageData: any, button: JQuery<HTMLButtonElement>): void
{
    async function runSecondaryStructureFlow(): Promise<void>
    {
        const SecondaryStructureFlow = (game.lancer.flows as Map<string, any>).get("SecondaryStructureFlow") as any;
        const flow = new SecondaryStructureFlow(`Actor.${messageData.speaker.actor}`);

        flow.begin();
    }

    button.on('click', async () =>
    {
        runSecondaryStructureFlow();
    });
}

function handleCheckFlow(messageData: any, button: JQuery<HTMLButtonElement>): void
{
    async function runCheckFlow(): Promise<void>
    {
        const checkType = button.data('check-type');
        const StatRollFlow = (game.lancer.flows as Map<string, any>).get("StatRollFlow") as any;
        const flow = new StatRollFlow(`Actor.${messageData.speaker.actor}`, `system.${checkType}`);

        flow.begin();
    }

    button.on('click', async () =>
    {
        runCheckFlow();
    });
}