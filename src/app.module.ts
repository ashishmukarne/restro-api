import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import config from './config';
import { RestroModule } from './restro/restro.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot(config.mongoURI), RestroModule, UserModule],
})
export class AppModule {}
