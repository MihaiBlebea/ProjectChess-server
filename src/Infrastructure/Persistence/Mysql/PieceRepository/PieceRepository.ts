import Context from './../Context'
import BaseRepository from './../BaseRepository'
import PieceTransformer from './PieceTransformer'
import { Piece, IPieceRepository } from './../../../../Domain'


export default class PieceRepository extends BaseRepository<Piece> implements IPieceRepository
{
    constructor(private context : Context)
    {
        super(context)
    }

    async getGamePieces(gameId : number)
    {
        this._context.connect()
        let pieces = await this._context.query('SELECT * FROM pieces WHERE game_id = ?', [ gameId ])
        this._context.complete()

        return PieceTransformer.toModel(pieces)
    }

    async addGamePieces(gameId : number, pieces : Piece[])
    {
        let raws = pieces.map((piece)=> {
            return {
                ...PieceTransformer.toRaw(piece),
                game_id: gameId
            }
        })

        let columns = Object.keys(raws[0])

        let values = raws.map((raw)=> {
            return Object.values(raw)
        })

        this._context.connect()
        await this._context.query(`INSERT INTO pieces (${ columns }) VALUES ?`, [ values ])
        this._context.complete()
    }

    async removeGamePieces(gameId : number)
    {
        this._context.connect()
        await this._context.query('DELETE FROM pieces WHERE game_id = ?', [ gameId ])
        this._context.complete()
    }

    async update(model : Piece)
    {
        if(!model.id)
        {
            throw Error('Id on model is undefined')
        }
        let raw = PieceTransformer.toRaw(model)
        let pairs = Object.keys(raw).map((key)=> {
            return `${ key } = ?`
        }).join(',')
        let values = Object.values(raw)
        
        this._context.connect()
        let result = await this._context.query(`UPDATE pieces SET ${ pairs } WHERE id = ?`, [ ...values, model.id ])
        this._context.complete()

        return result.changedRows > 0 ? true : false
    }
}