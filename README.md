# 📘 PhoneBook Project

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A **full-stack Node.js + PostgreSQL + React** application for managing contacts and importing Geonames city data.

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

# in frontend folder (server dependencies)
cd ../frontend
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
npm run dev   # development (sa nodemon, auto-restart)
# ili
npm start     # production
```

Start frontend (if exists):

```bash
cd frontend
npm run dev   # development server na http://localhost:5173
# ili
npm run build && npm run preview   # build + preview
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

Key frontend dependencies:

- **react** — UI library
- **vite** — build tool
- **tailwindcss** — styling
- **postcss** — CSS transformations
- **autoprefixer** — vendor prefixer

Install them (if missing):
```bash
npm install react react-dom
npm install -D vite tailwindcss postcss autoprefixer
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

Inside the `frontend` folder, you can run:
- `npm run dev` → Start dev server (http://localhost:5173).
- `npm run build` → Create production build.
- `npm run preview` → Preview production build localy.
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
