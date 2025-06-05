const products = document.querySelectorAll(".product");

checkStorage();

products.forEach((product) => {
  product.addEventListener("click", (e) => {
    if (e.target.classList.contains("product__quantity-control_dec")) {
      counterDec(e.target);
    }
    if (e.target.classList.contains("product__quantity-control_inc")) {
      counterInc(e.target);
    }
    if (e.target.classList.contains("product__add")) {
      checkProduct(e.currentTarget);
      checkCartProduct();
    }
  });
});

function counterDec(element) {
  const value = element.nextElementSibling;
  if (Number(value.textContent) > 1) {
    value.innerText = Number(value.textContent) - 1;
  }
}

function counterInc(element) {
  const value = element.previousElementSibling;
  value.innerText = Number(value.textContent) + 1;
}

function checkProduct(product) {
  const cartProducts = document.querySelectorAll(".cart__product");
  let id = product.dataset.id;
  let count = Number(
    product.querySelector(".product__quantity-value").textContent
  );
  let src = product.querySelector(".product__image").src;

  let cartProduct = Array.from(cartProducts).find((el) => el.id === id);

  if (cartProduct) {
    count = changeProduct(cartProduct, count);
    flytoCart(product, cartProduct);
  } else {
    createCartProduct(id, src, count);
  }
  let obj = {
    id: id,
    src: src,
    count: count,
  };
  let serObj = JSON.stringify(obj);
  localStorage.setItem(id, serObj);
}

function createCartProduct(id, src, count) {
  const cartProducts = document.querySelector(".cart__products");

  let cartProduct = document.createElement("div");
  cartProduct.className = "cart__product";
  cartProduct.id = id;

  let cartProductImage = document.createElement("img");
  cartProductImage.className = "cart__product-image";
  cartProductImage.src = src;

  let cartProductCount = document.createElement("div");
  cartProductCount.className = "cart__product-count";
  cartProductCount.innerText = count;

  let cartProductRemove = document.createElement("div");
  cartProductRemove.className = "cart__product-remove";
  cartProductRemove.innerHTML = "×";

  cartProduct.append(cartProductImage, cartProductCount, cartProductRemove);
  cartProducts.append(cartProduct);

  handlerRemoveCartProduct(cartProduct);
}

function changeProduct(product, count) {
  const value = product.querySelector(".cart__product-count");
  count = Number(value.textContent) + count;
  value.innerText = count;
  return count;
}

function handlerRemoveCartProduct(cartProduct) {
  cartProduct.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart__product-remove")) {
      cartProduct.remove();
      checkCartProduct();
      localStorage.removeItem(cartProduct.id);
    }
  });
}

function checkCartProduct() {
  const cart = document.querySelector(".cart");
  if (document.querySelector(".cart__product")) {
    cart.style.display = "block";
  } else {
    cart.style.display = "none";
  }
}

function flytoCart(product, cartProduct) {
  const cart = cartProduct.querySelector(".cart__product-image");
  const productImage = product.querySelector(".product__image");

  let productImagePos = productImage.getBoundingClientRect();
  let cartPos = cart.getBoundingClientRect();

  let productImageClone = productImage.cloneNode();

  productImageClone.style.position = "fixed";
  productImageClone.style.left = productImagePos.left + "px";
  productImageClone.style.top = productImagePos.top + "px";
  productImageClone.style.border = "none";
  productImageClone.style.zIndex = 32767;

  let startX = productImagePos.left + 0.5 * productImagePos.width;
  let startY = productImagePos.top + 0.5 * productImagePos.height;

  let deltaX = cartPos.left + 0.5 * cartPos.width - startX;
  let deltaY = cartPos.top + 0.5 * cartPos.height - startY;

  document.body.appendChild(productImageClone);
  void productImageClone.offsetWidth;
  productImageClone.style.transform = "translateX(" + deltaX + "px)";
  productImageClone.style.transform += "translateY(" + deltaY + "px)";
  productImageClone.style.transition = "1s";

  setTimeout(() => document.body.removeChild(productImageClone), 960);
}

function checkStorage() {
  const cart = document.querySelector(".cart");
  const items = { ...localStorage };
  for (const key in items) {
    let retObj = JSON.parse(localStorage.getItem(key));
    createCartProduct(retObj.id, retObj.src, retObj.count);
    cart.style.display = "block";
  }
}
