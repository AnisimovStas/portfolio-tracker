import { Injectable } from '@nestjs/common';

@Injectable()
export class PortfoliosService {
  constructor() {}

  // async editRowDescription(payload: editDescriptionDto) {
  //   const { portfolioRowId, newDescription, rowType } = payload;
  //   if (rowType === 'crypto') {
  //     await this.cryptoRowService.editCryptoRowDescription(
  //       portfolioRowId,
  //       newDescription,
  //     );
  //   }
  //   return { msg: 'description updated' };
  // }
}
