export default class LoadGameError extends Error
{
    constructor(message : string)
    {
        super(message)
        this.name = 'LoadGameError'
    }
}