"use server"
import {  randomBytes } from 'crypto';
import FileUrls from '../models/files';
import tokenUtils from '../utils/token';

const generateShortUrl = ()=> {
    const short = randomBytes(6);
    const shortUrl = `${url}/${short}`;
    return shortUrl;
}

const shortUrl = async function (request) {
    const req = await request.json();
    const token = req.cookies.get('uid');
    const userId = tokenUtils.verifyToken(token)?.id || null;
    let short;
    do{
        short = generateShortUrl();
    }while(FileUrls.findOne({shortUrl: short}));
    const newUrl = await FileUrls.create({ user: userId, originalUrl: req.originalUrl, shortUrl: `${url}/${short}` });
    return newUrl.shortUrl;
}

export default shortUrl;
