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

  describe("GET /", () => {
    it("should fetch devices from collection", async () => {
      const results = await request(server).get("/api/devices");
      expect(results.status).toBe(200);
      expect(results.body.length).toBeGreaterThan(0);
    });
  });

  describe("POST / ", () => {
    it("should insert a device into collection", async () => {
      const payload = {
        device: "Sam",
        os: "Android",
        manufacturer: "India",
      };
      const response = await request(server).post("/api/devices").send(payload);
      expect(response.status).toBe(201);
      expect(response.body.data).toMatchObject({ device: "Sam" });
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
      expect(res.body.data).toMatchObject({ device: "Motorola" });
      const result = await request(server)
        .delete("/api/devices/" + res.body.data._id)
        .send(payload);
      expect(result.status).toBe(200);
    });
  });

  describe("POST / ", () => {
    it("should insert a feedback into collection", async () => {
      const payload = {
        device: "Sam2",
        os: "Android2",
        manufacturer: "India2",
      };
      const response = await request(server).post("/api/devices").send(payload);
      expect(response.status).toBe(201);
      expect(response.body.data).toMatchObject({ device: "Sam2" });

      const feedback = {
        feedback: "feedback 1",
      };
      const feedbackResponse = await request(server)
        .put(`/api/feedback/${response.body.data._id}`)
        .send(feedback);
      expect(feedbackResponse.status).toBe(201);
    });
  });

  describe("PATCH / ", () => {
    it("should check in device", async () => {
      const payload = {
        device: "Apple New",
        os: "Catalina New",
        manufacturer: "India New",
      };
      const response = await request(server).post("/api/devices").send(payload);
      expect(response.status).toBe(201);
      expect(response.body.data).toMatchObject({ device: "Apple New" });

      const checkInReponse = await request(server).patch(
        `/api/check-in-out/${response.body.data._id}`
      );
      expect(checkInReponse.status).toBe(200);
      expect(checkInReponse.body).toMatchObject({
        message: "check-in done successfully.",
      });
    });
  });

  describe("UPDATE  / ", () => {
    it("should checkout device", async () => {
      const payload = {
        device: "Apple",
        os: "Catalina",
        manufacturer: "India",
      };
      const response = await request(server).post("/api/devices").send(payload);
      expect(response.status).toBe(201);
      expect(response.body.data).toMatchObject({ device: "Apple" });

      const checkOutData = {
        lastCheckOutBy: "sam@123",
        startTime: "09:00:00",
        endTime: "23:00:00",
      };
      const checkOutResponse = await request(server)
        .put(`/api/check-in-out/${response.body.data._id}`)
        .send(checkOutData);

      expect(checkOutResponse.status).toBe(201);
      expect(checkOutResponse.body).toMatchObject({
        message: "check-out done succesfully",
      });

      const checkOutDataWithSameName = {
        lastCheckOutBy: "sam@123",
        startTime: "09:00:00",
        endTime: "17:00:00",
      };

      const checkOutUser = await request(server)
        .put(`/api/check-in-out/${response.body.data._id}`)
        .send(checkOutDataWithSameName);
      expect(checkOutUser.status).toBe(200);
      expect(checkOutUser.body).toMatchObject({
        message: "Device already checkout by this user.",
      });

      const checkOutDateValidation = {
        lastCheckOutBy: "sam@1234",
        startTime: "18:00:00",
        endTime: "19:00:00",
      };
      const checkOutTime = await request(server)
        .put(`/api/check-in-out/${response.body.data._id}`)
        .send(checkOutDateValidation);
      expect(checkOutTime.status).toBe(200);
      expect(checkOutTime.body).toMatchObject({
        message: "check out can performed between 9:00 AM to 17:00 AM",
      });
    });
  });
});
