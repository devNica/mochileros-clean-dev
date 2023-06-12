import 'reflect-metadata'
import 'source-map-support/register'
import 'module-alias/register'

import { HttpServerAdapter } from '@infrastructure/adapters/httpServerAdapter'
import constants from '@shared/constants'
import { WinstonLoggerAdapter } from '@infrastructure/adapters/logger_adapter'
import { SequelizeDatabaseAdapter } from '@infrastructure/adapters/sequelize_adapter'

void main()

async function main (): Promise<void> {
  const logger = new WinstonLoggerAdapter()

  const db = new SequelizeDatabaseAdapter()

  db.connect()
    .then(() => logger.LogInfo('database connected successfully'))
    .catch(error => logger.LogError(error))

  db.syncModels(constants.SEQUELIZE_CONFIG_ALTER)
    .then(() => logger.LogInfo('synchronized database models'))
    .catch(error => logger.LogError(error))

  const httpServer = new HttpServerAdapter(logger, constants.SERVER_PORT)

  await httpServer.start()
}
