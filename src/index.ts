import dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/../.env' })

import express from 'express'
import Container from './Infrastructure/Container/Container'

let app = express()


app.post('/game/new', async (request, response)=> {
    try {
        let startGameService = Container.get('StartGame')
        await startGameService.execute()

        return response.status(200).json({
            code: 200,
            text: 'Game has started'
        })
    } catch(error) {
        return response.status(500).json({
            code: 500,
            text: error.message
        })
    }
})

app.delete('/game/delete/:id', async (request, response)=> {
    try {
        let deleteGameService = Container.get('DeleteGame')
        await deleteGameService.execute(request.params.id)

        return response.status(200).json({
            code: 200,
            text: 'Game was deleted'
        })
    } catch(error) {
        return response.status(500).json({
            code: 500,
            text: error.message
        })
    }
})

app.get('/games', async (request, response)=> {
    try {
        let listGamesService = Container.get('ListGames')
        let games = await listGamesService.execute()

        return response.status(200).json({
            code: 200,
            text: 'List all games',
            games: games
        })
    } catch(error) {
        return response.status(500).json({
            code: 500,
            text: error.message
        })
    }
})

app.get('/game/load/:id', async (request, response)=> {
    try {
        let loadGameService = Container.get('LoadGame')
        let game = await loadGameService.execute(request.params.id)

        return response.status(200).json({
            code: 200,
            text: 'Load one game',
            game: game
        })
    } catch(error) {
        return response.status(500).json({
            code: 500,
            text: error.message
        })
    }
})

app.get('/game/:id/move', async (request, response)=> {
    try {
        if(!request.query.from)
        {
            throw Error('Query param "from" is missing from call')
        }

        if(!request.query.to)
        {
            throw Error('Query param "to" is missing from call')
        }
        
        let movePieceService = Container.get('MovePiece')
        await movePieceService.execute(request.params.id, request.query.from, request.query.to)

        return response.status(200).json({
            code: 200,
            text: 'Piece was moved',
        })
    } catch(error) {
        return response.status(500).json({
            code: 500,
            text: error.message
        })
    }
})


app.listen(3000, ()=> {
    console.log('App started on port 3000')
})

// import {
//     Player,
//     Piece,
//     Color,
//     Position,
//     Game
// } from './Domain'
// import { start } from 'repl';

// // let white = new Player(new Color("white"))

// // let knight = new Piece('knight', new Color('white'), new Position('A', 1))
// // let rock = new Piece('rock', new Color('white'), new Position('A', 2))


// // white.addPiece(knight)
// // white.addPiece(rock)
// // white.addPiece(rock)

// // white.addPieces([
// //     rock,
// //     knight
// // ])

// // white.removePiece(rock)

// // console.log(white)

// let game = new Game()

// game.move(new Position(5, 2), new Position(5, 4))
// game.move(new Position(2, 7), new Position(2, 5))
// game.move(new Position(5, 1), new Position(5, 2))


// game.playerTurn

// game.table.map((piece)=> {
//     console.log(piece.name, piece.position.row, piece.position.column)
// })

// // A-1
// // B-2
// // C-3
// // D-4
// // E-5

// // B-7
// // C-6
// // D-5

