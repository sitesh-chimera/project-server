const request = require("supertest");
const DeviceModel = require("../../src/device/model");
let server;
describe("Testing Device", () => {
  beforeEach(async () => {
    server = require("../../index");
    await DeviceModel.remove({}).exec(); // removing all from Database
    await DeviceModel.insertMany({
      // insert test data
      device: "Apple",
      os: "IOS",
      manufacturer: "India",
    });
  });
  afterEach(() => {
    server.close();
  });

  describe("fetch", () => {
    it("should fetch devices from collection", async () => {
      const results = await request(server).get("/api/devices");
      expect(results.status).toBe(200);
      expect(results.body.length).toBeGreaterThan(0);
    });
  });

  describe("insert / ", () => {
    it("should insert a device into collection", async () => {
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

  describe("Delete / ", () => {
    it("should delete the device", async () => {
      const payload = {
        device: "Motorola",
        os: "motorola plaza",
        manufacturer: "Motorola",
      };
      const res = await request(server).post("/api/devices").send(payload);
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ device: "Motorola" });
      const result = await request(server)
        .delete("/api/devices/" + res.body._id)
        .send(payload);
      expect(result.status).toBe(200);
    });
  });

  describe("insert feedback / ", () => {
    it("should insert a feedback into collection", async () => {
      const payload = {
        device: "Sam2",
        os: "Android2",
        manufacturer: "India2",
      };
      const response = await request(server).post("/api/devices").send(payload);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({ device: "Sam2" });

      const feedback = {
        feedback: "feedback 1",
      };
      const feedbackResponse = await request(server)
        .put(`/api/feedback/${response.body._id}`)
        .send(feedback);
      expect(feedbackResponse.status).toBe(201);
    });
  });
});
