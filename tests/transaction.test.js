const request = require("supertest");
const app = require("../src/app");

describe("Transaction APIs", () => {
  let token;

  beforeAll(async () => {
    // register
    await request(app).post("/api/auth/register").send({
      name: "Admin",
      email: "admin@example.com",
      password: "12345678",
    });

    // login
    const res = await request(app).post("/api/auth/login").send({
      email: "admin@example.com",
      password: "12345678",
    });

    token = res.body.token;
  });

  it("should create transaction", async () => {
    const res = await request(app)
      .post("/api/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 15000,
        type: "INCOME",
        category: "Salary",
        date: "2025-04-01",
      });

    expect(res.statusCode).toBe(201);
  });

  it("should get transactions", async () => {
    const res = await request(app)
      .get("/api/transactions")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
