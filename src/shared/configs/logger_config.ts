import { format, transports } from 'winston'

const {
  timestamp,
  combine,
  colorize,
  errors,
  json,
  printf,
  simple
} = format

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/strict-boolean-expressions
const formatLogger = printf(({ level, message, timestamp, stack }) => `${timestamp} ${level} ${stack || message}`)

const devLoggerConfig = {
  format: combine(
    simple(),
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    formatLogger

  ),
  defaultMeta: { service: 'backend' },
  transports: [new transports.Console()]
}

const productLoggerConfig = {
  format: combine(
    timestamp(),
    errors({ stack: true }),
    json()
  ),
  defaultMeta: { service: 'backend' },
  transports: [new transports.File({
    maxsize: 512000,
    maxFiles: 5,
    // eslint-disable-next-line n/no-path-concat
    filename: `${__dirname}/../../../logs/logger.log`
  })]
}

export { devLoggerConfig, productLoggerConfig }
