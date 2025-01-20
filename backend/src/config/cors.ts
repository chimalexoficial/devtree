import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
    origin(origin, callback) {
        console.log(origin);

        const whiteList = [process.env.FRONTEND_URL];

        if(process.argv[2] === '--api') {
            whiteList.push(undefined)
        }

        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS error'))
        }
    },
}