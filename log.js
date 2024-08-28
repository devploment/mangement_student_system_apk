// قائمة المستخدمين المسجلين مسبقاً
const users = [
    { username: 'abc', password: '123', email: 'queendreem 199@gmail.com' },
    { username: 'user2', password: 'pass2', email: 'user2@example.com' }
];

// تحقق من بيانات تسجيل الدخول
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // البحث عن المستخدم المدخل
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // تخزين بيانات المستخدم في localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(user));
    //    alert('تسجيل دخول ناجح!');
        // تحويل إلى الصفحة الرئيسية
        window.location.href = 'mandoma.html';
    } else {
        alert('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
}

// استرجاع كلمة المرور
function forgotPassword() {
    const username = prompt('الرجاء إدخال اسم المستخدم الخاص بك:');
    const user = users.find(user => user.username === username);

    if (user) {
        alert(`تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني: ${user.email}`);
    } else {
        alert('اسم المستخدم غير موجود');
    }
}
