import axiosClient from './AxiosClient'

const factApi = {
    getFact: () => {
        return axiosClient.get(`/fact`);
    }
};

export default factApi;
