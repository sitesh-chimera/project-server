const request = require("supertest");
const DeviceModel = require("../../src/device/model");
let server;
describe("Testing Device", () => {
  beforeEach(async () => {
    server = require("../../index");
    await DeviceModel.remove({}).exec(); // removing all from Database
  });
  afterEach(() => {
    server.close();
  });

  describe("POST / ", () => {
    it("create device", async () => {
      const payload = {
        device: "Sam",
        os: "Android",
        manufacturer: "India",
      };
      const response = await request(server).post("/api/devices").send(payload);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({ device: "Sam" });
    });
  });
});
