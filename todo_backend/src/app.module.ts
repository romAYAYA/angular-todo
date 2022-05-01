import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoStorage } from './todo.storage';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TodoStorage],
})
export class AppModule {}
