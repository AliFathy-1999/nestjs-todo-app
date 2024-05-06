import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  rootURL(@Req() req: Request, @Res() res: Response) {
    res.status(200).json({
      message: 'server is running successfully',
      success: true,
    });
    
  }
}
