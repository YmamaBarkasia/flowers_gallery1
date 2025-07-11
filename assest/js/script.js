
window.addEventListener("load", () => {
  const title = document.getElementById("animated-title");
  const paragraph = document.getElementById("animated-text");
  const btn = document.getElementById("btn");
  title.classList.add("zoom-in");
  paragraph.classList.add("zoom-in");
  btn.classList.add("zoom-in");
});

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.createElement('button');
    menuToggle.textContent = '☰';
    menuToggle.classList.add('menu-toggle');
    
    const nav = document.querySelector('nav ul');
    nav.before(menuToggle);

    menuToggle.addEventListener('click', function () {
        nav.classList.toggle('active');
    });

    const cartCount = localStorage.getItem('cartCount') || 0;
    const cartLink = document.querySelector('nav ul li:nth-child(4) a');
    if (cartCount > 0) {
        let badge = document.createElement('span');
        badge.textContent = cartCount;
        badge.className = 'cart-badge';
        cartLink.appendChild(badge);
    }

   });


document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>السلة فارغة</p>";
        cartTotal.textContent = "0 ليرة سورية";
        return;
    }

    cartContainer.innerHTML = "";

    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";

        const price = parseFloat(item.price.replace(/[^\d\.]/g, '')) || 0;
        const quantity = parseInt(item.quantity) || 1;
        const itemTotal = price * quantity;
        total += itemTotal;

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>سعر الوحدة: ${item.price}</p>
            </div>
            <div class="item-controls">
                <input type="number" min="1" value="${quantity}" onchange="updateQuantity(${index}, this.value)">
                <span class="quantity">${itemTotal} ليرة سورية</span>
                <button class="remove-btn" onclick="removeItem(${index})">حذف</button>
            </div>
        `;

        cartContainer.appendChild(itemDiv);
    });

    cartTotal.textContent = `${total.toFixed(2)} ليرة سورية`;
}

function updateQuantity(index, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
     
    const cartCount = cart.length;
    const badge = document.querySelector('.cart-badge');
    if (badge) badge.remove();

    if (cartCount > 0) {
        const cartLink = document.querySelector('nav ul li:nth-child(4) a');
        let newBadge = document.createElement('span');
        newBadge.textContent = cartCount;
        newBadge.className = 'cart-badge';
        cartLink.appendChild(newBadge);
    }
}

function checkout() {
    alert("تم تأكيد عملية الشراء بنجاح!");
    localStorage.removeItem('cart');
    const badge = document.querySelector('.cart-badge');
    if (badge) badge.remove();
    renderCart();
}


function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    alert(`تم إضافة "${name}" إلى السلة!`);
}


function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.length;

    const badge = document.querySelector('.cart-badge');
    if (badge) badge.remove();

    if (cartCount > 0) {
        const cartLink = document.querySelector('nav ul li:nth-child(4) a');
        const newBadge = document.createElement('span');
        newBadge.textContent = cartCount;
        newBadge.className = 'cart-badge';
        cartLink.appendChild(newBadge);
    }
}

document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedCategory = button.getAttribute('data-category');
        const cards = document.querySelectorAll('.flower-card');

        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
