import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { RecommendService } from 'src/recommend/recommend.service';

@Controller('recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}
  @Get('/byText')
  async getRecommendByText(
    @Query('text') texts: string[],
    @Res() res: Response,
  ) {
    let responseTexts = [];
    if (typeof texts === 'object') {
      responseTexts = await Promise.all(
        texts.map((text) => this.recommendService.getRecommendByText(text)),
      );
    } else {
      responseTexts.push(await this.recommendService.getRecommendByText(texts));
    }

    return res.status(HttpStatus.OK).json({ answer: responseTexts });
  }
}
