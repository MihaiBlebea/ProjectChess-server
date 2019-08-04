import { IGameRepository, IPieceRepository } from './../../Domain'


export default class DeleteGame
{
    constructor(
        private _gameRepo : IGameRepository, 
        private _pieceRepo : IPieceRepository
    ){
        //
    }

    async execute(gameId : number)
    {
        try {
            await this._gameRepo.remove(gameId)
            await this._pieceRepo.removeGamePieces(gameId)
            
        } catch(error) {
            console.log(error)
            throw error
        }
    }
}