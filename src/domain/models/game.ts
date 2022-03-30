import {Board} from "./game/board";
import {Player} from "./game/player";
import {State} from "./game/state";
import {Id} from "./valueObject/id";
import {Move} from "./valueObject/move";
import {Players} from "./game/players";
import {PlayerBoardInterface} from "../interfaces/game/board/playerBoardInterface";
import {Sign} from "./game/sign";
import {GameStateInterface} from "../interfaces/game/GameStateInterface";

export class Game implements GameStateInterface {
    private _id: Id;
    private readonly board: Board;

    private players: Players;
    private state: State

    private finishedStates = [State.TIE, State.O_WIN, State.X_WIN];

    constructor(
        id: Id,
        board: Board,
        state: State,
        players: Players,
    ) {
        this._id = id;
        this.board = board;
        this.state = state;
        this.players = players
    }

    get id() {
        return this._id.toString();
    }

    join(player: Player): boolean {
        this.players.add(player);
        return true;
    }

    getPlayerBySign(sign: Sign): Player {
        return this.players.findBySign(sign);
    }

    boardState(): PlayerBoardInterface {
        return this.board;
    }

    makeMove(move: Move, sign: Sign) {
        if(this.isFinished(this.state)) {
            throw new Error('Cannot make move. Game finished');
        }
        if(!this.players.canCurrentPlayerMakeAMove(sign)) {
            throw new Error('It is not your turn');
        }

        if(this.players.nextPlayer() === undefined) {
            throw new Error('You cannot play alone');
        }

        this.board.registerAction(move, sign);
        this.setState(State.IN_PROGRESS);
        this.players.changeCurrentPlayer();
    }

    isFinished(state: State): boolean {
        return this.finishedStates.includes(state);
    }

    setState(state: State) {
        this.state = state;
    }

    getState() {
        return this.state;
    }

}