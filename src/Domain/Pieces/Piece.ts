import Position from './../Position'
import Color from './../Color'
import { InvalidPieceError } from './../Errors'


export default abstract class Piece
{
    private _pieces = [
        "pawn",
        "rook",
        "knight",
        "bishop",
        "king",
        "queen"
    ]

    private _id? : number

    private _name : string

    private _color : Color

    private _position : Position


    constructor(name : string, color : Color, position : Position, id? : number)
    {
        this.assertValidName(name)
        this._name     = name
        this._color    = color
        this._position = position
        this._id       = id
    }

    private assertValidName(name : string)
    {
        if(!this._pieces.includes(name))
        {
            throw new InvalidPieceError(`Piece name ${ name } is not valid`)
        }
    }
    
    get id()
    {
        return this._id
    }

    get name()
    {
        return this._name
    }

    get position()
    {
        return this._position
    }

    set position(position : Position)
    {
        this._position = position
    }

    get color()
    {
        return this._color
    }

    equal(piece : Piece)
    {
        return piece.name === this.name && this.position.equal(piece.position) && this._color.equal(piece.color)
    }

    canMoveTo(position : Position) : boolean
    {
        let result = this.availableMoves().filter((pos)=> {
            return pos.equal(position)
        })[0]

        return result ? true : false
    }
    
    abstract availableMoves() : Position[]
}