let cart = [];

function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) {
        console.log("Cart HTML elements nahi mile!");
        return;
    }

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty 🛒</p>";
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <h3>${item.name}</h3>
                    <p>₹${item.price} × ${item.quantity}</p>
                    <strong>₹${item.price * item.quantity}</strong>
                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">
                    ❌ Remove
                </button>
            </div>
        `;
    });

    cartTotal.textContent = "₹" + total;
}
// PLACE ORDER FUNCTION

document.getElementById("place-order-btn")
    .addEventListener("click", function () {

        const message = document.getElementById("order-message");

        // Check whether cart is empty
        if (cart.length === 0) {
            message.style.display = "block";
            message.innerHTML =
                "<h3>😕 Your cart is empty!</h3>" +
                "<p>Please add some delicious food first.</p>";

            return;
        }

        // Calculate total bill
        let total = 0;

        for (let item of cart) {
            total += item.price * (item.quantity || 1);
        }

        // Generate order number
        const orderNumber =
            "FE" + Date.now().toString().slice(-6);

        // Show confirmation message
        message.style.display = "block";

        message.innerHTML = `
            <h3>🎉 Order Placed Successfully!</h3>
            <p>Thank you for choosing Foodie Express! ❤️</p>
            <p><strong>Order Number:</strong> ${orderNumber}</p>
            <p><strong>Total Amount:</strong> ₹${total}</p>
            <p>🍕 Your delicious food order is confirmed!</p>
        `;

        // Clear cart
        cart = [];
        updateCart();

        // Scroll to confirmation message
        message.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
// SHOW UPI DETAILS WHEN UPI IS SELECTED

document.querySelectorAll(
    'input[name="paymentMethod"]'
).forEach(function (option) {

    option.addEventListener("change", function () {

        const upiDetails = document.getElementById("upi-details");
        const upiInput = document.getElementById("upi-id");

        if (this.value === "UPI") {
            upiDetails.style.display = "block";
            upiInput.required = true;
        } else {
            upiDetails.style.display = "none";
            upiInput.required = false;
        }

    });

});