import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export const RequestHeader = createParamDecorator(
    async (value: any, ctx: ExecutionContext) => {

        // extract headers
        const headers = ctx.switchToHttp().getRequest().headers;

        // Convert headers to DTO object
        const dto = plainToInstance(value, headers, { excludeExtraneousValues: true });

        // Validate
        const errors: ValidationError[] = await validate(dto);

        if (errors.length > 0) {
            //Get the errors and push to custom array
            const validationErrors = errors.map(obj => Object.values(obj.constraints));
            throw new BadRequestException(`${validationErrors}`);
        }

        // return header dto object
        return dto;
    },
);
