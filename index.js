
// استيراد المكتبات الضرورية
const express = require('express');
const { Pool } = require('pg');
const path = require('path');

// إنشاء تطبيق Express
const app = express();
const port = process.env.PORT || 3000;

// إعدادات قاعدة البيانات
const pool = new Pool({
  user: 'postgres_user', // استبدل باسم مستخدم PostgreSQL
  host: 'localhost',     // أو عنوان الخادم إذا كان السحابي
  database: 'students_db', // استبدل باسم قاعدة البيانات
  password: 'password',   // كلمة مرور المستخدم
  port: 5432,            // منفذ PostgreSQL
});

// إنشاء جدول الطلاب إذا لم يكن موجودًا
pool.query(`
  CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    number INTEGER NOT NULL UNIQUE,
    math INTEGER NOT NULL,
    physics INTEGER NOT NULL,
    chemistry INTEGER NOT NULL,
    arabic INTEGER NOT NULL,
    history INTEGER NOT NULL,
    geography INTEGER NOT NULL,
    computer INTEGER NOT NULL,
    english INTEGER NOT NULL
  );
`, (err, res) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table "students" created successfully or already exists.');
  }
});

// إعداد المجلد العام للملفات الثابتة (للصورة وغيرها)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// رسالة الترحيب وعرض الصورة
app.get('/', (req, res) => {
  res.send(`
    <h1 style="text-align: center;">مرحبًا بكم في مدرسة الوحدة</h1>
    <img src="/school.jpg" alt="مدرسة الوحدة" style="display: block; margin: 0 auto;">
    <h2 style="text-align: center;">مدرسة الوحدة</h2>
    <form method="POST" action="/add-student" style="text-align: center;">
      <label>اسم الطالب:</label><br>
      <input type="text" name="name" required><br>
      <label>الرقم:</label><br>
      <input type="number" name="number" required><br>
      <label>الدرجات (رياضيات، فيزياء، كيمياء، ...):</label><br>
      <input type="number" name="math" required><br>
      <input type="number" name="physics" required><br>
      <input type="number" name="chemistry" required><br>
      <input type="number" name="arabic" required><br>
      <input type="number" name="history" required><br>
      <input type="number" name="geography" required><br>
      <input type="number" name="computer" required><br>
      <input type="number" name="english" required><br>
      <button type="submit">إضافة الطالب</button>
    </form>
  `);
});

// إدخال بيانات الطالب في قاعدة البيانات
app.post('/add-student', async (req, res) => {
  const { name, number, math, physics, chemistry, arabic, history, geography, computer, english } = req.body;
  try {
    await pool.query(
      `INSERT INTO students (name, number, math, physics, chemistry, arabic, history, geography, computer, english)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [name, number, math, physics, chemistry, arabic, history, geography, computer, english]
    );
    res.send('تمت إضافة الطالب بنجاح.');
  } catch (err) {
    console.error(err);
    res.send('حدث خطأ أثناء إدخال بيانات الطالب.');
  }
});

// الاستماع إلى الطلبات على المنفذ المحدد
app.listen(port, () => {
  console.log(`التطبيق يعمل على http://localhost:${port}`);
});
