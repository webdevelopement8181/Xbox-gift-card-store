import { Client, Account, Databases, OAuthProvider, Query } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite API endpoint
    .setProject('66be301d0028903dbeb4'); // Your Appwrite project ID

const account = new Account(client);
const databases = new Databases(client);

const fetchUsers = async () => {
    try {
        const response = await client.call('get', '/users', {
            headers: {
                'X-Appwrite-Project': '66be301d0028903dbeb4',
                'X-Appwrite-Key': 'b2d70d388b87cd3cc3fcf164bad970d9fa04d61d949e107c64159d4081ec7e2ceac1387eb62b38a65d413e3d715d388e4d1c16e12735e4b1dc9368bc8926acaede86bc2dd6eb0bcc206087f1541c6f52f776c3be2a295bc59b39e2ab3ce6914b976cc31a76f14f3dc32c9fe428736b46d22a07637230603a270f5a9c292753bf', // Add your API key here
            },
        });
        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};

export { account, databases, OAuthProvider, Query, fetchUsers };
