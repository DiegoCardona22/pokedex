// @packages
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

// @scripts
import { IPokemonResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<IPokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=100',
    );

    const insertPromiseArray = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      insertPromiseArray.push(
        this.pokemonModel.create({
          no,
          name,
        }),
      );
    });

    await Promise.all(insertPromiseArray);
    return 'Seed executed';
  }
}
