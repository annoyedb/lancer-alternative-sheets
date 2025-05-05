
/*********************************************
    ======== Chat button handlers ==========
*********************************************/

import { AppliedDamage } from "@/scripts/lancer/actor/damage-calc";
import { Damage } from "../models/bits/damage";

/**
 * This function is attached to damage roll buttons in chat. It constructs the initial
 * data for a DamageFlow, then begins the flow.
 * @param event Click event on a button in a chat message
 */
export async function rollDamageCallback(event: JQuery.ClickEvent)
{
    const chatMessageElement = event.currentTarget.closest(".chat-message.message");
    if (!chatMessageElement)
    {
        ui.notifications?.error("Damage roll button not in chat message");
        return;
    }
    const chatMessage = game.messages?.get(chatMessageElement.dataset.messageId);
    // Get attack data from the chat message
    // @ts-expect-error v10 types
    const attackData = chatMessage?.flags.lancer?.attackData as AttackFlag;
    if (!chatMessage || !attackData)
    {
        ui.notifications?.error("Damage roll button has no attack data available");
        return;
    }

    // Get the attacker and weapon/system from the attack data
    const actor = (await fromUuid(attackData.attackerUuid)) as any | null;
    if (!actor)
    {
        ui.notifications?.error("Invalid attacker for damage roll");
        return;
    }
    if (!actor.owner)
    {
        ui.notifications?.error(`You do not own ${actor.name}, so you cannot roll damage for them`);
        return;
    }
    const item = (await fromUuid(attackData.attackerItemUuid || "")) as any | null;
    if (item && item.parent !== actor)
    {
        ui.notifications?.error(`Item ${item.uuid} is not owned by actor ${actor.uuid}!`);
        return;
    }
    const hit_results: any[] = [];
    for (const t of attackData.targets)
    {
        const target = (await fromUuid(t.id)) as any | null;
        if (!target || target.documentName !== "Token")
        {
            ui.notifications?.error("Invalid target for damage roll");
            continue;
        }

        // Determine whether lock on was used
        let usedLockOn = false;
        if (t.setConditions)
        {
            usedLockOn = t.setConditions.lockOn === false ? true : false;
        }

        hit_results.push({
            target: target,
            total: t.total,
            usedLockOn,
            hit: t.hit,
            crit: t.crit,
        });
    }

    // Collect damage from the item
    const damage: any[] = [];
    const bonus_damage: any[] = [];
    if (attackData.invade)
    {
        damage.push({ type: "Heat", val: "2" });
    }

    // Start a damage flow, prepopulated with the attack data
    const flow = new ((game.lancer.flows as any).get("DamageRollFlow") as any)(item ? item.uuid : attackData.attackerUuid, {
        title: `${item?.name || actor.name} DAMAGE`,
        configurable: true,
        invade: attackData.invade,
        hit_results,
        has_normal_hit: hit_results.some(hr => hr.hit && !hr.crit),
        has_crit_hit: hit_results.some(hr => hr.crit),
        damage,
        bonus_damage,
    });
    flow.begin();
}

/**
 * This function is attached to damage application buttons in chat. It performs calls
 * LancerActor.damageCalc to calculate and apply the final damage, and sets a flag
 * on the chat message to indicate the damage for this target has been applied.
 * @param event Click event on a button in a chat message
 */
