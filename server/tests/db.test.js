const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
require("../src/db");

jest.mock("firebase-admin/app", () => ({
  initializeApp: jest.fn(),
  cert: jest.fn(),
}));

jest.mock("firebase-admin/firestore", () => ({
  getFirestore: jest.fn(),
}));

const config = jest.mock(
  "../secret/to-do-list-c4cf0-firebase-adminsdk-8c2gk-253309cdae.json",
  () => ({
    type: "service_account",
  }),
  { virtual: true }
);

describe("Firestore", () => {
  it("should initialize the app", () => {
    expect(initializeApp).toHaveBeenCalledWith({
      credential: cert(config),
    });
  });

  it("should initialize the firestore", () => {
    expect(getFirestore).toHaveBeenCalled();
  });
});
