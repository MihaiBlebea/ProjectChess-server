import Game from './Game'


export default interface IGameRepository
{
    add(game : Game) : Promise<number>

    getGame(id : number) : Promise<Game>

    getAllGames() : Promise<Game[]>

    remove(id : number) : Promise<void>

    update(model : Game) : Promise<boolean>
}