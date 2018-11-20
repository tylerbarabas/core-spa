const CLIENT_ID = "OKe9Ls6EVh7UDFW56w95y7UKITeHooWJP72UaZBa";

const SECRET = "QaEbVIlHqV3MrHxK8znsdjIoCDwdluERIvwYNvW7bZ8QH9rxe2Ga5D3U5aSNSDPnkpag1GkaBBRSR8QnQP8BLXDJxBGyeYgnc3HrQfJFh4YsmRt5apnzpfN9FCgsFiWV";

const GRANT_TYPE = 'password';

export default {
    getAuthToken: async () => {
        console.log('getAuthToken');
        let req = await fetch('disney.com');
        return req;
    }
};
