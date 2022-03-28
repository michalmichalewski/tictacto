import {Controller, Get, Param, Post, Put} from '@nestjs/common';
import {GameService} from "./domain/services/GameService";
import {Game} from "./domain/models/game";

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
  makeAMove() {

  }

  @Post()
  newGame(): Game {
    const game = this.gameService.createNewGame();
    this.gameService.persistState(game);
    return game;
  }
}
