import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestroModel, RestroSchema } from './restro';
import { RestroController } from './restro.controller';
import { RestroService } from './restro.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RestroModel.name, schema: RestroSchema },
    ]),
  ],
  controllers: [RestroController],
  providers: [RestroService],
})
export class RestroModule {}