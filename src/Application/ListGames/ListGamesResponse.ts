import { Game } from './../../Domain'
import { IBaseResponse } from './../Shared' 

export default class ListGamesResponse implements IBaseResponse<Game>
{
    respond(payload : Game[])
    {
        return payload.map((game)=> {
            return {
                id: game.id,
                round: game.currentRound
            } 
        })
    }
}