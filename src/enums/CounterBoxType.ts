export enum CounterBoxType
{
    Counter = "counter-hex",
    Limited = "uses-hex",
    Loaded = "la-loaded-hex", // A dummy type; the system's event handler cannot be used
    Charged = "charged-hex",
}