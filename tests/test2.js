const { SendMessage, findMessages } = require('../dist/index.js');

async function processNewMessages(token, searchTerm) {
  let previousMessageIds = [];

  while (true) {
    try {
      const newMessageIds = await findMessages(token, searchTerm);

      const foundNewIds = newMessageIds.filter(id => !previousMessageIds.includes(id));

      for (const newId of foundNewIds) {
        const message = `New message found: ${newId} (debug build)`; 
        await SendMessage({ token, message, id: newId });
        console.log(`sent message to ${newId}`);
      }

      previousMessageIds = newMessageIds;

    } catch (error) {
      console.error('Error processing new messages:', error);
    }

    await new Promise(resolve => setTimeout(resolve, 10000));
  }
}

(async () => {
  const token = process.env.TOKEN; // Your token
  const searchTerm = '@c';

  processNewMessages(token, searchTerm);
})();
