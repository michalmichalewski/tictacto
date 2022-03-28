import {Sign} from "../game/sign";

export class Move {
    private readonly _index: number;

    constructor(index: number) {
        this._index = index;
    }

    get index() {
        return this._index;
    }


}