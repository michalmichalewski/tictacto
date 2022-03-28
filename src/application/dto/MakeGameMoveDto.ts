export class MakeGameMoveDto {
    public _index: number;
    public _sign: string;
    public _id: string;

    constructor(gameId: string, index: number, sign: string) {
        this.id = gameId;
        this.index = index;
        this.sign = sign;
    }

    set id(id: string) {
        if(id.length === 0) {
            throw new Error('id cannot be null');
        }
        this._id = id;
    }

    set index(index: number) {
        if (!(index > 0 && index < 9)) {
            throw new Error('Index must be between [0,8]')
        }
        this._index = index;
    }

    set sign(sign: string) {
        if (!['o', 'x'].includes(sign)) {
            throw new Error('sign must be one of [x,o]');
        }

        this._sign = sign;
    }

}