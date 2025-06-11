import { PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();
console.log("Loaded region:", process.env.AWS_REGION);


const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const upload = multer({
    storage: multer.memoryStorage(),
});

const uploadToS3 = async (file) => {
    const key = `${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
    Metadata: {
        fieldName: file.fieldname,
    },
    });

    await s3.send(command);

    const fileUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return fileUrl;
};

export { upload, uploadToS3 };

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.BUCKET_NAME,
//         acl: 'public-read',
//         metadata: function (req, file, cb) {
//             cb(null, {fieldName: file.fieldname});
//         },
//         key: function (req, file,cb) {
//             cb(null, Date.now().toString())
//         }
//     })
// })

// export default upload;