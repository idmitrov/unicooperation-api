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
        port: cfg.API_PORT
    },
    admin: {
        email: cfg.ADMIN_EMAIL,
        username: cfg.ADMIN_USERNAME,
        password: cfg.ADMIN_PASSWORD,
    }
}