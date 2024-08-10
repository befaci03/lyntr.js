import axios from 'axios';

async function SendMessage({ token, message, id }: { token: string; message: string; id: string }) {
  try {
    const response = await axios.post('https://lyntr.jnnj.xyz/api/comment', {
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
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

async function findMessages(token: string, searchTerm: string): Promise<string[]> {
  try {
    const response = await axios.get('https://lyntr.jnnj.xyz/api/feed', {
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

    const foundMessageIds: string[] = [];
    for (const lynt of response.data.lynts) {
      if (lynt.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lynt.content.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        foundMessageIds.push(lynt.id);
      }
    }

    return foundMessageIds;
  } catch (error) {
    console.error('Error finding messages:', error);
    return [];
  }
}

async function continuousSearch(token: string, searchTerm: string) {
  while (true) {
    const messageIds = await findMessages(token, searchTerm);
    console.log('Found message IDs:', messageIds);

    await new Promise(resolve => setTimeout(resolve, 10000));
  }
}

export { SendMessage, findMessages, continuousSearch };
