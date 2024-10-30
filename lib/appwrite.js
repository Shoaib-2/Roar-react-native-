

import { ID, Account, Client, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platformId: 'com.sho.roar',
    projectId: '671001e1002581e9513f',
    databaseId: '671005220015f5e32b60',
    userCollectionId: '6710056d00045e9e4339',
    videoCollectionId: '671005c100254a9e0649',
    storageBucketId: '671007d5001332351184',
}

const {
    endpoint,
    platformId,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageBucketId,
} = appwriteConfig


// Init your React Native SDK
const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint) 
    .setProject(appwriteConfig.projectId) 
    .setPlatform(appwriteConfig.platformId) 
;
    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client)
    const storage = new Storage(client)


    export const createUser = async (email, password, username) => {
       try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if(!newAccount) throw Error('Failed to create user');
        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        )
        return newUser;

       } catch (error) {
        console.log(error);
        throw new Error(error);
       }
    }

    export const signIn = async(email, password) => {
        try {
           const session = await account.createEmailPasswordSession
           (email, password)
           return session;
        } catch (error) {
            throw new Error(error);
        }
    }

   export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)])
        if(!currentUser)   throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
   }

   export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
   }


   export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
   }


   export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query)]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
   }

   export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator', userId),  Query.orderDesc('$createdAt')]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
   }

   export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        throw new Error(error)
    }
   }


   export const getFilePreview = async(fileId, type) => {
    let fileUrl;
    try {
        if(type === 'video'){
            fileUrl = storage.getFileView(storageBucketId, fileId);
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(storageBucketId, fileId, 2000, 2000, 'top', 100)
        } else {
            throw new Error('Invalid file type');
        } if (!fileUrl) throw Error;
        return fileUrl;
    } catch (error) {
        throw new Error(error)
    }
   }

   export const uploadFile = async (file, type) => {
    if(!file) return;
    const {mimeType, ...rest} = file;
    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    }
    
    try {
        const uploadedFile = await storage.createFile(
            storageBucketId,
            ID.unique(),
            asset
        );
        
        const fileUrl = await getFilePreview (uploadedFile.$id, type);
        return fileUrl;
    } catch (error) {
        throw new Error(error)
    }
   }

   export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ])

        const newPost = await databases.createDocument(
            databaseId,
            videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
        )
        return newPost;
    } catch (error) {
        throw new Error(error)
    }
   }