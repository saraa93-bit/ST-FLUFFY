// قائمة المنتجات، يمكن أن تكون هذه البيانات من سلة التسوق الخاصة بك
const cartItems = [
    { id: 1, name: "Chocolate Cake", price: 15.99 },
    { id: 2, name: "Vanilla Cupcake", price: 7.99 }
];

// دالة لحساب إجمالي السعر
function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.price;
    });
    return total;
}

// دالة لتخزين الطلب
function placeOrder() {
    // بيانات المستخدم، يمكن استبدالها بالبيانات المدخلة من المستخدم
    const user = {
        id: Math.floor(Math.random() * 1000), // توليد ID عشوائي للمستخدم
        name: "John Doe"
    };

    // بيانات الطلب
    const order = {
        id: Math.floor(Math.random() * 10000), // توليد ID عشوائي للطلب
        userId: user.id,
        userName: user.name,
        products: cartItems.map(item => item.name),
        totalPrice: calculateTotal(),
        date: new Date().toISOString()
    };

    // التأكيد قبل تنفيذ العملية
    const confirmOrder = confirm("Are you sure you want to place this order?");
    if (confirmOrder) {
        // تخزين البيانات في localStorage (محاكاة التخزين في JSON)
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));

        // عرض رسالة تأكيد
        alert("Order placed. We will contact you soon!");
    } else {
        alert("Order canceled.");
    }
}

// ربط الفانكشن بزر "Place Order"
document.querySelector(".place-order-btn").addEventListener("click", placeOrder);
