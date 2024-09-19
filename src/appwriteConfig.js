import { Client, Databases} from 'appwrite';
const client = new Client();

export const PROJECT_ID = '66ec3de60023280b15fe';
export const DATABASE_ID = '66ec3f5c000249288f2b';
export const COLLECTION_ID_MESSAGES = '66ec3fab0015bab03ee8';

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66ec3de60023280b15fe');

    export const databases = new Databases(client);


export default client;