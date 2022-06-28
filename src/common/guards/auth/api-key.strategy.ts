import { PassportStrategy } from "@nestjs/passport";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import Strategy from "passport-headerapikey";
import { CONSTANTS } from "./../../config/configuration";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, CONSTANTS.AUTH.HEADER.STRATEGY) {
    constructor(private readonly configService: ConfigService) {
        super({ header: CONSTANTS.AUTH.HEADER.KEY, prefix: '' },
            true,
            async (apikey: string, done: (error: Error, data) => Record<string, unknown>) => {
                this.validateApiKey(apikey, done)
            });
    }
    
    private apiKeys: string[] = Object.values(JSON.parse(this.configService.get('app.service.keys')));

    validateApiKey(apikey: string, done: (error: Error, data) => Record<string, unknown>) {
        if (this.apiKeys.find(ak => ak === apikey)) {
            done(null, true);
        }
        done(new HttpException({ message: 'Please pass a valid service key to authenticate.' }, HttpStatus.UNAUTHORIZED), null);
    }
}
