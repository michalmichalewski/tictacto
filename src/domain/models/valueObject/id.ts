import { v4 as uuidv4 } from 'uuid';

export class Id {
    protected value: string | undefined;

    constructor(value?: string) {
        if(value === undefined) {
            this.value = uuidv4();
        } else {
            this.value = value;
        }
    }

    equals(id: Id): boolean {
        return this.value === id.value;
    }

    toString() {
        return this.value;
    }
}