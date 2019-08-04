import Player from './../Player'
import Color from './../Color'
import Position from './../Position'
import { Piece } from './../Pieces'
import { InvalidPositionError, InvalidPieceError, InvalidPlayerError, InvalidGameError } from './../Errors'


type GameProps = {
    id : number,
    white : Player,
    black : Player,
    round : number
}

export default class Game
{
    private _id? : number

    private _round : number

    private _playerWhite : Player

    private _playerBlack : Player


    constructor(id? : number)
    {
        this._id          = id
        this._round       = 1
        this._playerWhite = new Player(new Color('white'))
        this._playerBlack = new Player(new Color('black'))
    }

    get id() : number | undefined
    {
        return this._id
    }

    get white()
    {
        return this._playerWhite
    }

    set white(white : Player)
    {
        this._playerWhite = white
    }

    get black()
    {
        return this._playerBlack
    }

    set black(black : Player)
    {
        this._playerBlack = black
    }

    get currentRound()
    {
        return this._round
    }

    set currentRound(round : number)
    {
        this._round = round
    }

    get playerTurn()
    {
        // if number is even then is black turn, if odd then is white turn
        return this._round % 2 === 0 ? this._playerBlack : this._playerWhite
    }

    get players()
    {
        return [this.white, this.black]
    }

    get table() : Piece[]
    {
        return this.white.pieces.concat(this.black.pieces)
    }

    loadGame(white : Player, black : Player, round : number)
    {
        this._playerWhite = white
        this._playerBlack = black
        this._round       = round
    }

    getPieceByPosition(position : Position) : Piece
    {
        let found = this.table.filter((piece)=> {
            return piece.position.equal(position)
        })

        if(!found || found.length === 0)
        {
            throw new InvalidPositionError(`No piece found at position ${ position.parseToString() }`)
        }
        return found[0]
    }

    move(oldPosition : Position, newPosition : Position)
    {
        // Check if the new position is not actually the old position
        if(oldPosition.equal(newPosition))
        {
            throw new InvalidPositionError('Current position is the same as the new position')
        }

        // Check if there is actually a piece at the old position
        let piece = this.table.filter((piece)=> {
            return piece.position.equal(oldPosition)
        })[0]

        if(!piece)
        {
            throw new InvalidPieceError(`Piece at position ${ oldPosition.parseToString() } not found`)
        }

        // Check if the piece belongs to the player who should move. Is your turn debil?
        if(!piece.color.is(this.playerTurn.color.color))
        {
            throw new InvalidPlayerError(`Player ${ this.playerTurn.color.color } trying to move a ${ piece.color.color } ${ piece.name }`)
        }

        // Check if the piece can actually move to the new position
        if(!piece.canMoveTo(newPosition))
        {
            let message = `${ piece.color.color } ${ piece.name } cannot move from ${ oldPosition.parseToString() } to ${ newPosition.parseToString() }`
            throw new InvalidPositionError(message)
        }

        // Check if there is a piece at the new position
        let newPositionPiece = this.table.filter((piece)=> {
            return piece.position.equal(newPosition)
        })[0]
        
        // If there is a piece at the new position, check if it's ours or other player piece
        if(newPositionPiece)
        {
            // check if it's ours ?
            if(newPositionPiece.color.is(piece.color.color))
            {
                throw new InvalidPositionError(`There is a already a piece of the same color at position ${ newPosition.parseToString() }`)
            }

            // If the piece is the other color, then take it
            if(newPositionPiece.color.is('white'))
            {
                this.white.removePiece(newPositionPiece)
            } else {
                this.black.removePiece(newPositionPiece)
            }
        }

        // Move the piece
        piece.position = newPosition
        
        // Increment the turn
        this._round++
    }
}