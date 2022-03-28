import {PlayerBoardInterface} from "./board/playerBoardInterface";
import {State} from "../../models/game/state";

export interface GameStateInterface {
    boardState(): PlayerBoardInterface;
    setState(state: State): void;
}