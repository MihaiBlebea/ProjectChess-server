export default class InvalidPieceError extends Error
{
    constructor(message : string)
    {
        super(message)
        this.name = 'InvalidPieceError'
    }
}