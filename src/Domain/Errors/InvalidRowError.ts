export default class InvalidRowError extends Error
{
    constructor(message : string)
    {
        super(message)
        this.name = 'InvalidRowError'
    }
}