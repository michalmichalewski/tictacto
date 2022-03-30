import {Game} from "../models/game";
import {Board} from "../models/game/board";
import {State} from "../models/game/state";
import {Id} from "../models/valueObject/id";
import {Player} from "../models/game/player";
import {Field} from "../models/game/board/field";
import {Sign} from "../models/game/sign";
import {Players} from "../models/game/players";
import {PlayerFactory} from "./PlayerFactory";

export class GameFactory {

    static createGameWithoutPlayers(boardSize: number = 9)
    {
        return new Game(
            new Id(),
            new Board(boardSize),
            State.NEW,
            new Players()
        );
    }

    static createNewGame(boardSize: number = 9): Game {
        const game = new Game(
            new Id(),
            new Board(boardSize),
            State.NEW,
            new Players()
        );

        game.join(PlayerFactory.createXPlayer())
        game.join(PlayerFactory.createOPlayer());

        return game;
    }

    static createGameFromState(
        id: string,
        inputBoard: any,
        state: State,
        players: Array<any>,
        currentPlayerIndex: number
    ): Game {
        const board = new Board();
        board.area = inputBoard._area.map((field: { _sign: Sign; }) => {
            return new Field(field._sign);
        })

        const game = new Game(
            new Id(id),
            board,
            state,
            new Players(currentPlayerIndex)
        );

        players.map(_player => {
            const player = new Player(_player.sign);
            player.joinGame(game);
        })

        return game;
    }
}