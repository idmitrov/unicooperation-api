import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import Config from './config';

export const configureAWS = () => {
    aws.config.update({
        secretAccessKey: Config.aws.secret,
        accessKeyId: Config.aws.key,
        region: Config.aws.region
    });
}

export const uploadS3 = (namespace = 'global') => {
    return multer({
        storage: multerS3({
            s3: new aws.S3(),
            acl: 'public-read',
            bucket: Config.aws.s3.upload.bucket,
            key: function (req, file, cb) {
                const path =`${namespace}/${req.account.id}/${Date.now()}-${file.originalname}`;

                cb(null, path);
            }
        })
    });
}