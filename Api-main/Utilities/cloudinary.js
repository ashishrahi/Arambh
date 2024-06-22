const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configuration
    cloudinary.config({ 
    cloud_name: "drylsvqmx", 
    api_key: "217511642449191", 
    api_secret: "Wwg-mZiQBph7frpZeesm6kZqMZg" // Click 'View Credentials' below to copy your API secret
    });
 
    const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null;
        //upload the file on cloudinary
        const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })
        //file has been successfully uploaded
        console.log('file is uploaded successfully',response.url);
        return response;
    } 
    catch (error) {
        fs.unlinkSync(localFilePath)// remove temporary file
         return null;
    }
}
