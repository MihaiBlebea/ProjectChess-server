import { Game, IGameRepository, IPieceRepository, Player, Color } from './../../Domain'
import { IBaseResponse } from './../Shared'
import LoadGameError from './LoadGameError'


export default class LoadGame
{
    constructor(
        private _gameRepo : IGameRepository, 
        private _pieceRepo : IPieceRepository,
        private _response : IBaseResponse<Game>
    ){ 
        //
    }

    async execute(gameId : number)
    {
        try {
            let game   = await this._gameRepo.getGame(gameId)
            if(!game)
            {
                throw new LoadGameError(`Game with id ${ gameId } was not found`)
            }
            let pieces = await this._pieceRepo.getGamePieces(gameId)
            if(!pieces)
            {
                throw new LoadGameError(`Pieces for game with id ${ gameId } were not found`)
            }

            let whitePieces = pieces.filter((piece)=> piece.color.is('white'))
            let blackPieces = pieces.filter((piece)=> piece.color.is('black'))

            let white = new Player(new Color('white'), whitePieces)
            let black = new Player(new Color('black'), blackPieces)

            game.loadGame(white, black, game.currentRound)

            return this._response.respond(game)
        } catch(error) {
            console.log(error)
            throw error
        }
    }
}