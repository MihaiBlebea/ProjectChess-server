import Context from './../Context'
import BaseRepository from './../BaseRepository'
import { Game, IGameRepository } from './../../../../Domain'
import GameTransformer from './GameTransformer'


export default class GameRepository extends BaseRepository<Game> implements IGameRepository
{
    constructor(context : Context)
    {
        super(context)
    }

    async add(game : Game) : Promise<number>
    {
        let raw     = GameTransformer.toRaw(game)
        let columns = Object.keys(raw)
        let values  = Object.values(raw)

        this._context.connect()
        let result = await this._context.query(`INSERT INTO games (${ columns }) VALUES (?)`, [ values ])
        this._context.complete()

        if(!result.insertId)
        {
            throw Error('Game was not added to the database')
        }
        return result.insertId
    }

    async getGame(id : number)
    {
        this._context.connect()

        let rows = await this._context.query(`SELECT * FROM games WHERE id = ? LIMIT 1`, [ id ])

        this._context.complete()

        return GameTransformer.toModel(rows)[0]
    }

    async getAllGames()
    {
        this._context.connect()

        let rows = await this._context.query(`SELECT * FROM games`)

        this._context.complete()

        return GameTransformer.toModel(rows)
    }

    async remove(id : number)
    {
        this._context.connect()

        await this._context.query(`DELETE FROM games WHERE id = ?`, [ id ])

        this._context.complete()
    }

    async update(model : Game)
    {
        if(!model.id)
        {
            throw Error('Id on model is undefined')
        }
        let raw = GameTransformer.toRaw(model)
        let pairs = Object.keys(raw).map((key)=> {
            return `${ key } = ?`
        }).join(',')
        let values = Object.values(raw)
        
        this._context.connect()
        let result = await this._context.query(`UPDATE games SET ${ pairs } WHERE id = ?`, [ ...values, model.id ])
        this._context.complete()

        return result.changedRows > 0 ? true : false
    }
}