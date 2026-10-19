
const productGrid = document.getElementById("productGrid");
const cartModal = document.getElementById("cartModal");
const payCryptoBtn = document.getElementById("payCryptoBtn");
const modalXBtn = document.getElementById("modalXBtn");
const bottomCloseBtn = document.getElementById("closeModalBtn");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const modalTotalPrice = document.getElementById("totalPrice");
const totalPriceElement = document.querySelector("#total-price h2");

// Keep products available to every function
let products = [];
let currentTotal = 0;

// Fetch products
async function fetchProducts() {
    productGrid.innerHTML = `
        <p class="col-span-full py-10 text-center text-sm text-gray-500">
            Loading products...
        </p>
    `;

    try {
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        const data = await response.json();

        products = data.products.map(item => ({
            id: item.id,
            name: item.title,
            price: item.price,
            qty: 0,
            image: item.thumbnail
        }));

        addProduct(products);
        updateTotal();

    } catch (error) {
        console.error("Product loading error:", error);

        productGrid.innerHTML = `
            <div class="col-span-full text-center py-8">
                <p class="text-sm text-red-500 mb-3">
                    Products could not be loaded.
                </p>
                <button id="retryBtn"
                    class="bg-black text-white px-4 py-2 rounded text-xs">
                    Retry
                </button>
            </div>
        `;
    }
}

// Render product cards
function addProduct(productList) {
    productGrid.innerHTML = "";

    productList.forEach(product => {
        const card = document.createElement("div");

        card.className =
            "rounded flex flex-col justify-between items-start text-left bg-white w-full";

        card.innerHTML = `
            <span class="text-[11px] font-semibold uppercase tracking-wider mb-1 text-gray-600 w-full">
                ${product.name}
            </span>

            <div class="w-full h-36 my-1 flex items-center justify-center">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="max-h-full max-w-full object-contain"
                >
            </div>

            <div class="w-full flex justify-between items-center mt-1 text-xs">
                <span class="font-bold">
                    ${product.price.toFixed(2)} USDC
                </span>

                <div class="flex items-center border border-gray-300 rounded overflow-hidden">
                    <button
                        type="button"
                        data-id="${product.id}"
                        data-change="-1"
                        class="px-2.5 py-1 hover:bg-gray-100 border-r border-gray-300 cursor-pointer">
                        -
                    </button>

                    <span id="qty-${product.id}" class="px-3 py-1">
                        ${product.qty}
                    </span>

                    <button
                        type="button"
                        data-id="${product.id}"
                        data-change="1"
                        class="px-2.5 py-1 hover:bg-gray-100 border-l border-gray-300 cursor-pointer">
                        +
                    </button>
                </div>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

// Change product quantity
function updateQty(productId, change) {
    const product = products.find(
        item => String(item.id) === String(productId)
    );

    if (!product) {
        console.error("Product not found:", productId);
        return;
    }

    product.qty = Math.max(0, product.qty + Number(change));

    const quantityElement = document.getElementById(`qty-${product.id}`);

    if (quantityElement) {
        quantityElement.textContent = product.qty;
    }

    updateTotal();

    if (cartModal.style.display === "flex") {
        updateCartModal();
    }
}

// Calculate total
function updateTotal() {
    currentTotal = products.reduce(
        (sum, product) => sum + product.price * product.qty,
        0
    );

    if (totalPriceElement) {
        totalPriceElement.textContent =
            `TOTAL ${currentTotal.toFixed(2)} USDC`;
    }

    if (modalTotalPrice) {
        modalTotalPrice.textContent = currentTotal.toFixed(2);
    }
}

// Update cart contents
function updateCartModal() {
    const selectedProducts = products.filter(
        product => product.qty > 0
    );

    cartItemsContainer.innerHTML = "";

    if (selectedProducts.length === 0) {
        cartItemsContainer.innerHTML = `
            <p class="text-center text-gray-500 text-sm py-6">
                Your cart is empty.
            </p>
        `;

        updateTotal();
        return;
    }

    selectedProducts.forEach(item => {
        const itemDiv = document.createElement("div");

        itemDiv.className =
            "flex flex-row items-center justify-between py-3 border-b border-gray-200 text-xs w-full gap-3";

        itemDiv.innerHTML = `
            <div class="flex items-center gap-3 min-w-0">
                <div class="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center p-1 shrink-0 border border-gray-100">
                    <img src="${item.image}"
                        alt="${item.name}"
                        class="max-h-full max-w-full object-contain">
                </div>

                <div class="min-w-0">
                    <p class="font-bold text-gray-900">
                        ${item.name}
                    </p>
                    <p class="text-gray-500 mt-1">
                        Qty: ${item.qty}
                    </p>
                </div>
            </div>

            <div class="flex items-center gap-3 shrink-0">
                <span class="font-bold">
                    ${(item.price * item.qty).toFixed(2)} USDC
                </span>

                <button
                    type="button"
                    data-id="${item.id}"
                    data-change="-1"
                    class="border border-gray-300 px-2.5 py-1 rounded hover:bg-gray-200 cursor-pointer">
                    -
                </button>
            </div>
        `;

        cartItemsContainer.appendChild(itemDiv);
    });

    updateTotal();
}

// Open cart
function openCartModal() {
    if (!products.some(product => product.qty > 0)) {
        alert("ကျေးဇူးပြု၍ ပစ္စည်း အနည်းဆုံး တစ်ခု ရွေးချယ်ပါ။");
        return;
    }

    updateCartModal();
    cartModal.style.display = "flex";
}

// Close cart
function closeCartModal() {
    cartModal.style.display = "none";
}

// Handle product quantity buttons
// Event delegation works with dynamically created product cards
productGrid.addEventListener("click", event => {
    const retryButton = event.target.closest("#retryBtn");

    if (retryButton) {
        fetchProducts();
        return;
    }

    const button = event.target.closest("button[data-id][data-change]");

    if (!button) return;

    updateQty(button.dataset.id, Number(button.dataset.change));
});

// Handle minus buttons in cart
cartItemsContainer.addEventListener("click", event => {
    const button = event.target.closest("button[data-id][data-change]");

    if (!button) return;

    updateQty(button.dataset.id, Number(button.dataset.change));
});

// Checkout
payCryptoBtn.addEventListener("click", openCartModal);

// Close buttons
modalXBtn.addEventListener("click", closeCartModal);
bottomCloseBtn.addEventListener("click", closeCartModal);

// Close when clicking outside the cart box
cartModal.addEventListener("click", event => {
    if (event.target === cartModal) {
        closeCartModal();
    }
});

// Close with Escape key
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeCartModal();
    }
});

// Initial load
cartModal.style.display = "none";
fetchProducts();
