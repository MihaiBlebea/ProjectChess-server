export default class InvalidGameError extends Error
{
    constructor(message : string)
    {
        super(message)
        this.name = 'InvalidGameError'
    }
}