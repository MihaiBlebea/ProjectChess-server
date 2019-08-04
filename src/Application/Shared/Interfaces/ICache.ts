export default interface ICache
{
    connect() : void

    close() : void

    deleteKey(key : string) : Promise<boolean>

    existKey(key : string) : Promise<boolean>

    expireKey(key : string, seconds : number) : Promise<boolean>

    pushInList(key : string, value : string) : Promise<boolean>
}