import {Game} from "../models/game";
import {Id} from "../models/valueObject/id";
import {GameFactory} from "../factories/GameFactory";
import {GameRepositoryInterface} from "../../infractructure/repositories/GameRepositoryInterface";
import {HttpException, Injectable} from "@nestjs/common";
import {GameFileRepository} from "../../infractructure/repositories/GameFileRepository";

@Injectable()
export class GameService {

    private gameRepository;

    constructor(gameRepository: GameFileRepository) {
        this.gameRepository = gameRepository;
    }

    createNewGame() {
        return GameFactory.createNewGame();
    }

    findGameById(id: Id) {
        return this.gameRepository.findGameById(id).then(game => {
            console.log(game);
            if(game === null) {
                throw new HttpException('Not found', 404);
            }
            return game;
        });
    }

    persistState(game: Game)  {
        return this.gameRepository.persistGame(game);
    }
}