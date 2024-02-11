import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Portfolio } from './Entity/Portfolio.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class PortfoliosRepository extends Repository<Portfolio> {
  constructor(private dataSource: DataSource) {
    super(Portfolio, dataSource.createEntityManager());
  }

  async createPortfolio(user: User): Promise<Portfolio> {
    const portfolio = this.create({
      user,
    });
    await this.save(portfolio);
    return portfolio;
  }
}
