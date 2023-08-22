import * as Joi from 'joi'

/* eslint-disable import/namespace */
export const environmentValidationSchema = Joi.object({
  TOKEN: Joi.string().required(),
  CLIENT_ID: Joi.string().required(),
  GUILD_ID: Joi.string().required(),
  PRIVATE_BETA_REQUESTS_CHANNEL_ID: Joi.string().required(),
})
/* eslint-enable import/namespace */
