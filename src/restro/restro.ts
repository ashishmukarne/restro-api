import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cuisine {
  @Prop()
  name: string;

  @Prop()
  price: number;
}

@Schema()
export class RestroModel extends Document {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop()
  cuisines: Cuisine[];
}

export const RestroSchema = SchemaFactory.createForClass(RestroModel);
