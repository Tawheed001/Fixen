const productGrid = document.getElementById('product-grid');
const products = [];

// Generate 1000+ products with random images
for (let i = 1; i <= 1000; i++) {
  const type = Math.random() < 0.5 ? "T-Shirt" : "Shirt";
  const name = `${type} #${i}`;
  const price = (Math.random() * 50 + 10).toFixed(2);
  const imageUrl = `https://picsum.photos/200/200?random=${i}`; // Random placeholder image
  products.push({ name, price, imageUrl });
}

// Render products
products.forEach(product => {
  const div = document.createElement('div');
  div.className = 'product';
  div.innerHTML = `
    <img src="${product.imageUrl}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>$${product.price}</p>
    <input type="number" min="0" value="0" data-name="${product.name}" data-price="${product.price}">
  `;
  productGrid.appendChild(div);
});

// Checkout logic
document.getElementById('checkout-btn').addEventListener('click', () => {
  let message = 'Hello, I would like to order the following from Fixen:\n\n';
  const inputs = document.querySelectorAll('input[type="number"]');
  let hasItems = false;

  inputs.forEach(input => {
    if (parseInt(input.value) > 0) {
      hasItems = true;
      message += `${input.dataset.name} - Quantity: ${input.value} - Price: $${input.dataset.price}\n`;
    }
  });

  if (!hasItems) {
    alert('Please add at least one product to your cart.');
    return;
  }

  const encodedMessage = encodeURIComponent(message);
  window.location.href = `https://wa.me/919641911441?text=${encodedMessage}`;
});
