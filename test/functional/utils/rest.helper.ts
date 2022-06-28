import axios from 'axios'

export const getData = (url: any) => {
    try {
        return axios.get(url);
    } catch (error) {
        console.error('exception occurred while GET', error);
        throw error;
    }
}