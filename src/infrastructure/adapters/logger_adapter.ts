import { devLoggerConfig, productLoggerConfig } from '@shared/configs/logger_config'
import constants from '@shared/constants'
import { LoggerAdapterModel } from '../../application/ports/logger/logger'
import { createLogger, Logger } from 'winston'

class WinstonLoggerAdapter implements LoggerAdapterModel {
  private readonly logger: Logger

  constructor (
    private readonly enviroment: string
  ) {
    const options = this.enviroment === 'development' ? devLoggerConfig : productLoggerConfig
    this.logger = createLogger(options)
  }

  LogInfo (message: string): void {
    this.logger.info(message)
  }

  LogError (message: string): void {
    this.logger.error(message)
  }
}

export const wLogger = new WinstonLoggerAdapter(constants.NODE_ENV)
