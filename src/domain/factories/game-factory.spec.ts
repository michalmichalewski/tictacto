import {GameFactory} from "./GameFactory";
import {Game} from "../models/game";
import {State} from "../models/game/state";
import {Sign} from "../models/game/sign";
import {Player} from "../models/game/player";

describe('Game factory', () => {
    let game: Game;
    beforeAll(() => {
        game = GameFactory.createNewGame();
    })

    describe('methods', () => {
        it('should createGameWithoutPlayers be defined', function () {
            expect(GameFactory.createGameWithoutPlayers).toBeDefined();
        });

        it('should createGameFromState be defined', function () {
            expect(GameFactory.createGameFromState).toBeDefined();
        });
    });

    it('should create new instance of game model', () => {
        expect(game).toBeInstanceOf(Game);
    });

    it('should create new instance with new status', function () {
        expect(game.getState()).toBe(State.NEW);
    });

    it('should create game with set of two players', function () {
        expect(game.getPlayerBySign(Sign.x)).toBeInstanceOf(Player);
        expect(game.getPlayerBySign(Sign.o)).toBeInstanceOf(Player);
    });
});