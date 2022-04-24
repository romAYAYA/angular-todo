import {Body, Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('checkCode')
  async checkCode(
    @Body() obj: { code: string },
  ): Promise<{ result: 'ok' | 'error' }> {
    await this._sleep(3000);
    return this.appService.checkCode(obj);
  }

  private _sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, duration));
  }

}
