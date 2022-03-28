import {Game} from "../../domain/models/game";
import {Id} from "../../domain/models/valueObject/id";
import {GameDataInterface} from "../../domain/interfaces/game/GameDataInterface";

export interface GameRepositoryInterface {
    findGameById(id: Id): Promise<Game|{}>;
    persistGame(game: Game): void;
}