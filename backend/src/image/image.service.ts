import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';

@Injectable()
export class ImageService {
  async downloadImage(url: string, destinationPath: string): Promise<void> {
    const response = await axios.get(url, { responseType: 'stream' });

    response.data.pipe(fs.createWriteStream(destinationPath));

    return new Promise((resolve) => {
      response.data.on('end', () => resolve());
      // response.data.on('error', (error) => reject(error));
      // skip error
      response.data.on('error', () => resolve());
    });
  }
}
