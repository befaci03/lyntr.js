var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
function SendMessage(_a) {
    return __awaiter(this, arguments, void 0, function* ({ token, message, id }) {
        try {
            const response = yield axios.post('https://lyntr.jnnj.xyz/api/comment', {
                id,
                content: message,
            }, {
                headers: {
                    'Accept': '*/*',
                    'Accept-Language': 'en-US,en;q=0.7',
                    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary75Bv3AOwNH7vJFNe',
                    'Cookie': `${token}`,
                    'Origin': 'https://lyntr.jnnj.xyz',
                    'Referer': `https://lyntr.jnnj.xyz/?id=${id}`,
                    'User-Agent': 'lyntr-js bot 0.0.1'
                }
            });
            return response.data;
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
    });
}
function findMessages(token, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get('https://lyntr.jnnj.xyz/api/feed', {
                params: { type: 'New' },
                headers: {
                    accept: '*/*',
                    'accept-language': 'en-US,en;q=0.7',
                    cookie: `${token}`,
                    priority: 'u=1, i',
                    referer: 'https://lyntr.jnnj.xyz/',
                    '^sec-ch-ua': '^\^Not'
                }
            });
            const foundMessageIds = [];
            for (const lynt of response.data.lynts) {
                if (lynt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    lynt.content.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                    foundMessageIds.push(lynt.id);
                }
            }
            return foundMessageIds;
        }
        catch (error) {
            console.error('Error finding messages:', error);
            return [];
        }
    });
}
function continuousSearch(token, searchTerm) {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const messageIds = yield findMessages(token, searchTerm);
            console.log('Found message IDs:', messageIds);
            yield new Promise(resolve => setTimeout(resolve, 10000));
        }
    });
}
export { SendMessage, findMessages, continuousSearch };
//# sourceMappingURL=functions.js.map