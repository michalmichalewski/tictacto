import {Body, Controller, Get, HttpException, Param, Post, Put} from '@nestjs/common';
import {GameService} from "./domain/services/GameService";
import {Game} from "./domain/models/game";
import {MakeGameMoveDto} from "./application/dto/MakeGameMoveDto";
import {Id} from "./domain/models/valueObject/id";
import {Sign} from "./domain/models/game/sign";
import {Move} from "./domain/models/valueObject/move";
import {GameProgresListener} from "./domain/listener/GameProgresListener";

@Controller('api/games')
export class AppController {
  constructor(private readonly gameService: GameService) {}

  @Get(':id')
  findGameById(@Param() params): string {
    try {
      return this.gameService.findGameById(params.id)
    } catch(err) {
      console.log(err);
    }
  }

  @Put(':id/board')
  async makeAMove(@Body() move: MakeGameMoveDto, @Param('id') id: string) {
    try {
      const game: Game = await this.gameService.findGameById(new Id(id));
      const player = game.getPlayerBySign(move.sign as Sign);
      const gameProgresListener = new GameProgresListener();
      player.makeMove(new Move(move.index));
      gameProgresListener.gameStateHaveChanged(game);
      this.gameService.persistState(game);
      return game;
    } catch (err) {
      throw new HttpException(err.toString(), 400);
    }
  }

  @Post()
  newGame(): Game {
    const game = this.gameService.createNewGame();
    this.gameService.persistState(game);
    return game;
  }
}
