import { InvalidColorError } from './Errors'


export default class Color
{
    private _color : string

    private _validColors = ["white", "black"]

    constructor(color : string)
    {
        this.assertValidColor(color)
        this._color = color
    }

    private assertValidColor(color : string)
    {
        if(!this._validColors.includes(color))
        {
            throw new InvalidColorError(`Color ${ color } is invalid`)
        }
    }

    get color()
    {
        return this._color
    }

    get oppositeColor() : Color
    {
        return this._color === 'white' ? new Color('black') : new Color('white')
    }

    is(color : string)
    {
        return this.color === color
    }

    equal(color : Color)
    {
        return color.color === this.color
    }
}