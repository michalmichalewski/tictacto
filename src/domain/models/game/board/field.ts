import {Sign} from "../sign";

export class Field {
    private _sign: Sign

    constructor(sign: Sign) {
        this._sign = sign;
    }

    setSign(sign: Sign) {
        if(this.isNotAvailable()) {
            throw new Error('Cannot place sign in current field. Field has value');
        }

        this._sign = sign;
    }

    get sign(): Sign {
        return this._sign;
    }

    isAvailable(): boolean {
        return this._sign === Sign.n;
    }

    isNotAvailable(): boolean {
        return !this.isAvailable();
    }
}