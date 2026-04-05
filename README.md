# 💰 Finance Dashboard Backend

A production-ready backend system for managing financial records, user roles, and analytics dashboards.
Built with a focus on clean architecture, role-based access control, and real-world backend practices.

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT
- **Validation:** Zod
- **Testing:** Jest + Supertest
- **Documentation:** Swagger (OpenAPI)

---

## 📁 Project Structure

```
finance-dashboard-backend/
│
├── src/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── tests/
│   ├── transaction.test.js
│   ├── dashboard.test.js
│   ├── roles.test.js
    ├── rbac.test.js
    ├── env.js.js
│   └── setup.js
│
├── .env
├── .env.test
├── .env.example
├── jest.config.js
├── prisma.config.ts
└── package.json
```

---

## 🔐 Features

### 1. User & Role Management

- User registration and login
- JWT-based authentication
- Role-based access control (RBAC)
- Roles:
  - **Admin** – Full access
  - **Analyst** – Read + analytics
  - **Viewer** – Read-only

---

### 2. Financial Records (Transactions)

- Create, read, update, delete transactions
- Fields:
  - amount
  - type (INCOME / EXPENSE)
  - category
  - date
  - notes

- Filtering:
  - date range
  - category
  - type

- Pagination support

---

### 3. Dashboard APIs

- Total income
- Total expenses
- Net balance
- Category-wise breakdown
- Monthly trends
- Recent transactions

---

### 4. Access Control (RBAC)

| Role    | Permissions                   |
| ------- | ----------------------------- |
| Viewer  | View dashboard & transactions |
| Analyst | View data + insights          |
| Admin   | Full CRUD + user management   |

---

### 5. Validation & Error Handling

- Request validation using **Zod**
- Clear and structured error responses
- Proper HTTP status codes

---

### 6. Rate Limiting

- Global API rate limiting
- Strict limits on authentication endpoints

---

### 7. API Documentation

- Swagger UI available at:

```
http://localhost:8000/api-docs
```

---

### 8. Testing (Integration Tests)

- Built using **Jest + Supertest**
- Covers:
  - Authentication
  - Transactions
  - RBAC
  - Dashboard APIs

- Uses a **separate test database**

---

## 🗄️ Database Setup

### 1. Install dependencies

```
npm install
```

### 2. Setup environment variables

Create `.env`:

```
DATABASE_URL=your_main_db_url
JWT_SECRET=your_secret
PORT=8000
```

---

### 3. Run migrations

```
npx prisma migrate dev
```

---

### 4. Prisma Studio (Database Viewer)

```
- Open Prisma Studio

Run: npx prisma studio (after doing the step 5)

Then open in browser: http://localhost:5555

- Using Test Database

By default, Prisma Studio uses .env (main database).
To open test database, follow the approache:

Using dotenv-cli
Install: npm install -D dotenv-cli

Run: npx dotenv -e .env.test -- prisma studio

```

---

### 5. Start server

```
npm run dev
```

---

## 🧪 Testing

### Setup test database

Create `.env.test`:

```
DATABASE_URL=your_test_db_url
```

---

### Run tests

```
npm test
```

---

## 🧠 Design Decisions

- Implemented **role-based access control (RBAC)** using middleware
- Designed dashboard APIs using **aggregation queries**
- Used **separate test database** to avoid affecting production data
- Followed **layered architecture**:

  ```
  Controller → Service → Repository
  ```

---

## ⚠️ Notes

- Integration tests use dynamic data to avoid conflicts

---

## 👨‍💻 Author

**Ankit Gupta**

---

## 📌 Conclusion

This project demonstrates:

- Clean backend architecture
- Secure API design
- Real-world RBAC implementation
- Scalable and testable system

---

⭐ This is a production-ready backend system designed with industry best practices.
