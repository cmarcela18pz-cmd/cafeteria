const products = [
  { name: "Café de palo", category: "cafe", label: "Café", description: "Aroma profundo, servido como en casa.", price: 38, tag: "De siempre", image: "photo-1495474472287-4d71bcdd2085" },
  { name: "Capuchino", category: "cafe", label: "Café", description: "Espresso doble y espuma sedosa.", price: 62, tag: "Favorito", image: "photo-1570968915860-54d5c301fa9f" },
  { name: "Latte de la casa", category: "cafe", label: "Café", description: "Café y leche cremosa, en equilibrio.", price: 65, tag: "De la casa", image: "photo-1461023058943-07fcbe16d735" },
  { name: "Mocaccino", category: "cafe", label: "Café", description: "Espresso, chocolate y un toque dulce.", price: 70, tag: "Antojo", image: "photo-1578374173705-3c2e1be9e8a1" },
  { name: "Cold brew", category: "cafe", label: "Café", description: "Infusionado en frío, suave y refrescante.", price: 68, tag: "Frío", image: "photo-1517701604599-bb29b565090c" },
  { name: "Chocolate caliente", category: "bebidas", label: "Bebidas", description: "Chocolate hondureño, espeso y reconfortante.", price: 55, tag: "Clásico", image: "photo-1542990253-0b8be4c7c2da" },
  { name: "Limonada natural", category: "bebidas", label: "Bebidas", description: "Limón fresco, hielo y el punto justo.", price: 45, tag: "Fresquita", image: "photo-1513558161293-cdaf765edfd7" },
  { name: "Té de hierbabuena", category: "bebidas", label: "Bebidas", description: "Aromático, ligero y preparado al momento.", price: 42, tag: "Sin prisa", image: "photo-1544787219-7f47ccb76574" },
  { name: "Torta de tres leches", category: "reposteria", label: "Repostería", description: "Bizcocho suave con crema y canela.", price: 75, tag: "Más pedido", image: "photo-1578985545062-69928b1d9587" },
  { name: "Pan de banano", category: "reposteria", label: "Repostería", description: "Horneado en casa; perfecto con café.", price: 48, tag: "Casero", image: "photo-1607958996333-41aef7caefaa" },
  { name: "Croissant de mantequilla", category: "reposteria", label: "Repostería", description: "Hojaldre dorado, crujiente por fuera.", price: 52, tag: "Recién hecho", image: "photo-1555507036-ab1f4038808a" },
  { name: "Cheesecake de temporada", category: "reposteria", label: "Repostería", description: "Cremoso, con fruta según la temporada.", price: 78, tag: "Temporada", image: "photo-1533134242443-d4fd215305ad" },
  { name: "Sándwich de pollo", category: "salado", label: "Salado", description: "Pollo, vegetales frescos y aderezo de la casa.", price: 95, tag: "Almuerzo", image: "photo-1528735602780-2552fd46c7af" },
  { name: "Baleada sencilla", category: "salado", label: "Salado", description: "Tortilla de harina, frijoles y mantequilla.", price: 40, tag: "Hondureño", image: "photo-1626700051175-6818013e1d4f" },
  { name: "Panini de jamón y queso", category: "salado", label: "Salado", description: "Pan tostado, queso fundido y jamón.", price: 88, tag: "Favorito", image: "photo-1553909489-cd47e0ef937f" }
];

const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#product-search");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const filterButtons = [...document.querySelectorAll(".filter-button")];
let activeCategory = "todos";

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("es");
  const matchingProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "todos" || product.category === activeCategory;
    const searchableText = `${product.name} ${product.label} ${product.description} ${product.tag}`.toLocaleLowerCase("es");
    return matchesCategory && searchableText.includes(query);
  });

  productGrid.innerHTML = matchingProducts.map((product, index) => `
    <article class="product-card" style="animation-delay: ${Math.min(index * 35, 280)}ms">
      <div class="product-image-wrap">
        <img class="product-image" src="https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=700&q=80" alt="${product.name}" loading="lazy" />
        <span class="product-tag">${product.tag}</span>
      </div>
      <div class="product-info">
        <p class="product-category">${product.label}</p>
        <div class="product-name-row"><h3 class="product-name">${product.name}</h3><span class="product-price">L ${product.price}</span></div>
        <p class="product-description">${product.description}</p>
      </div>
    </article>
  `).join("");

  resultCount.textContent = `${matchingProducts.length} ${matchingProducts.length === 1 ? "producto" : "productos"}`;
  emptyState.hidden = matchingProducts.length > 0;
  productGrid.hidden = matchingProducts.length === 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    filterButtons.forEach((filter) => {
      const isActive = filter === button;
      filter.classList.toggle("is-active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });
    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
renderProducts();