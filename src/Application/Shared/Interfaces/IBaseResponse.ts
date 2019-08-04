export default interface IBaseResponse<T>
{
    respond(payload : T | T[]) : any
}