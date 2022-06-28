import * as sinon from 'sinon'
import * as oracledb from 'oracledb'
import OracleDBConnection from './connection';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as winston from 'winston';

const executeStub = sinon.stub().resolves({
    rows: [[2]]
});

const logSpy = sinon.spy()

sinon.stub(oracledb, 'getConnection').resolves({
    execute: executeStub,
    close: function () { return; }
});

sinon.stub(winston, 'createLogger').callsFake(() => ({
    log: logSpy,
    info: logSpy,
    debug: logSpy,
    error: logSpy,
} as unknown as winston.Logger));

describe('Database connection', () => {
    let config: ConfigService
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [{
                provide: ConfigService,
                useValue: {
                    get: jest.fn((key: string) => {
                        if (key === 'database') {
                            return {
                                user: 'someUser',
                                password: 'somePassword',
                                poolSettings: {
                                    connectString: 'dbConnectString',
                                    poolMin: 5,
                                    poolMax: 5,
                                    popoolIncrement: 0,
                                    enableStatistics: false,
                                    homogeneous: false,
                                    poolAlias: 'default'
                                }
                            };
                        }
                        return null;
                    })
                }
            }
            ],
        }).compile();

        config = module.get<ConfigService>(ConfigService);
    });

    it('should be able to mock dependencies for execute function with override stub value', async () => {
        let conn: oracledb.Connection;
        const connectionConfig: oracledb.ConnectionAttributes = {
            user: 'someUser',
            password: 'somePassword',
            poolAlias: 'alais1'
        }
        try {
            conn = await oracledb.getConnection(connectionConfig);

            sinon.stub(conn, 'execute').resolves({
                rows: [[3]]
            });

            const result = await conn.execute(
                'select 1 from dual'
            );
            expect(result.rows[0][0]).toEqual(3);
        } catch (err) {
        } finally {
            if (conn) {
                try {
                    await conn.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    });

    it('should be able to write mock for execute function', async () => {
        // You can add expect.asertions to assert promise based reponses
        expect.assertions(1);
        const logger = winston.createLogger()
        const instance = OracleDBConnection.getInstance(logger, config)
        const result = await instance.execute('someQuery');
        expect(result.rows[0][0]).toEqual(2);
    });
});
