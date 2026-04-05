const request = require("supertest");
const app = require("../src/app");

describe("RBAC Test", () => {
  let viewerToken;

  const prisma = require("../src/config/prisma");
  beforeAll(async () => {
    await request(app).post("/api/auth/register").send({
      name: "Viewer",
      email: "viewer@example.com",
      password: "12345678",
    });

    await prisma.user.update({
      where: { email: "viewer@example.com" },
      data: { role: "VIEWER" },
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "viewer@example.com",
      password: "12345678",
    });

    viewerToken = res.body.token;
  });

  it("viewer should NOT create transaction", async () => {
    const res = await request(app)
      .post("/api/transactions")
      .set("Authorization", `Bearer ${viewerToken}`)
      .send({
        amount: 100,
        type: "EXPENSE",
        category: "Food",
        date: "2025-04-01",
      });

    expect(res.statusCode).toBe(403);
  });
});
