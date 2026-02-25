require('dotenv').config();
const app = require('./app');
const { getDb } = require('./config/db');

const PORT = process.env.PORT || 4000;

(async () => {
  await getDb();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API running on port ${PORT}`);
  });
})();
