import dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/../.env' })

import Container from './Infrastructure/Container/Container'
import { Game } from './Domain'

let gameRepo = Container.get('GameRepository')

const run = async ()=> {
    let game = new Game()
    await gameRepo.add(game)
    let games = await gameRepo.getAll()

    console.log(game)

}

run()