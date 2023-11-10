import { Injectable } from '@nestjs/common';
import { ImageService } from '../image/image.service';
import * as path from 'path';

@Injectable()
export class CurrenciesService {
  constructor(private readonly imageService: ImageService) {}

  async downloadCryptoIconImages(coins: any[]): Promise<void> {
    for (const coin of coins) {
      const imageUrl = coin.image;
      const imageName = `${coin.id}.png`;
      const imageNameWithPath = path.join('src', 'assets', 'crypto', imageName);

      await this.imageService.downloadImage(imageUrl, imageNameWithPath);
    }
  }
}
