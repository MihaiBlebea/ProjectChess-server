import Piece from './Piece'
import Color from './../Color'
import Position from './../Position'


export default class Queen extends Piece
{
    constructor(color : Color, position : Position, id? : number)
    {
        super('queen', color, position, id)
    }

    availableMoves() : Position[]
    {
        let positions : Position[] = []
        if(this.color.is('white'))
        {
            if(this.position.row < 4)
            {
                for(let row = this.position.row; row < 5; row++)
                {
                    positions.push(new Position(this.position.column, row))
                }
            } else {
                positions.push(new Position(this.position.column, this.position.row + 1))
            }
        } else {
            if(this.position.row > 5)
            {
                for(let row = this.position.row; row > 4; row--)
                {
                    positions.push(new Position(this.position.column, row))
                }
            } else {
                positions.push(new Position(this.position.column, this.position.row - 1))
            }
        }
        return positions
    }
}