import { InvalidRowError, InvalidColumnError, InvalidPositionError } from './Errors'


export default class Position
{
    // columns = letters
    // rows = numbers

    private _column : number

    private _row : number

    private _letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']


    constructor(column : number, row : number)
    {
        this.assertValidRow(row)
        this.assertValidColumn(column)

        this._column = column
        this._row    = row
    }

    private assertValidRow(row : number)
    {
        if(row < 1 || row > 8)
        {
            throw new InvalidRowError(`Row ${ row } is invalid`)
        }
    }

    private assertValidColumn(column : number)
    {
        if(column < 1 || column > 8)
        {
            throw new InvalidColumnError(`Column ${ column } is invalid`)
        }
    }

    get row()
    {
        return this._row
    }

    get column()
    {
        return this._column
    }

    equal(position : Position)
    {
        return this.row === position.row && this.column === position.column
    }

    static parseFromString(position : string)
    {
        let matches = position.match(/[A-G]-[1-8]/g)
        if(!matches)
        {
            throw new InvalidPositionError(`Position ${ position } is invalid`)
        }

        let column = position.split('-')[0]
        let row    = position.split('-')[1]
        
        let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        let colIndex = letters.indexOf(column)
        if(colIndex < 0)
        {
            throw new InvalidColumnError(`Column ${ column } is invalid`)
        }
        
        return new Position(colIndex + 1, parseInt(row))
    }

    parseToString()
    {
        return `${ this._letters[this._column - 1] }-${ this._row }`
    }
}