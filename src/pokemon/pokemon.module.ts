// @packages
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// @scripts
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
  ],
})
export class PokemonModule {}
