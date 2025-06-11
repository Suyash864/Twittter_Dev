import { upload, uploadToS3 } from "../config/file-upload-s3-config.js";
import TweetService from "../services/tweet-service.js";

// const singleUploader = upload.single('image');
const tweetService = new TweetService();

export const createTweet = async (req, res) => {
    try {
        upload.single("image")(req, res, async function (err) {
            if(err) {
                console.error("Multer error:", err);
                return res.status(500).json({error: err});
            }
            // console.log('Image url is', req.file); 

            const payload = {...req.body};
            // payload.image = req.file.location;

            if (req.file) {
                const imageUrl = await uploadToS3(req.file);
                payload.image = imageUrl;
            }

            const response = await tweetService.create(payload);

            return res.status(201).json({
                success: true,
                message: 'Successfully created a new tweet',
                data: response,
                err: {}
            });
        });
    } catch (error) {
        console.error("Tweet creation error:", error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            err: error
        });
    }
}

export const getTweet = async (req, res) => {
    try {
        const response = await tweetService.get(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched a tweet',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            err: error
        });
    }
};