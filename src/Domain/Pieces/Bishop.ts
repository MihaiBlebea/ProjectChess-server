import Piece from './Piece'
import Color from './../Color'
import Position from './../Position'


export default class Bishop extends Piece
{
    constructor(color : Color, position : Position, id? : number)
    {
        super('bishop', color, position, id)
    }

    availableMoves() : Position[]
    {
        let positions : Position[] = []

        /// column - 1, row - 1 => move down and left
        // column + 1, row - 1 => moving down and right

        // column - 1, row + 1 => move up and left
        // column + 1, row + 1 => move up and right

        // Move down and left
        for(let i = this.position.column - 1, j = this.position.row - 1; i > 0 && j > 0; i--, j--)
        {
            positions.push(new Position(i, j))
        }

        // Move down and right
        for(let i = this.position.column + 1, j = this.position.row - 1; i < 9 && j > 0; i++, j--)
        {
            positions.push(new Position(i, j))
        }

        // Move up and left
        for(let i = this.position.column - 1, j = this.position.row + 1; i > 0 && j < 9; i--, j++)
        {
            positions.push(new Position(i, j))
        }

        // Move up and right
        for(let i = this.position.column + 1, j = this.position.row + 1; i < 9 && j < 9; i++, j++)
        {
            positions.push(new Position(i, j))
        }
        return positions
    }
}