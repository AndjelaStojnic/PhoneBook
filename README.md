# 📘 PhoneBook Project

A **full-stack Node.js + PostgreSQL application** for managing contacts and importing Geonames city data.

---

## 🚀 1. Clone the repository
```bash
# clone project from GitHub
git clone git@github.com:AndjelaStojnic/PhoneBook.git
cd PhoneBook
```

---

## 🔧 2. Install dependencies
Install required packages in both the **root** and **backend** directories:

```bash
# in root folder (workspace-level packages)
npm install

# in backend folder (server dependencies)
cd backend
npm install
cd ..
```

---

## ⚙️ 3. Environment configuration
Create a `.env` file in the **root of the project**:

```env
DB_NAME=phonebook
DB_USER=YOUR_USERNAME    # ← your Postgres username
DB_PASS=YOUR_PASSWORD    # ← your Postgres password
DB_HOST=localhost
DB_PORT=5432

# JWT secret key (used for signing tokens)
JWT_SECRET=someVeryLongRandomSecretKey123!@#
```

⚠️ Adjust values according to your **local PostgreSQL setup**.

---

## 🗄️ 4. Database setup
Start PostgreSQL and create the database:

```sql
CREATE DATABASE phonebook;
```

Run migrations (if using Sequelize migrations):

```bash
cd backend
npm run migrate
```

---

## 🌍 5. Seed data (Geonames cities & countries)
Make sure the following files are available:
```
backend/seeders/geonames/cities15000.txt
backend/seeders/geonames/countryInfo.txt
```

Import data into the database:

```bash
cd backend
npm run seed:countries
npm run seed:cities
```

If successful, you should see:
```
✅ Connected to DB
✅ Cities import done. Total in DB: XXXX
```

---

## ▶️ 6. Run the project
Start backend:

```bash
cd backend
npm start
```

Start frontend (if exists):

```bash
cd frontend
npm start
```

---

## 📦 7. Required NPM packages
Key backend dependencies:

- **dotenv** — environment variable management  
- **sequelize** — ORM  
- **pg**, **pg-hstore** — PostgreSQL drivers  
- **express** — web framework  
- **cors** — cross-origin support  
- **http-errors** — error handling  
- **nodemailer** — email support  
- **bcrypt** — password hashing
- **jsonwebtoken** — JWT authentication
- **fs**, **path**, **url** — Node.js core modules  

Install them (if missing):
```bash
npm install dotenv sequelize pg pg-hstore express cors http-errors nodemailer bcrypt jsonwebtoken
```

---

## 📜 8. Available Scripts

Inside the `backend` folder, you can run:

- `npm run dev` → Start backend in **development mode** with auto-restart (nodemon).  
- `npm start` → Start backend in **production mode**.  
- `npm run migrate` → Run Sequelize migrations.  
- `npm run seed:cities` → Import cities from `cities15000.txt`.  
- `npm run seed:countries` → Import countries from `countryInfo.txt`.  
- `npm run lint` → Run ESLint checks.  
- `npm run format` → Format code using Prettier.  

---

## ⚠️ Notes
- Do **not commit** `node_modules` or sensitive files.  
- Add a `.gitignore` like this:
```gitignore
node_modules/
backend/node_modules/
.env
dist/
build/
```
