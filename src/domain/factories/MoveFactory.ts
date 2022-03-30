import {Move} from "../models/valueObject/move";
import {MakeGameMoveDto} from "../../application/dto/MakeGameMoveDto";

export class MoveFactory {
    public static create(id: number): Move {
        return new Move(id);
    }

    public static createFromDto(dto: MakeGameMoveDto): Move {
        return new Move(dto.index);
    }
}