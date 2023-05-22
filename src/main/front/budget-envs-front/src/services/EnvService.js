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

    async deleteEnvelope(envID) {
        const response = await axios.delete(ENV_API_UTIL + "/" + envID);
    }

    async resetEnvelope(envID) {
        const response = await axios.delete(ENV_API_UTIL + "/" + envID + "/reset");
    }

    async updateEnvelope(envData, envID) {
        const response = await axios.put(ENV_API_UTIL + "/" + envID, envData);
    }

    getTransactions() {
        return axios.get(ENV_API_UTIL + "/transactions");
    }

    getTransactionsForEnv(envID) {
        return axios.get(ENV_API_UTIL + "/" + envID + "/transactions");
    }

    async postTransaction(envID, tranData) {
        const response = await axios.post(ENV_API_UTIL + "/" + envID + "/transactions", tranData);
    }

    async deleteTran(envID, tranID) {
        const response = await axios.delete(ENV_API_UTIL + "/" + envID + "/transactions/" + tranID);
    }

    async updateTransaction(tranData, tranID, envID) {
        const response = await axios.put(ENV_API_UTIL + "/" + envID + "/transactions/" + tranID, tranData);
    }
}

export default new EnvelopeService