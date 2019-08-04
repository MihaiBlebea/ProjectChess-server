import { Game, IGameRepository, IPieceRepository } from './../../Domain'

export default class StartGame
{
    constructor(
        private _gameRepo : IGameRepository,
        private _pieceRepo : IPieceRepository
    ){
        //
    }

    async execute()
    {
        try {
            let game = new Game()

            let gameId = await this._gameRepo.add(game)

            await this._pieceRepo.addGamePieces(gameId, game.table)

        } catch(error) {
            console.log(error)
            throw error
        }
    }
}