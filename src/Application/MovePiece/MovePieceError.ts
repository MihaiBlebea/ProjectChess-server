export default class MovePieceError extends Error
{
    constructor(message : string)
    {
        super(message)
        this.name = 'MovePieceError'
    }
}