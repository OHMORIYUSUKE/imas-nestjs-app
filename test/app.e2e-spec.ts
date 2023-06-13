import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './../src/app.module';
import { Users } from './../src/modules/users/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteIdols, Idols } from './../src/modules/idols/idols.entity';
import { IDOLS_DATA } from './data/idols';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;
  let mockUsersRepository: Repository<Users>;
  let mockIdolsRepository: Repository<Idols>;
  let mockFavoriteIdolsRepository: Repository<FavoriteIdols>;

  // 各テスト実行時に呼ばれる
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    mockUsersRepository = moduleFixture.get<Repository<Users>>(
      getRepositoryToken(Users),
    );
    mockIdolsRepository = moduleFixture.get<Repository<Idols>>(
      getRepositoryToken(Idols),
    );
    mockFavoriteIdolsRepository = moduleFixture.get<Repository<FavoriteIdols>>(
      getRepositoryToken(FavoriteIdols),
    );
    await mockUsersRepository.clear();
    await mockIdolsRepository.clear();
    await mockIdolsRepository.insert(IDOLS_DATA);
    await mockFavoriteIdolsRepository.clear();
    await app.close();
  });

  // 各テスト終了時に呼ばれる
  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return app.inject({ method: 'GET', url: '/' }).then((response) => {
      expect(response.statusCode).toEqual(200);
      expect(response.payload).toEqual('Hello World!');
    });
  });

  it('/auth/signup (POST)', () => {
    const data = {
      email: 'uutan1108@test.com',
      password: 'uutan1108_password',
    };

    return app
      .inject({
        method: 'POST',
        url: '/auth/signup',
        payload: data,
        headers: { 'Content-Type': 'application/json' },
      })
      .then((loginResponse) => {
        const user = JSON.parse(loginResponse.payload);
        expect(user).toMatchObject({
          email: expect.any(String),
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
      });
  });

  it('/auth/signup (POST) すでに存在しているユーザー', () => {
    const data = {
      email: 'uutan1108@test.com',
      password: 'uutan1108_password',
    };

    return app
      .inject({
        method: 'POST',
        url: '/auth/signup',
        payload: data,
        headers: { 'Content-Type': 'application/json' },
      })
      .then((loginResponse) => {
        expect(loginResponse.statusCode).toEqual(409);
      });
  });

  it('/auth/login (POST)', () => {
    const data = {
      email: 'uutan1108@test.com',
      password: 'uutan1108_password',
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

  it('/auth/login (POST) 存在しないユーザー', () => {
    const data = {
      email: 'uutan1108@test.com___',
      password: 'uutan1108_password',
    };

    return app
      .inject({
        method: 'POST',
        url: '/auth/login',
        payload: data,
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        expect(response.statusCode).toEqual(401);
      });
  });

  it('/idols?name=春香 (GET)', () => {
    const data = {
      email: 'uutan1108@test.com',
      password: 'uutan1108_password',
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
            expect(idols[0]['image']).toEqual(
              'https://raw.githubusercontent.com/tankarup/ML-4koma-viewer/main/icons/haruka.jpg',
            );
            expect(idols.length).toEqual(1);
          });
      });
  });

  it('/idols?name=あまみ (GET)', () => {
    const data = {
      email: 'uutan1108@test.com',
      password: 'uutan1108_password',
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
      email: 'uutan1108@test.com',
      password: 'uutan1108_password',
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
            expect(idols.length).toEqual(56);
          });
      });
  });

  it('/user/profile (GET)', () => {
    const data = {
      email: 'uutan1108@test.com',
      password: 'uutan1108_password',
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
            expect(profile).toMatchObject({
              email: expect.any(String),
              id: expect.any(Number),
            });
          });
      });
  });

  it('/user/profile (GET) 存在しないユーザー', () => {
    const data = {
      email: 'uutan1108@test.com__',
      password: 'uutan1108_password',
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
            expect(profileResponse.statusCode).toEqual(401);
          });
      });
  });

  it('/user/profile (GET) 誤ったパスワード', () => {
    const data = {
      email: 'uutan1108@test.com',
      password: 'uutan1108_password__',
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
            expect(profileResponse.statusCode).toEqual(401);
          });
      });
  });

  it('/idols/favorite (POST)', () => {
    const data = {
      email: 'uutan1108@test.com',
      password: 'uutan1108_password',
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

        const data = {
          idolId: 1,
        };
        return app
          .inject({
            method: 'POST',
            url: '/idols/favorite',
            payload: data,
            headers: { Authorization: `Bearer ${access_token}` },
          })
          .then((response) => {
            expect(response.statusCode).toEqual(201);
          });
      });
  });

  it('/idols/favorite (POST) すでにいいねしている', () => {
    const data = {
      email: 'uutan1108@test.com',
      password: 'uutan1108_password',
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

        const data = {
          idolId: 1,
        };
        return app
          .inject({
            method: 'POST',
            url: '/idols/favorite',
            payload: data,
            headers: { Authorization: `Bearer ${access_token}` },
          })
          .then((response) => {
            expect(response.statusCode).toEqual(409);
          });
      });
  });

  it('/idols/favorite (GET)', () => {
    const data = {
      email: 'uutan1108@test.com',
      password: 'uutan1108_password',
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

        const data = {
          idolId: 1,
        };
        return app
          .inject({
            method: 'GET',
            url: '/idols/favorite',
            payload: data,
            headers: { Authorization: `Bearer ${access_token}` },
          })
          .then((response) => {
            expect(response.statusCode).toEqual(200);
            const idols = JSON.parse(response.payload);
            expect(idols.length).toEqual(1);
          });
      });
  });

  it('/idols/favorite (DELETE)', () => {
    const data = {
      email: 'uutan1108@test.com',
      password: 'uutan1108_password',
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

        const data = {
          idolId: 1,
        };
        return app
          .inject({
            method: 'DELETE',
            url: '/idols/favorite',
            payload: data,
            headers: { Authorization: `Bearer ${access_token}` },
          })
          .then((response) => {
            expect(response.statusCode).toEqual(200);
          });
      });
  });

  it('/idols/favorite (DELETE) すでに削除されている', () => {
    const data = {
      email: 'uutan1108@test.com',
      password: 'uutan1108_password',
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

        const data = {
          idolId: 1,
        };
        return app
          .inject({
            method: 'DELETE',
            url: '/idols/favorite',
            payload: data,
            headers: { Authorization: `Bearer ${access_token}` },
          })
          .then((response) => {
            expect(response.statusCode).toEqual(409);
          });
      });
  });
});
