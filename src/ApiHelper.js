
const msRestAzure = require('ms-rest-azure');
const CommerceManagement = require('azure-arm-commerce');
const axios = require('axios');

class ApiHelper{

    static GetRates(clientId, clientSecret, tenantId, subscriptionId, offerId, detailed, filter, granularity, startDate, endDate) {
        return axios.get('http://localhost:3001/api/getcost',  {
            params: {
                clientId:clientId,
                clientSecret:clientSecret,
                tenantId:tenantId,
                subscriptionId:subscriptionId,
                offerId:offerId,
                detailed:detailed,
                filter:filter,
                granularity:granularity,
                startDate:startDate,
                endDate: endDate
            }
          });
    }
    static DownloadRates(clientId, clientSecret, tenantId, subscriptionId, offerId, detailed, filter, granularity, startDate, endDate) {
        return axios.get('http://localhost:3001/api/downloadcost',  {
            params: {
                clientId:clientId,
                clientSecret:clientSecret,
                tenantId:tenantId,
                subscriptionId:subscriptionId,
                offerId:offerId,
                detailed:detailed,
                filter:filter,
                granularity:granularity,
                startDate:startDate,
                endDate: endDate
            }
          });
    }
}

export default ApiHelper;