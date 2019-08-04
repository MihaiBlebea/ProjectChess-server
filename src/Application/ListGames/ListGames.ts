import { Game, IGameRepository } from './../../Domain'
import { IBaseResponse } from './../Shared'


export default class ListGames
{
    constructor(private _gameRepo : IGameRepository, private _response : IBaseResponse<Game>)
    {
        //
    }

    async execute()
    {
        try {
            let games = await this._gameRepo.getAllGames()
            return this._response.respond(games)
        } catch(error) {
            console.log(error)
            throw error
        }
    }
}