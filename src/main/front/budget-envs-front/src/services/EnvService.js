import axios from 'axios'

const ENV_API_UTIL = "http://localhost:8080/api/envelopes";

axios.defaults.headers.common = {
    "Content-Type": "application/json"
}

class EnvelopeService {
    getEnvelopes() {
        return axios.get(ENV_API_UTIL);
    }

    async postEnvelope(envData) {
        //alert("Called postEnvelope with this data: " + envData.envelopeName + " and " + envData.balance + ". Types: " + typeof(envData.envelopeName) + ", " + typeof(envData.balance))
         const response = await axios.post(ENV_API_UTIL, envData);
         console.log(response.status, response.data.token);
    }

    getTransactions() {
        return axios.get(ENV_API_UTIL + "/transactions")
    }

    getTransactionsForEnv(envID) {
        return axios.get(ENV_API_UTIL + "/" + envID + "/transactions")
    }
}

export default new EnvelopeService