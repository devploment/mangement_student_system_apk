// استيراد المكتبات
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// إعداد Middleware
app.use(express.json());

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// تعريف مسار رئيسي
app.get('/', (req, res) => {
  res.send('Welcome to the website!');
});

// تشغيل الخادم
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
