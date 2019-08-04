import Piece from './Piece'
import Color from './../Color'
import Position from './../Position'


export default class Rook extends Piece
{
    constructor(color : Color, position : Position, id? : number)
    {
        super('rook', color, position, id)
    }

    availableMoves() : Position[]
    {
        let positions : Position[] = []
        
        // Move horizontaly
        for(let column = 1; column <= 8; column++)
        {
            if(this.position.column !== column)
            {
                positions.push(new Position(column, this.position.row))
            }
        }

        // Move verticaly
        for(let row = 1; row <= 8; row++)
        {
            if(this.position.row !== row)
            {
                positions.push(new Position(this.position.column, row))
            }
        }
        return positions
    }
}