import * as colors from 'colors/safe';
import { createLogger, format, LeveledLogMethod, Logger, transports } from 'winston';
import { ConfigService } from '@nestjs/config';
import { AbstractConfigSetLevels } from 'winston/lib/winston/config';
import 'winston-daily-rotate-file'
import { Log } from '../models/config.models';
import { CONSTANTS } from '../config/configuration';

colors.setTheme({
  error: 'red',
  warn: 'magenta',
  info: 'green',
  http: 'cyan',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'grey',
});

const splat = (Symbol.for('splat') as unknown) as string;
const lvl = (Symbol.for('level') as unknown) as string;

const formatMetadata = format((info) => {
  info.label = `[${info.label}]`;
  info.level = `[${info.level}]`;
  info.timestamp = new Date(info.timestamp).toLocaleString(undefined, {
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    day: '2-digit',
    month: '2-digit',
  });
  return info;
});

const colorize = format((info) => {
  info.label = colors.yellow(info.label);
  info.ms = colors.yellow(info.ms);

  if (colors[info[lvl]]) {
    info.level = colors[info[lvl]](info.level);
    info.message = colors[info[lvl]](info.message);
  } else {
    info.level = colors.green(info.level);
    info.message = colors.green(info.message);
  }

  return info;
});

const logFormat = format.printf(
  // timestamp - format.timestamp(),
  // label - label added while logger setup,
  // message - first param of log message,
  // ms - format.ms(),
  // meta - any extra information passed in log message
  ({ timestamp, label, level, message, ms, ...meta }) => {
    // PENDING: Include meta information as well in log formats after fixing format errors.
    // `${meta[splat]
    //   .map((context: unknown) => JSON.stringify(context))
    //   .join(' ')}`
    const requestId = meta?.[splat]?.[0] ?? ''
    return `${timestamp} ${label} ${level} ${requestId} ${message} ${ms}`;
  },
);

export function createLoggerFactory(label: string, configService: ConfigService) {
  const formats = [
    format.timestamp(),
    format.ms(),
    format.label({ label }),
    formatMetadata(),
  ];

  const config = configService.get<Log>(CONSTANTS.CONFIG.LOG, { infer: true })
  const appName = configService.get('app.name', { infer: true })

  const logger = createLogger({
    level: config.app.level,
    format: format.combine(...formats, logFormat),
    defaultMeta: { service: appName },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new transports.DailyRotateFile({
        filename: `${config.app.directoryMount}/${config.app.subDirectory}/${config.app.errorFilePrefix}-%DATE%.log`.replace(/([^:])(\/\/+)/g, '$1/'),
        datePattern: config.app.datePattern,
        zippedArchive: config.app.zippedArchive,
        maxSize: config.app.maxSize,
        maxFiles: config.app.maxFile,
        level: 'error',
      }),
      new transports.DailyRotateFile({
        filename: `${config.app.directoryMount}/${config.app.subDirectory}/${config.app.filePrefix}-%DATE%.log`.replace(/([^:])(\/\/+)/g, '$1/'),
        datePattern: config.app.datePattern,
        zippedArchive: config.app.zippedArchive,
        maxSize: config.app.maxSize,
        maxFiles: config.app.maxFile,
        level: config.app.level,
      })
    ],
  });

  if (configService.get(CONSTANTS.ENV.NODE) === CONSTANTS.ENV.DEVELOPMENT) {
    logger.add(
      new transports.Console({
        level: 'silly',
        format: format.combine(colorize(), ...formats, logFormat),
      }),
    );
  }

  logger.info(`Logger configurations: [Level ${config.app.level}] [Directory: ${config.app.directoryMount}/${config.app.subDirectory}] [FilePrefix: ${config.app.filePrefix}, ErrorFilePrefix: ${config.app.errorFilePrefix}] [MaxFileSize: ${config.app.maxSize}, MaxFileDays: ${config.app.maxFile}]`)

  return logger;
}
