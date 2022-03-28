import {Game} from "../models/game";
import {PlayerBoardInterface} from "../interfaces/game/board/playerBoardInterface";
import {Verdict} from "../models/valueObject/verdict";
import {Sign} from "../models/game/sign";
import {State} from "../models/game/state";

export class GameProgresListener {

    private winnerStateMap = {
        [Sign.x] : State.X_WIN,
        [Sign.o] : State.O_WIN
    }

    gameStateHaveChanged(game: Game) {
        const board = game.boardState();

        const winningCombinations = [
            ...this.rowCombinationStrategy(),
            ...this.columnCombinationStrategy(),
            ...this.diagonalCombinationStrategy()
        ];

        for(let combinationNumber = 0; combinationNumber < winningCombinations.length; combinationNumber++) {
            let verdict = this.findAWinner(board,winningCombinations[combinationNumber]);
            const winner = verdict.isWinner();

            if(winner) {
                // @ts-ignore
                game.setState(this.winnerStateMap[winner]);
            }
        }

        if(board.runOutOfSpace() && game.getState() === State.IN_PROGRESS) {
            game.setState(State.TIE);
        }

        return game;
    }

    private findAWinner(board: PlayerBoardInterface, combination: Array<number>) {
        let verdict = new Verdict();

        combination.map(filledIndex => {
            const sign = board.getSignByIndex(filledIndex)
            verdict = verdict.addCount(sign);
        });

        return verdict;
    }

    private rowCombinationStrategy(): Array<any> {
        return [
            [0, 1, 2],
            [3 ,4, 5],
            [6 ,7, 8],
        ]
    }

    private columnCombinationStrategy(): Array<any> {
        return [
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];
    }

    private diagonalCombinationStrategy(): Array<any> {
        return [
            [0, 4, 8],
            [2, 4, 6]
        ];
    }
}