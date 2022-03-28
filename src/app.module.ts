import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GameService} from "./domain/services/GameService";
import {GameFileRepository} from "./infractructure/repositories/GameFileRepository";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GameService, GameFileRepository],
})
export class AppModule {}
