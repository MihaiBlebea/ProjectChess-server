import { Game } from './../../../../Domain'


type Row = { [key: string]: any }

export default abstract class GameTransformer 
{
    static toModel(rows: Row[]) 
    {
        return rows.map((row)=> {
            let game = new Game(row.id)
            game.currentRound = row.round
            return game
        })
    }

    static toRaw(model: Game)
    {
        return {
            id: model.id,
            round: model.currentRound
        }
    }
}
