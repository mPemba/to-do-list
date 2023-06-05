const {
  initializeApp,
  // applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
require("dotenv").config();

const config = process.env.FIRESTORE_CONFIG_PATH;
const serviceAccount = require(config);

initializeApp({
  credential: cert(serviceAccount),
});

const firestore = getFirestore();

module.exports = {
  firestore,
  Timestamp,
  FieldValue,
  Filter,
};
