import Piece from './Piece'
import Color from './../Color'
import Position from './../Position'


export default class Knight extends Piece
{
    constructor(color : Color, position : Position, id? : number)
    {
        super('knight', color, position, id)
    }

    availableMoves() : Position[]
    {
        let positions : Position[] = []

        // !current position 
        // 4 - 4

        // !Move up and right
        // 5 - 6
        // 6 - 5

        // !Move up and left
        // 2 - 5
        // 3 - 6

        // !Move down and right
        // 5 - 2
        // 6 - 3

        // !Move down and left
        // 2 - 3
        // 3 - 2

        // !Move up and right
        if(this.position.column + 1 < 9 && this.position.row + 2 < 9)
        {
            positions.push(new Position(this.position.column + 1, this.position.row + 2))
        }

        if(this.position.column + 2 < 9 && this.position.row + 1 < 9)
        {
            positions.push(new Position(this.position.column + 2, this.position.row + 1))
        }

        // !Move up and left
        if(this.position.column - 2 > 0 && this.position.row + 1 < 9)
        {
            positions.push(new Position(this.position.column - 2, this.position.row + 1))
        }

        if(this.position.column - 1 > 0 && this.position.row + 2 < 9)
        {
            positions.push(new Position(this.position.column - 1, this.position.row + 2))
        }

        // !Move down and right
        if(this.position.column + 1 < 9 && this.position.row - 2 > 0)
        {
            positions.push(new Position(this.position.column + 1, this.position.row - 2))
        }

        if(this.position.column + 2 < 9 && this.position.row - 1 > 0)
        {
            positions.push(new Position(this.position.column + 2, this.position.row - 1))
        }

        // !Move down and left
        if(this.position.column - 1 > 0 && this.position.row - 2 > 0)
        {
            positions.push(new Position(this.position.column - 1, this.position.row - 2))
        }

        if(this.position.column - 2 > 0 && this.position.row - 1 > 0)
        {
            positions.push(new Position(this.position.column - 2, this.position.row - 1))
        }
        
        return positions
    }
}