import { Client, Account, Databases, OAuthProvider, Query } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite API endpoint
    .setProject('66c9f3e7000496e06b42'); //  Appwrite project ID

const account = new Account(client);
const databases = new Databases(client);


export { account, databases, OAuthProvider, Query };
