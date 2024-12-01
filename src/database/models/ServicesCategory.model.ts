import { getModelForClass } from '@typegoose/typegoose';
import { ServicesCategorySchema } from '../schemas';

export const ServicesCategoryModel = getModelForClass(ServicesCategorySchema, {
  schemaOptions: {
    collection: 'services-categories',
    timestamps: true,
    minimize: true,
    versionKey: false,
  },
});
