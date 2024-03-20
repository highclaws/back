import * as Joi from '@hapi/joi';
import ConfigConstants from './config.constants';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(ConfigConstants.DEFAULT_PORT),
  FRONT_URL: Joi.string().default(ConfigConstants.DEFAULT_FRONT_URL),
  STAGE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(ConfigConstants.DEFAULT_DB_PORT).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  migrationsRun: Joi.boolean().required(),
});
