import {Sign} from "./sign";
import {Game} from "../game";
import {Move} from "../valueObject/move";

export class Player {
    sign: Sign;
    game: Game | undefined;

    constructor(sign: Sign) {
        this.sign = sign
    }

    joinGame(game: Game): void {

        if (this.game !== undefined) {
            throw new Error(`You're in the game!`);
        }

        game.join(this);
        this.game = game;
    }

    isOwnerOf(sign: Sign) {
        return this.sign === sign;
    }

    makeMove(move: Move): void {
        if (this.game === undefined) {
            throw new Error(`Player didn't join the game`);
        }

        this.game.makeMove(move, this.sign);
    }

    giveUp() {
        throw new Error('Unsupported method');
    }
}