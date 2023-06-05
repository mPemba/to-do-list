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

const serviceAccount = require("../secret/to-do-list-c4cf0-firebase-adminsdk-8c2gk-253309cdae.json");

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
