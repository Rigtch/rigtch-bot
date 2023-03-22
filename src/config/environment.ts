import Joi from 'joi'
import 'dotenv/config'

const environmentVariablesSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
    TOKEN: Joi.string().required(),
  })
  .unknown()

const { value: environmentVariables, error } = environmentVariablesSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env)

if (error) throw new Error(`Config validation error: ${error.message}`)

export const config = {
  token: environmentVariables.TOKEN,
}
