const ol = () => document.querySelector('.cart__items');

//* Requisito 3
function cartItemClickListener(e) {
  e.remove();
  localStorage.setItem('carrinho', ol().innerHTML);
  // Referencia <https://developer.mozilla.org/en-US/docs/Web/API/Element/remove>
}

//* Requisito 4
const recarregaCarrinho = () => {
  ol().innerHTML = localStorage.getItem('carrinho');
  ol().childNodes.forEach((el) => el.addEventListener('click', (e) =>
    cartItemClickListener(e.target)));
};

//* Requisito 2
// Cria lista do carrinho
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', (e) => cartItemClickListener(e.target));
  return li;
}
// Acessa a API pelo Id
const urlApiId = 'https://api.mercadolibre.com/items/';
async function fetchApiId(event) {
  return fetch(`${urlApiId}${event}`)
  .then((response) => response.json())
  .then((dados) => {
    ol().appendChild(createCartItemElement(dados)); // Adiciona no ol
    localStorage.setItem('carrinho', ol().innerHTML);
  });
}
// Obtem o Id | Adiciona evento no botao, e retorna o id depois de clicado.
const eventoBotaoReturnId = () => document.querySelectorAll('.item__add').forEach((button) => button
  .addEventListener('click', (e) => 
  fetchApiId(e.target.parentElement.firstChild.innerText)));

//* Requisito 1
// Funcao que cria img
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}
// Funcao que cria Elementos no html
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
// Cria section e adiciona class
function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
}
// Acessa a API de busca.
const urlApiBusca = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const fecthPromiseBusca = async (query) => fetch(`${urlApiBusca}${query}`)
  .then((response) => response.json()
  .then((dados) => dados.results.forEach((ele) =>
    document.querySelector('.items').appendChild(createProductItemElement(ele)))))
  .then(() => eventoBotaoReturnId());

// Ao iniciar
window.onload = () => {
  fecthPromiseBusca('computador');
  recarregaCarrinho();
};
