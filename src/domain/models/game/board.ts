import {Field} from "./board/field";
import {Move} from "../valueObject/move";
import {Sign} from "./sign";
import {PlayerBoardInterface} from "../../interfaces/game/board/playerBoardInterface";

export class Board implements PlayerBoardInterface
{
    private _area: Field[] = [];

    constructor(numberOfItems = 9) {
        for (let i = 0; i < numberOfItems; i++) {
            this._area.push(new Field(Sign.n));
        }
    }

    registerAction(move: Move, sign: Sign) {
        const field = this._area[move.index];
        if(field === undefined) {
            throw new Error(`Cannot place a move. Area[${move.index}] does not exists`);
        }
        field.setSign(sign);
    }

    /**
     * @todo refactor this, check index alternative
     * @param index
     */
    getSignByIndex(index: number): Sign {
        const field = this._area[index];

        if (field === undefined) {
            throw new Error(`Cannot place a move. Area[${index}] does not exists`);
        }

        return this._area[index].sign as Sign;
    }

    hasAnySpaceLeft(): boolean {
        return this._area.filter(field => field.sign === Sign.n).length > 0;
    }

    runOutOfSpace(): boolean {
        return this.hasAnySpaceLeft() === false;
    }

    get area(): Field[] {
        return this._area;
    }

    set area(fields: Field[]) {
        this._area = fields;
    }
}