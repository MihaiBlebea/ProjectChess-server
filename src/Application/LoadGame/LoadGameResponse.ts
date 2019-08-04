import { IBaseResponse } from './../Shared'
import { Game, Piece } from './../../Domain'


export default class LoadGameResponse implements IBaseResponse<Game>
{
    respond(payload : Game)
    {
        let white = payload.white.pieces.map((piece)=> {
            return this.parsePiece(piece)
        })
        let black = payload.black.pieces.map((piece)=> {
            return this.parsePiece(piece)
        })
        
        return {
            id: payload.id,
            round: payload.currentRound,
            white: white,
            black: black
        }
    }

    private parsePiece(piece : Piece)
    {
        return {
            name: this.capitalize(piece.name),
            position: piece.position.parseToString()
        }
    }

    private capitalize(name : string)
    {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }
}