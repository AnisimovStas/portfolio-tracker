import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { RuStock } from './entities/ru-stocks.entity';
import { In, Repository } from 'typeorm';
import { nameTrimmer } from './utils/trimmer';
import { ImageService } from '../image/image.service';
import * as path from 'path';
import * as fs from 'fs';
import { Cron } from '@nestjs/schedule';
import { Fiat } from '../currencies/entities/fiat.entity';

@Injectable()
export class RuStocksService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(RuStock)
    private readonly ruStocksRepository: Repository<RuStock>,
    private readonly imageService: ImageService,
    @InjectRepository(Fiat)
    private readonly fiatRepository: Repository<Fiat>,
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
      // нужно менять последний параметр при добавлении новых акции
      skip: 900,
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

  async mapRuStocksWithImages() {
    const dir = path.join('src', 'assets', 'ruStocks');
    const filelist = fs.readdirSync(dir);
    const fileListWoDotPng = filelist.map((filename) => {
      return filename.slice(0, -4);
    });

    const ruStocksThatHaveIcon = await this.ruStocksRepository.find({
      where: {
        ticker: In(fileListWoDotPng),
      },
    });

    const newRuStocks = ruStocksThatHaveIcon.map((stock) => {
      return {
        ...stock,
        icon: `/assets/ruStocks/${stock.ticker}.png`,
      };
    });

    await this.ruStocksRepository.save(newRuStocks);
    return { msg: 'icons mapped' };
  }

  async getAllRuStocks() {
    const ruStocks = await this.ruStocksRepository.find();

    return {
      length: ruStocks.length,
      ruStocks: ruStocks,
    };
  }

  async getRuStockPriceData() {
    const url = `https://iss.moex.com/iss/engines/stock/markets/shares/secstats.json`;

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            'iss.meta': 'off',
            'iss.json': 'extended',
          },
        }),
      );
      return data[1].secstats.map((info) => {
        return {
          ticker: info['SECID'],
          currentPrice: info['LAST'] || info['LCLOSEPRICE'] || info['LASTBID'],
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Cron('0 20/30 * * * *')
  async updateRuStocksCurrentPrice() {
    const ruStocks = await this.ruStocksRepository.find();
    const usdPrice = await this.fiatRepository.findOne({
      where: { name: 'USD' },
    });
    const priceData = await this.getRuStockPriceData();

    const RuStocksWithUpdatedPrice = ruStocks.map((stock) => {
      const updatedPrice = priceData.find((data) => {
        return data.ticker === stock.ticker;
      });
      const currentPriceInUsd = (
        updatedPrice?.currentPrice / +usdPrice.value
      ).toFixed(5);
      return {
        ...stock,
        currentPrice: currentPriceInUsd ?? '',
      };
    });

    await this.ruStocksRepository.save(RuStocksWithUpdatedPrice);

    return { msg: 'Ru stocks prices updated!' };
  }
}
