import Piece from './Piece'


export default interface IPieceRepository
{
    getGamePieces(gameId : number) : Promise<Piece[]>

    addGamePieces(gameId: number, pieces : Piece[]) : Promise<void>

    removeGamePieces(gameId : number) : Promise<void>

    update(model : Piece) : Promise<boolean>
}