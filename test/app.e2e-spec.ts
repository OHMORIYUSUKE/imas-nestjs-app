import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/auth/login (POST)', () => {
    const data = {
      username: 'john',
      password: 'changeme',
    };

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(data)
      .set('Content-Type', 'application/json')
      .expect(201)
      .then((response) => {
        // レスポンスのアクセストークンを取得
        const { access_token } = response.body;

        // アクセストークンが取得されていることを確認
        expect(access_token).toBeDefined();
      });
  });

  it('/idols?name=春香 (GET)', () => {
    const data = {
      username: 'john',
      password: 'changeme',
    };

    // ログインリクエストを送信してアクセストークンを取得
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(data)
      .set('Content-Type', 'application/json')
      .expect(201)
      .then((loginResponse) => {
        const { access_token } = loginResponse.body;

        // アクセストークンを使用して/idols?name=春香にGETリクエストを送信
        return request(app.getHttpServer())
          .get('/idols')
          .query({ name: '春香' })
          .set('Authorization', `Bearer ${access_token}`)
          .expect(200)
          .then((idolsResponse) => {
            // 適切なレスポンスを受け取ったことを確認
            expect(idolsResponse.body[0]['fullName']).toEqual('天海 春香');
            expect(idolsResponse.body.length).toEqual(1);
          });
      });
  });

  it('/idols?name=あまみ (GET)', () => {
    const data = {
      username: 'john',
      password: 'changeme',
    };

    // ログインリクエストを送信してアクセストークンを取得
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(data)
      .set('Content-Type', 'application/json')
      .expect(201)
      .then((loginResponse) => {
        const { access_token } = loginResponse.body;

        // アクセストークンを使用して/idols?name=春香にGETリクエストを送信
        return request(app.getHttpServer())
          .get('/idols')
          .query({ name: 'あまみ' })
          .set('Authorization', `Bearer ${access_token}`)
          .expect(200)
          .then((idolsResponse) => {
            // 適切なレスポンスを受け取ったことを確認
            expect(idolsResponse.body[0]['fullName']).toEqual('天海 春香');
            expect(idolsResponse.body.length).toEqual(1);
          });
      });
  });

  it('/idols (GET)', () => {
    const data = {
      username: 'john',
      password: 'changeme',
    };

    // ログインリクエストを送信してアクセストークンを取得
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(data)
      .set('Content-Type', 'application/json')
      .expect(201)
      .then((loginResponse) => {
        const { access_token } = loginResponse.body;

        // アクセストークンを使用して/idols?name=春香にGETリクエストを送信
        return request(app.getHttpServer())
          .get('/idols')
          .set('Authorization', `Bearer ${access_token}`)
          .expect(200)
          .then((idolsResponse) => {
            // 適切なレスポンスを受け取ったことを確認
            expect(idolsResponse.body.length).toEqual(56);
          });
      });
  });
});
