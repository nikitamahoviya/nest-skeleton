import { Inject, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as oracledb from 'oracledb'
import { Logger } from 'winston';
import { CONSTANTS } from '../config/configuration';
import { LOGGER } from '../core.module';
import { Database } from '../models/config.models';

class OracleDBConnection {

    private static instance: OracleDBConnection;

    private constructor(@Inject(LOGGER) private readonly logger: Logger,
        private readonly configService: ConfigService) {
        this.init()
            .then(
                res => this.logger.info(`[OracleDBConnection]: connection pool created successfully ${res.poolAlias}`),
                error => this.logger.error(`[OracleDBConnection]: connection pool creation failed with error: ${error}`)
            )
    }

    static getInstance(logger?: Logger, configService?: ConfigService): OracleDBConnection {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new OracleDBConnection(logger, configService);
        return this.instance;
    }

    private async init(): Promise<oracledb.Pool> {
        try {
            const dbConnectionConfig = this.configService.get<Database>(CONSTANTS.CONFIG.DATABASE, { infer: true })
            this.logger.info(`[OracleDBConnection]: Creating database pool with config: [ConnectString: ${dbConnectionConfig.poolSettings.connectString}] [user: ${dbConnectionConfig.user}] [PoolMin: ${dbConnectionConfig.poolSettings.poolMin} PoolMax: ${dbConnectionConfig.poolSettings.poolMax} PoolIncrement: ${dbConnectionConfig.poolSettings.poolIncrement}]`)
            return await oracledb.createPool(dbConnectionConfig.poolSettings)
        } catch (error) {
            this.logger.error(`[OracleDBConnection]: Error while initializing the db pool connection: ${error}`)
            throw new InternalServerErrorException({
                message: 'Error while initializing the db pool connection',
                log: `[OracleDBConnection]: Error while initializing the db pool connection: ${error}`
            })
        }
    }

    public async getDBConnection(poolAlias?: string): Promise<oracledb.Connection> {
        let connectionConfig: oracledb.ConnectionAttributes
        try {
            const dbConnectionConfig = this.configService.get<Database>(CONSTANTS.CONFIG.DATABASE, { infer: true })
            connectionConfig = {
                user: dbConnectionConfig.user,
                password: dbConnectionConfig.password,
                connectString: dbConnectionConfig.poolSettings.connectString,
                poolAlias: poolAlias ? poolAlias : dbConnectionConfig.poolSettings.poolAlias
            }
            return await oracledb.getConnection(connectionConfig)
        } catch (error) {
            this.logger.error(`[OracleDBConnection]: Error while get connection from pool with alias ${connectionConfig.poolAlias}: ${error}`)
            throw new InternalServerErrorException({
                message: `Error while get connection from pool with alias ${connectionConfig.poolAlias}`,
                log: `[OracleDBConnection]: Error while get connection from pool with alias ${connectionConfig.poolAlias}: ${error}`
            })
        }
    }

    public async execute(query: string, bindParams?, options = { outFormat: oracledb.OUT_FORMAT_OBJECT }, poolAlias?: string): Promise<oracledb.Result<unknown>> {
        let connection: oracledb.Connection
        try {
            connection = await this.getDBConnection(poolAlias)
            return await connection.execute(query, bindParams, options)
        } catch (error) {
            this.logger.error(`[OracleDBConnection]: Error while execute query: ${error}`)
            throw new InternalServerErrorException({
                message: `Error while execute query`,
                log: `[OracleDBConnection]: Error while execute query: ${error}`
            })
        } finally {
            try {
                if (connection) {
                    await connection.close()
                }
            } catch (err) {
                this.logger.error(`[OracleDBConnection]: Error while closing connection with pool: ${err}`)
            }
        }
    }

    public async getPool(poolAlias = ''): Promise<oracledb.Pool> {
        try {
            return oracledb.getPool(poolAlias)
        } catch (error) {
            this.logger.error(`[OracleDBConnection]: Error while getting pool: ${error}`)
            throw new InternalServerErrorException({
                message: `Error while getting pool for alias ${poolAlias}`,
                log: `[OracleDBConnection]: Error while getting pool: ${error}`
            })
        }
    }

    public async shutdown(): Promise<void> {
        try {
            const dbConnectionConfig = this.configService.get<Database>(CONSTANTS.CONFIG.DATABASE, { infer: true })
            return (await this.getPool(dbConnectionConfig.poolSettings.poolAlias)).close(10)
        } catch (error) {
            this.logger.error(`[OracleDBConnection]: Error while shutting down connection pool: ${error}`)
            throw new InternalServerErrorException({
                message: `Error while shutting down connection pool`,
                log: `[OracleDBConnection]: Error while shutting down connection pool: ${error}`
            })
        }
    }
}

export default OracleDBConnection;
