import { getModelForClass } from '@typegoose/typegoose';
import { OperatorSchema } from '../schemas';

export const OperatorModel = getModelForClass(OperatorSchema, {
  schemaOptions: {
    collection: 'operators',
    timestamps: true,
    minimize: true,
    versionKey: false,
  },
});
