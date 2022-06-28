import { ApiParamOptions, ApiQueryOptions } from "@nestjs/swagger";

const pathParam1: ApiParamOptions = {
    name: ''
}

const queryParam1: ApiQueryOptions = {

}

export const pathParams: Record<string, ApiParamOptions> = {
    pathParam1: pathParam1,
}

export const queryParams: Record<string, ApiQueryOptions> = {
    queryParam1: queryParam1
}