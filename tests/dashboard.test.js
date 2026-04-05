const request = require("supertest");
const app = require("../src/app");

describe("Dashboard APIs", () => {
  let token;

  beforeAll(async () => {
    await request(app).post("/api/auth/register").send({
      name: "User",
      email: "dash@test.com",
      password: "123456",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "dash@test.com",
      password: "123456",
    });

    token = res.body.token;
  });

  it("should get summary", async () => {
    const res = await request(app)
      .get("/api/dashboard/summary")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  it("should get recent transactions", async () => {
    const res = await request(app)
      .get("/api/dashboard/recent")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
