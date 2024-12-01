import { getModelForClass } from '@typegoose/typegoose';
import { CategorySchema } from '../schemas';

export const CategoryModel = getModelForClass(CategorySchema, {
  schemaOptions: {
    collection: 'categories',
    timestamps: true,
    minimize: true,
    versionKey: false,
  },
});
