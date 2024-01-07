import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { RuStock } from './entities/ru-stocks.entity';
import { Repository } from 'typeorm';
import { nameTrimmer } from './utils/trimmer';
import { ImageService } from '../image/image.service';
import * as path from 'path';

@Injectable()
export class RuStocksService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(RuStock)
    private readonly ruStocksRepository: Repository<RuStock>,
    private readonly imageService: ImageService,
  ) {}

  async getRuStocksGeneralInfo(page: number) {
    const BaseUrl = 'https://iss.moex.com/iss/';
    const method = 'securities.json';
    const url = `${BaseUrl}${method}`;

    const limit = 100;
    //10 page is last
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            'iss.meta': 'off',
            'iss.json': 'extended',
            q: 'RU000',
            start: limit * page,
          },
        }),
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async fillDbWithGeneralRuStocksInfo() {
    const securitiesArray = [];

    for (let i = 0; i < 10; i++) {
      const page = await this.getRuStocksGeneralInfo(i);

      const { securities } = page[1];

      securitiesArray.push(...securities);
    }

    const ruStocks = securitiesArray.map((stock) => {
      return {
        moexId: stock['id'],
        isin: stock['isin'],
        ticker: stock['secid'],
        name: nameTrimmer(stock['name']),
        icon: '',
        currentPrice: '',
      };
    });
    console.log(ruStocks);
    await this.ruStocksRepository.save(ruStocks);

    return { msg: 'ok' };
  }

  async downloadRuStocksIconImages() {
    const ruStocks = await this.ruStocksRepository.find({
      take: 100,
      skip: 0,
    });

    for (const stock of ruStocks) {
      const imageUrl = `https://invest-brands.cdn-tinkoff.ru/${stock.isin}x640.png`;
      const imageName = `${stock.ticker}.png`;
      const imageNameWithPath = path.join(
        'src',
        'assets',
        'ruStocks',
        imageName,
      );

      try {
        await this.imageService.downloadImage(imageUrl, imageNameWithPath);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
