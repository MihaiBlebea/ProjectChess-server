import Piece from './Piece'
import Color from './../Color'
import Position from './../Position'


export default class King extends Piece
{
    constructor(color : Color, position : Position, id? : number)
    {
        super('king', color, position, id)
    }

    availableMoves() : Position[]
    {
        let positions : Position[] = []
        
        // !Current position
        // 4 - 4

        // !Move left
        // 3 - 4
        if(this.position.column - 1 > 0)
        {
            positions.push(new Position(this.position.column - 1, this.position.row))
        }

        // !Move right
        // 5 - 4
        if(this.position.column + 1 < 9)
        {
            positions.push(new Position(this.position.column + 1, this.position.row))
        }
    
        // !Move up
        // 4 - 5
        if(this.position.row + 1 < 9)
        {
            positions.push(new Position(this.position.column, this.position.row + 1))
        }

        // !Move down
        // 4 - 3
        if(this.position.row - 1 > 0)
        {
            positions.push(new Position(this.position.column, this.position.row - 1))
        }
    
        // !Move up - left
        // 3 - 5
        if(this.position.column - 1 > 0 && this.position.row + 1 < 9)
        {
            positions.push(new Position(this.position.column - 1, this.position.row + 1))
        }

        // !Move up - right
        // 5 - 5
        if(this.position.column + 1 < 9 && this.position.row + 1 < 9)
        {
            positions.push(new Position(this.position.column + 1, this.position.row + 1))
        }

        // !Move down - left
        // 3 - 3
        if(this.position.column - 1 > 0 && this.position.row - 1 > 0)
        {
            positions.push(new Position(this.position.column - 1, this.position.row - 1))
        }

        // !Move down - right
        // 5 - 3
        if(this.position.column + 2 < 9 && this.position.row - 1 > 0)
        {
            positions.push(new Position(this.position.column + 2, this.position.row - 1))
        }

        console.log(positions)
        return positions
    }
}