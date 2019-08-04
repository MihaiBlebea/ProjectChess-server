import { Color, Position, Piece, Pawn, Rook, Knight, Bishop, Queen, King } from './../../../../Domain'


type Row = { [key: string]: any }

export default abstract class PieceTransformer 
{
    static toModel(rows: Row[]) 
    {
        return rows.map((row)=> {
            let color = new Color(row.player)
            let position = new Position(row.position_column, row.position_row)
            switch(row.type)
            {
                case 'pawn':
                    return new Pawn(color, position, row.id)
                case 'rook':
                    return new Rook(color, position, row.id)
                case 'knight':
                    return new Knight(color, position, row.id)
                case 'bishop':
                    return new Bishop(color, position, row.id)
                case 'queen':
                    return new Queen(color, position, row.id)
                case 'king':
                    return new King(color, position, row.id)
                default:
                    throw Error('Piece was not recognised')
            }
        })
    }

    static toRaw(model: Piece)
    {
        let type = model.constructor.name.toLowerCase()

        return {
            id: model.id,
            player: model.color.color,
            type: type,
            position_column: model.position.column,
            position_row: model.position.row,
            updated: new Date()
        }
    }
}
