import { Container } from 'typescript-dependency-injection'
import RedisCache from './../Cache/RedisCache'
import Context from './../Persistence/Mysql/Context'
import GameRepository from './../Persistence/Mysql/GameRepository/GameRepository'
import PieceRepository from './../Persistence/Mysql/PieceRepository/PieceRepository'
import { StartGame, DeleteGame, ListGames, ListGamesResponse, LoadGame, LoadGameResponse, MovePiece } from './../../Application'


let container = new Container()

container.register(RedisCache)
         .dependsOnString(process.env.REDIS_HOST!)
         .dependsOnString(process.env.REDIS_PORT!)

container.register(Context)
         .dependsOnString(process.env.MYSQL_HOST!)
         .dependsOnString(process.env.MYSQL_DATABASE!)
         .dependsOnString(process.env.MYSQL_USERNAME!)
         .dependsOnString(process.env.MYSQL_PASSWORD!)
         .dependsOnNumber(parseInt(process.env.MYSQL_PORT!))

container.register(GameRepository)
         .dependsOnClass('Context')

container.register(PieceRepository)
         .dependsOnClass('Context')

container.register(StartGame)
         .dependsOnClass('GameRepository')
         .dependsOnClass('PieceRepository')

container.register(DeleteGame)
         .dependsOnClass('GameRepository')
         .dependsOnClass('PieceRepository')

container.register(ListGames)
         .dependsOnClass('GameRepository')
         .dependsOn(()=> new ListGamesResponse() )

container.register(LoadGame)
         .dependsOnClass('GameRepository')
         .dependsOnClass('PieceRepository')
         .dependsOn(()=> new LoadGameResponse())

container.register(MovePiece)
         .dependsOnClass('GameRepository')
         .dependsOnClass('PieceRepository')

export default container