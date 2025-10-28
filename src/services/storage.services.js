const imagekit = require('imagekit')

const storageInstance = new imagekit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL,
})
console.log('imagekit install')

const sendFilesToStorage = async (file, fileName)=>{
    return await storageInstance.upload({
        file,
        fileName,
        folders: "sastaFlipcart"
    })
}

module.exports = sendFilesToStorage;