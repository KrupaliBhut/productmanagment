import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class HomeController {
  @Get('/reg')
  @Render('reg')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  index() {}
}
