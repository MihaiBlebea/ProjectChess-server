import {
    Pawn,
    Rook,
    Knight,
    Bishop,
    Queen,
    King,
    Piece } from './Pieces'
import Color from './Color'
import Position from './Position'
import { InvalidPieceError } from './Errors'



export default class Player
{
    private _pieces : Piece[] = []

    private _score = 0

    private _color : Color


    constructor(color : Color, pieces? : Piece[])
    {
        this._color = color
        if(!pieces)
        {
            this.deployPieces()
        } else {
            this.addPieces(pieces)
        }
    }

    private deployPieces()
    {
        // Deploy pawns
        let firstRow : number
        let secondRow : number
        if(this.color.is('white'))
        {
            firstRow = 2
            secondRow = 1
        } else {
            firstRow = 7
            secondRow = 8
        }

        // Add pawns
        for(let column = 1; column <= 8; column++)
        {
            let position = new Position(column, firstRow)
            let piece = new Pawn(this.color, position)
            this.addPiece(piece)
        }

        // Add rocks
        let rookRows = [1, 8]
        rookRows.forEach((row : number)=> {
            let position = new Position(row, secondRow)
            let piece = new Rook(this.color, position)
            this.addPiece(piece)
        })

        // Add knights
        let knightRows = [2, 7]
        knightRows.forEach((row : number)=> {
            let position = new Position(row, secondRow)
            let piece = new Knight(this.color, position)
            this.addPiece(piece)
        })

        // Add valets
        let bishopRows = [3, 6]
        bishopRows.forEach((row : number)=> {
            let position = new Position(row, secondRow)
            let piece = new Bishop(this.color, position)
            this.addPiece(piece)
        })

        // Add queen
        let queenPosition = new Position(4, secondRow)
        let queen = new Queen(this.color, queenPosition)
        this.addPiece(queen)

        let kingPosition = new Position(5, secondRow)
        let king = new King(this.color, kingPosition)
        this.addPiece(king)
    }

    get color()
    {
        return this._color
    }

    get pieces()
    {
        return this._pieces
    }

    get score()
    {
        return this._score
    }

    addPiece(piece : Piece)
    {
        this._pieces.map((playerPiece)=> {
            if(playerPiece.equal(piece))
            {
                throw new InvalidPieceError(`Piece ${ piece.name } at position ${ piece.position.column }-${ piece.position.row } already exists`)
            }
        })
        this._pieces.push(piece)
    }

    addPieces(pieces : Piece[])
    {
        pieces.map((piece)=> {
            this.addPiece(piece)
        })
    }

    removePiece(piece : Piece)
    {
        this._pieces = this._pieces.filter((playerPiece)=> {
            return !playerPiece.equal(piece)
        })
    }

    getPieceAtPosition(position : Position)
    {
        let found = this.pieces.filter((piece)=> {
            return piece.position.equal(position)
        })[0]

        return found ? found : null
    }
}