export async function applyDamage(event: JQuery.ClickEvent)
{
    const chatMessageElement = event.currentTarget.closest(".chat-message.message");
    if (!chatMessageElement)
    {
        ui.notifications?.error("Damage application button not in chat message");
        return;
    }
    const chatMessage = game.messages?.get(chatMessageElement.dataset.messageId);
    // @ts-expect-error v10 types
    const damageData = chatMessage?.flags.lancer?.damageData as DamageFlag;
    if (!chatMessage || !damageData)
    {
        ui.notifications?.error("Damage application button has no damage data available");
        return;
    }
    const hydratedDamageTargets = damageData.targetDamageResults
        .map((tdr: { target: string; }) =>
        {
            const target = fromUuidSync(tdr.target);
            if (!target || !(target instanceof (CONFIG.Token.documentClass as any))) return null;
            return {
                ...tdr,
                target,
            };
        })
        .filter((t: any) => t !== null);
    const buttonGroup = event.currentTarget.closest(".lancer-damage-button-group");
    if (!buttonGroup)
    {
        ui.notifications?.error("No target for damage application");
        return;
    }
    const data = buttonGroup.dataset;
    if (!data.target)
    {
        ui.notifications?.error("No target for damage application");
        return;
    }
    let multiple: number = 1;
    const multipleSelect = buttonGroup.querySelector("select");
    if (multipleSelect)
    {
        multiple = parseFloat(multipleSelect.value);
        multiple = Number.isNaN(multiple) ? 1 : multiple;
    }
    const addBurn = data.addBurn === "true";
    const isCrit = data.crit === "true";
    const isHit = data.hit === "true";
    const target = await fromUuid(data.target) as any;
    if (!target || !(target instanceof (CONFIG.Token.documentClass as any)))
    {
        ui.notifications?.error("Invalid target UUID for damage application");
        return;
    }
    const actor = target.actor;
    if (!actor || !(actor instanceof (CONFIG.Actor.documentClass as any)))
    {
        ui.notifications?.error("Invalid target for damage application, no actor found");
        return;
    }
    if (!actor.owner)
    {
        ui.notifications?.error("You cannot apply damage to an actor you do not own");
        return;
    }

    // Find target-specific damage data
    const targetDamage = hydratedDamageTargets.find((tdr: { target: { uuid: any; }; }) => tdr?.target?.uuid === data.target);
    if (!targetDamage) return;

    // Apply the damage to the target
    await actor.damageCalc(
        new AppliedDamage(targetDamage.damage.map((d: { type: any; amount: { toString: () => any; }; }) => new Damage({ type: d.type, val: d.amount.toString() }))),
        { multiple, addBurn, ap: targetDamage.ap, paracausal: targetDamage.paracausal }
    );
}

export async function undoDamage(event: JQuery.ClickEvent)
{
    const chatMessageElement = event.currentTarget.closest(".chat-message.message");
    if (!chatMessageElement)
    {
        ui.notifications?.error("Damage undo button not in chat message");
        return;
    }
    const chatMessage = game.messages?.get(chatMessageElement.dataset.messageId);
    if (!chatMessage)
    {
        ui.notifications?.error("Damage undo button has no chat message");
        return;
    }
    const target = await fromUuid(event.currentTarget.dataset?.uuid) as any;
    if (!target || !(target instanceof (CONFIG.Actor.documentClass as any)))
    {
        ui.notifications?.error("Damage undo button has no target");
        return;
    }
    if (!target.owner)
    {
        ui.notifications?.error("You cannot undo damage to an actor you do not own");
        return;
    }
    const overshieldDelta = parseInt(event.currentTarget.dataset.overshieldDelta);
    const hpDelta = parseInt(event.currentTarget.dataset.hpDelta);
    const burnDelta =
        event.currentTarget.dataset.addBurn === "true" ? parseInt(event.currentTarget.dataset.burnDelta) : 0;
    const heatDelta = parseInt(event.currentTarget.dataset.heatDelta);
    if (!overshieldDelta && !hpDelta && !burnDelta && !heatDelta)
    {
        ui.notifications?.error("Damage undo button has no damage to undo!");
        return;
    }

    const updateData: any = {
        system: {
            "overshield.value": target.system.overshield.value + overshieldDelta,
            "hp.value": target.system.hp.value + hpDelta,
            burn: target.system.burn - burnDelta,
        },
    };
    if (target.is_mech() || target.is_npc() || target.is_deployable())
    {
        updateData.system["heat.value"] = target.system.heat.value - heatDelta;
    }
    // @ts-expect-error v10 types
    const cmDoc = new DOMParser().parseFromString(chatMessage.content, "text/html");
    cmDoc.querySelectorAll(".lancer-damage-undo").forEach((el: Element) => el.remove());
    cmDoc.querySelectorAll("span").forEach((el: Element) => el.classList.add("strikethrough"));
    const newChatMessageContent = cmDoc.body.innerHTML;
    // .replace(/<a.*?lancer-damage-undo.*?<\/a>/, "")
    // .replace(/<span>/, `<span style="text-decoration: line-through; opacity: 0.8;>`);

    await target.update(updateData);
    await chatMessage.update({ content: newChatMessageContent });
}