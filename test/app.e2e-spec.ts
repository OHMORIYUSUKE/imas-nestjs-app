import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return app.inject({ method: 'GET', url: '/' }).then((response) => {
      expect(response.statusCode).toEqual(200);
      expect(response.payload).toEqual('Hello World!');
    });
  });

  it('/auth/login (POST)', () => {
    const data = {
      email: 'john',
      password: 'changeme',
    };

    return app
      .inject({
        method: 'POST',
        url: '/auth/login',
        payload: data,
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        expect(response.statusCode).toEqual(201);
        const { access_token } = JSON.parse(response.payload);
        expect(access_token).toBeDefined();
      });
  });

  it('/idols?name=春香 (GET)', () => {
    const data = {
      email: 'john',
      password: 'changeme',
    };

    return app
      .inject({
        method: 'POST',
        url: '/auth/login',
        payload: data,
        headers: { 'Content-Type': 'application/json' },
      })
      .then((loginResponse) => {
        const { access_token } = JSON.parse(loginResponse.payload);

        return app
          .inject({
            method: 'GET',
            url: '/idols/search?name=春香',
            headers: { Authorization: `Bearer ${access_token}` },
          })
          .then((idolsResponse) => {
            expect(idolsResponse.statusCode).toEqual(200);
            const idols = JSON.parse(idolsResponse.payload);
            expect(idols[0]['fullName']).toEqual('天海 春香');
            expect(idols.length).toEqual(1);
          });
      });
  });

  it('/idols?name=あまみ (GET)', () => {
    const data = {
      email: 'john',
      password: 'changeme',
    };

    return app
      .inject({
        method: 'POST',
        url: '/auth/login',
        payload: data,
        headers: { 'Content-Type': 'application/json' },
      })
      .then((loginResponse) => {
        const { access_token } = JSON.parse(loginResponse.payload);

        return app
          .inject({
            method: 'GET',
            url: '/idols/search?name=あまみ',
            headers: { Authorization: `Bearer ${access_token}` },
          })
          .then((idolsResponse) => {
            expect(idolsResponse.statusCode).toEqual(200);
            const idols = JSON.parse(idolsResponse.payload);
            expect(idols.length).toEqual(1);
            expect(idols[0]['fullName']).toEqual('天海 春香');
          });
      });
  });

  it('/idols (GET)', () => {
    const data = {
      email: 'john',
      password: 'changeme',
    };

    return app
      .inject({
        method: 'POST',
        url: '/auth/login',
        payload: data,
        headers: { 'Content-Type': 'application/json' },
      })
      .then((loginResponse) => {
        const { access_token } = JSON.parse(loginResponse.payload);

        return app
          .inject({
            method: 'GET',
            url: '/idols/search',
            headers: { Authorization: `Bearer ${access_token}` },
          })
          .then((idolsResponse) => {
            expect(idolsResponse.statusCode).toEqual(200);
            const idols = JSON.parse(idolsResponse.payload);
            console.log(idols);
            expect(idols.length).toEqual(56);
          });
      });
  });

  it('/user/profile (GET)', () => {
    const data = {
      email: 'john',
      password: 'changeme',
    };

    return app
      .inject({
        method: 'POST',
        url: '/auth/login',
        payload: data,
        headers: { 'Content-Type': 'application/json' },
      })
      .then((loginResponse) => {
        const { access_token } = JSON.parse(loginResponse.payload);

        return app
          .inject({
            method: 'GET',
            url: '/user/profile',
            headers: { Authorization: `Bearer ${access_token}` },
          })
          .then((profileResponse) => {
            expect(profileResponse.statusCode).toEqual(200);
            const profile = JSON.parse(profileResponse.payload);
            expect(profile).toEqual({ userId: 1, email: 'john' });
          });
      });
  });
});
