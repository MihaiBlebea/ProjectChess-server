import { Player, Color, Position, IGameRepository, IPieceRepository } from './../../Domain'
import MovePieceError from './MovePieceError'


export default class MovePiece
{
    constructor(
        private _gameRepo : IGameRepository, 
        private _pieceRepo : IPieceRepository
    ){
        //
    }

    async execute(gameId : number, oldPosition : string, newPosition : string)
    {
        try {
            let game = await this._gameRepo.getGame(gameId)
            if(!game)
            {
                throw new MovePieceError(`Game with id ${ gameId } was not found`)
            }
            let pieces = await this._pieceRepo.getGamePieces(gameId)
            if(!pieces)
            {
                throw new MovePieceError(`Pieces for game with id ${ gameId } were not found`)
            }

            let whitePieces = pieces.filter((piece)=> piece.color.is('white'))
            let blackPieces = pieces.filter((piece)=> piece.color.is('black'))

            let white = new Player(new Color('white'), whitePieces)
            let black = new Player(new Color('black'), blackPieces)

            game.loadGame(white, black, game.currentRound)

            game.move(Position.parseFromString(oldPosition), Position.parseFromString(newPosition))

            // Save new piece positions
            let movedPiece = game.getPieceByPosition(Position.parseFromString(newPosition))
            await this._pieceRepo.update(movedPiece)

            await this._gameRepo.update(game)

        } catch(error) {
            console.log(error)
            throw error
        }
    }
}