import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { PrincessApiSdk } from 'princess-api-sdk';
import {
  IGetIdolInfo,
  IGetIdolInfoArray,
} from 'princess-api-sdk/lib/schemas/Idols/IGetIdolInfo';
import { Like, Repository } from 'typeorm';
import { FavoriteIdols, Idols } from './idols.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IdolsService {
  constructor(
    @InjectRepository(Idols) private idolsRepository: Repository<Idols>,
    @InjectRepository(FavoriteIdols)
    private favoriteIdolsRepository: Repository<FavoriteIdols>,
  ) {}
  /**
   * アイドルの情報を取得し、アイドルを検索する
   * 名前はカタカナ、漢字(部分一致)で検索可能
   *
   * @param name アイドルの名前(部分一致)
   * @returns Promise<IGetIdolInfoArray>
   */
  async getIdolsByName(name: string): Promise<IGetIdolInfoArray> {
    const princessApiSdk = new PrincessApiSdk();
    const response = await princessApiSdk.getIdolInfo();
    if (!name) return response;
    const result = response.filter((idol) => {
      if (idol.fullName.indexOf(name) !== -1) return true;
      if (idol.fullNameRuby.indexOf(name) !== -1) return true;
      if (idol.displayName.indexOf(name) !== -1) return true;
      return false;
    });
    return result;
  }

  /**
   * id でアイドルの情報を取得する
   *
   * @param id
   * @returns Promise<IGetIdolInfo>
   */
  async getIdolsById(id: number): Promise<IGetIdolInfo> {
    const princessApiSdk = new PrincessApiSdk();
    const response = await princessApiSdk.getIdolInfo();
    if (!id) return;
    for (const idol of response) {
      if (idol.id === id) {
        return idol;
      }
    }
    return;
  }

  /**
   * アイドルの情報を取得し、アイドルの画像Urlを検索する
   * めい(部分一致)で検索可能
   *
   * @param name アイドルの名前(めい)(部分一致)
   * @returns 画像のリンク
   */
  async getIdolsPicture(name: string): Promise<string | void> {
    if (name === null) return;
    const idol = await this.idolsRepository.findOne({
      where: {
        name: Like(`%${name}%`),
      },
    });
    if (idol === null) return;
    return idol.image;
  }

  /**
   * user idをもとにいいねしたアイドルを検索する
   *
   * @param id
   * @returns
   */
  async getFavoriteIdolsByUserId(id: number): Promise<FavoriteIdols[]> {
    if (id === null) return;
    const idols = await this.favoriteIdolsRepository.find({
      where: {
        userId: id,
      },
    });
    if (idols === null) return;
    return idols;
  }

  /**
   * ユーザーが該当のアイドルをすでにいいねしているかどうか
   *
   * @param userId number
   * @param idolId number
   * @returns Promise<boolean>
   */
  async isAlreadyFavorite(userId: number, idolId: number): Promise<boolean> {
    const idol = await this.favoriteIdolsRepository.findOne({
      where: {
        userId: userId,
        idolId: idolId,
      },
    });
    if (idol) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * アイドルにいいねする
   *
   * @param id
   * @returns
   */
  async addFavoriteIdol(userId: number, idolId: number): Promise<void> {
    if (userId === null || idolId === null) return;
    const isAlreadyFavorite = await this.isAlreadyFavorite(userId, idolId);
    if (isAlreadyFavorite) {
      throw new ConflictException();
    }
    await this.favoriteIdolsRepository.insert({
      userId: userId,
      idolId: idolId,
    });
  }

  /**
   * アイドルのいいねを消す
   *
   * @param id
   * @returns
   */
  async removeFavoriteIdol(userId: number, idolId: number): Promise<void> {
    if (userId === null || idolId === null) return;
    const isAlreadyFavorite = await this.isAlreadyFavorite(userId, idolId);
    if (!isAlreadyFavorite) {
      throw new ConflictException();
    }
    await this.favoriteIdolsRepository.delete({
      userId: userId,
      idolId: idolId,
    });
  }
}
