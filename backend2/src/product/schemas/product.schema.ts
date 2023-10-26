import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema({ versionKey: false })
export class Product {
    @Prop()
    id: number;

    @Prop()
    title: string;

    @Prop()
    image: string;

    @Prop()
    likes: number;
}
export const ProductSchema = SchemaFactory.createForClass(Product);