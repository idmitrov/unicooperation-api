import { config } from 'dotenv';
const cfg = config({ path: `.env.${process.env.NODE_ENV}` }).parsed;

if (!cfg) {
    throw new Error('Environment variables are not set!');
}

export default {
    db: {
        host: cfg.DB_HOST,
        port: cfg.DB_PORT,
        name: cfg.DB_NAME
    },
    api: {
        host: cfg.API_HOST,
        port: cfg.API_PORT,
        secret: cfg.API_SECRET,
        origins: cfg.API_ALLOWED_ORIGINS
    },
    admin: {
        email: cfg.ADMIN_EMAIL,
        username: cfg.ADMIN_USERNAME,
        password: cfg.ADMIN_PASSWORD,
    },
    smtp: {
        secure: cfg.SMTP_SECURE,
        host: cfg.SMTP_HOST,
        port: cfg.SMTP_PORT,
        service: cfg.SMTP_SERVICE,
        user: cfg.SMTP_USER,
        password: cfg.SMTP_PASSWORD
    },
    aws: {
        secret: cfg.AWS_SECRET,
        key: cfg.AWS_KEY,
        region: cfg.AWS_REGION,
        s3: {
            upload: {
                bucket: cfg.AWS_S3_UPLOAD_BUCKET
            }
        }
    }
}