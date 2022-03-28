import {GameRepositoryInterface} from "./GameRepositoryInterface";
import {Game} from "../../domain/models/game";
import {Id} from "../../domain/models/valueObject/id";
import {GameFactory} from "../../domain/factories/GameFactory";
import {Board} from "../../domain/models/game/board";
import {State} from "../../domain/models/game/state";
import {GameDataInterface} from "../../domain/interfaces/game/GameDataInterface";
import {Sign} from "../../domain/models/game/sign";
import {Injectable} from "@nestjs/common";

require("json-circular-stringify");

@Injectable()
export class GameFileRepository implements GameRepositoryInterface {

    private fs = require('fs');
    private readonly dbPath = `${__dirname}/../../../var/db/`;

    findGameById(id: Id): Promise<Game|{}> {
        return this.readFileContent(id).then(jsonData => {
            const gameData = JSON.parse(jsonData) as any;

            const game = GameFactory.createGameFromState(
                gameData._id.value,
                gameData.board as Board,
                gameData.state as State,
                gameData.players.players,
                gameData.players.currentPlayerIndex
            );

            return game;
        }).catch(error => {
            return null;
        })
    }

    private readFileContent(id: Id): Promise<string> {
        return new Promise((resolve, reject) => {
            this.fs.readFile(`${this.dbPath}${id}.json`, "utf-8", (err: string | undefined, data: any) => {
                if (err) {
                    reject(err);
                }

                resolve(data);
            });
        });
    }

    persistGame(game: Game): void {
        this.fs.writeFile(`${this.dbPath}${game.id}.json`,JSON.stringify(game), function(err: any) {
            console.error(err);
        });

    }
}