const { SendMessage, findMessages } = require('../dist/index.js');

(async () => {
  const token = process.env.TOKEN;
  const message = 'omg this works! (testing lyntr.js)';
  const id = '10213326932307968';
  const searchTerm = '@c';

  try {
    const response = await SendMessage({ token, message, id });
    console.log('Message sent successfully:', response);

    // Find messages
    const messageIds = await findMessages(token, searchTerm);
    console.log('Found message IDs:', messageIds);
  } catch (error) {
    console.error('Error:', error);
  }
})();
