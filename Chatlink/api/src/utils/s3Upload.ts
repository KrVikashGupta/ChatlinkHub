import AWS from "aws-sdk";
import fs from "fs";
import { promisify } from "util";
import CustomError from "../utils/customError"; // Ensure you have a custom error handling class

// aws sdk configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  region: process.env.AWS_REGION as string,
});

// upload the img to s3 bucket
export const s3Upload = async (file: Express.Multer.File) => {
  try {
    const fileContent = await promisify(fs.readFile)(file.path);

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: `profile_pictures/${file.filename}`, // Images will be saved in profile_pictures directory
      Body: fileContent,
      ContentType: file.mimetype,
    };

    // Uploading files to the bucket
    const { Location } = await s3.upload(uploadParams).promise();

    // Delete the file from the local filesystem
    fs.unlinkSync(file.path);

    return Location;
  } catch (error) {
    console.log("Error uploading profile picture", error);
    throw new CustomError("Could not upload profile picture", 500);
  }
};

export const deleteExistingProfilePicture = async (url: string) => {
  try {
    const fileName = url.split("/").pop();

    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: `profile_pictures/${fileName}`,
    };

    await s3.deleteObject(deleteParams).promise();
  } catch (error) {
    console.log("Error deleting existing profile picture", error);
    throw new CustomError("Could not delete existing profile picture", 500);
  }
};
