export default class InvalidColumnError extends Error
{
    constructor(message : string)
    {
        super(message)
        this.name = 'InvalidColumnError'
    }
}