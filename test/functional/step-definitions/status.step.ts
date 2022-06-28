import { binding, given, then, when } from 'cucumber-tsflow';
import { assert } from 'chai';
import { getData } from '../utils/rest.helper'

@binding()
export class StatusSpec {
    private res: any;

    @given(/User sets correct parameters if any/)
    public setParams() {
        console.log('No params for status url')
    }

    @when(/User makes a Get Http Request for status/)
    public async getUrlFor() {
        this.res = await getData("http://localhost:3000/health").then((response) => {
            return response
        }).catch((error) => {
            return error
        })
    }

    @then(/User gets a response for status request/)
    public async checkResponseStatus() {
        assert.equal(this.res.status, 200);
    }
} 