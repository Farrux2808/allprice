import { getModelForClass } from '@typegoose/typegoose';
import { OperatorSessionSchema } from '../schemas';

export const OperatorSessionModel = getModelForClass(OperatorSessionSchema, {
  schemaOptions: {
    collection: 'operator_sessions',
    timestamps: true,
    minimize: true,
    versionKey: false,
  },
});
