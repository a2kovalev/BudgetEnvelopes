import axios from 'axios'

const ENV_API_UTIL = "http://localhost:8080/api/envelopes";

class EnvelopeService {
    getEnvelopes() {
        return axios.get(ENV_API_UTIL);
    }

    getTransactions() {
        return axios.get(ENV_API_UTIL + "/transactions")
    }

    getTransactionsForEnv(envId) {
        return axios.get(ENV_API_UTIL + "/" + envId + "/transactions")
    }
}

export default new EnvelopeService