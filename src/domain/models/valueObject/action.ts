import {Sign} from "../game/sign";

export class Action {
    private readonly _index: number;
    private readonly _sign: Sign;

    constructor(index: number, sign: Sign) {
        this._index = index;
        this._sign = sign;
    }

    get sign() {
        return this._sign;
    }

    get index() {
        return this._index;
    }


}