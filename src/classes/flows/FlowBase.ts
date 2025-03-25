export abstract class FlowBase
{
    private static instances: Map<new () => FlowBase, FlowBase> = new Map();

    protected constructor()
    {
        const constructor = this.constructor as new () => FlowBase;
        if (FlowBase.instances.has(constructor))
        {
            throw new Error("Lancer Alternative Sheets: Use getInstance() to access the instance.");
        }
        FlowBase.instances.set(constructor, this);
    }

    static getInstance<T extends FlowBase>(this: new () => T): T
    {
        if (!FlowBase.instances.has(this))
        {
            FlowBase.instances.set(this, new this());
        }
        return FlowBase.instances.get(this) as T;
    }

    abstract setupFlow(): any;
    abstract setupFlowSteps(): any[];
    abstract startFlow(uuid: string, data: any): void;
}