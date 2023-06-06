import { Test, TestingModule } from '@nestjs/testing';
import { IdolsController } from './idols.controller';
import { IdolsService } from './idols.service';

describe('AppController', () => {
  let appController: IdolsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IdolsController],
      providers: [IdolsService],
    }).compile();

    appController = app.get<IdolsController>(IdolsController);
  });

  describe('root', () => {
    it('春香 で検索したときに 天海 春香 のみが取得できる', async () => {
      const actualResultPromise = appController.getIdols('春香', null);

      return actualResultPromise.then((actualResult) => {
        expect(actualResult[0]['fullName']).toEqual('天海 春香');
      });
    });

    it('年齢が17歳のアイドル10名取得する', async () => {
      const actualResultPromise = appController.getIdols(null, 17);

      return actualResultPromise.then((actualResult) => {
        expect(actualResult.length).toEqual(10);
      });
    });

    it('条件なしの場合は全てのアイドル56名を取得する', async () => {
      const actualResultPromise = appController.getIdols(null, null);

      return actualResultPromise.then((actualResult) => {
        expect(actualResult.length).toEqual(56);
      });
    });
  });
});
