const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/config/prisma");

describe("Role base access control", () => {
  let viewerToken, analystToken, adminToken;

  beforeAll(async () => {
    // Create users
    await request(app).post("/api/auth/register").send({
      name: "Viewer",
      email: "viewer@test.com",
      password: "123456",
    });

    await request(app).post("/api/auth/register").send({
      name: "Analyst",
      email: "analyst@test.com",
      password: "123456",
    });

    await request(app).post("/api/auth/register").send({
      name: "Admin",
      email: "admin@test.com",
      password: "123456",
    });

    // Update roles
    await prisma.user.update({
      where: { email: "analyst@test.com" },
      data: { role: "ANALYST" },
    });

    await prisma.user.update({
      where: { email: "admin@test.com" },
      data: { role: "ADMIN" },
    });

    await prisma.user.update({
      where: { email: "viewer@test.com" },
      data: { role: "VIEWER" },
    });

    // Login all
    viewerToken = (
      await request(app).post("/api/auth/login").send({
        email: "viewer@test.com",
        password: "123456",
      })
    ).body.token;

    analystToken = (
      await request(app).post("/api/auth/login").send({
        email: "analyst@test.com",
        password: "123456",
      })
    ).body.token;

    adminToken = (
      await request(app).post("/api/auth/login").send({
        email: "admin@test.com",
        password: "123456",
      })
    ).body.token;
  });

  // 🧪 VIEWER TESTS
  it("Viewer cann't view transactions", async () => {
    const res = await request(app)
      .get("/api/transactions")
      .set("Authorization", `Bearer ${viewerToken}`);

    expect(res.statusCode).toBe(403);
  });

  it("Viewer cannot create transaction", async () => {
    const res = await request(app)
      .post("/api/transactions")
      .set("Authorization", `Bearer ${viewerToken}`)
      .send({
        amount: 100,
        type: "EXPENSE",
        category: "Food",
        date: "2026-04-01",
      });

    expect(res.statusCode).toBe(403);
  });

  // 🧪 ANALYST TESTS
  it("Analyst can view transactions", async () => {
    const res = await request(app)
      .get("/api/transactions")
      .set("Authorization", `Bearer ${analystToken}`);

    expect(res.statusCode).toBe(200);
  });

  it("Analyst cannot create transaction", async () => {
    const res = await request(app)
      .post("/api/transactions")
      .set("Authorization", `Bearer ${analystToken}`)
      .send({
        amount: 200,
        type: "EXPENSE",
        category: "Food",
        date: "2026-04-01",
      });

    expect(res.statusCode).toBe(403);
  });

  // 🧪 ADMIN TESTS
  it("Admin can create transaction", async () => {
    const res = await request(app)
      .post("/api/transactions")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        amount: 5000,
        type: "INCOME",
        category: "Salary",
        date: "2026-04-01",
      });

    expect(res.statusCode).toBe(201);
  });
});
