// Получаем элементы управления корзиной и элементы для отображения содержимого корзины
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let listCards = {}; // Хранилище товаров в корзине

// Открытие корзины
openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

// Закрытие корзины
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

// Функция для добавления товара в корзину
function addToCart(key) {
    const selectedVolume = document.getElementById(`user_obym_${key}`).value;

    const isTea = key.startsWith('t');
    const isNcoffee = key.startsWith('n');
    const isAvtorskoe = key.startsWith('a');
    const isCocktail = key.startsWith('k'); // Проверка на коктейли
    const products = isTea
        ? productsTea
        : isNcoffee
        ? productsNecoffee
        : isAvtorskoe
        ? productsAvtorskoe
        : isCocktail
        ? productsCocktails
        : productsCoffee; // Выбор массива продуктов

    const product = products.find((p) => p.id === key);

    // Получаем данные о добавках из скрытых полей и проверяем на числовые значения
    let selectedSyrups = document.getElementById('hiddenSyrups').value || 'Не выбрано';
    let selectedToppings = document.getElementById('hiddenToppings').value || 'Не выбрано';
    let sugarAmount = document.getElementById('hiddenSugar').value || 'без сахара';
    let selectedMilk = document.getElementById('hiddenMilk').value || 'без молока';
    let extraCost = parseFloat(document.getElementById('hiddenTotalExtraCost').value) || 0;

    if (product && !isNaN(product.prices[selectedVolume])) {
        const productKey = `${key}_${selectedVolume}_${selectedSyrups}_${selectedToppings}_${sugarAmount}_${selectedMilk}`;

        // Проверка базовой цены и преобразование в число
        let baseProductPrice = parseFloat(product.prices[selectedVolume]) || 0;
        let totalProductPrice = baseProductPrice + extraCost;

        if (!listCards[productKey]) {
            listCards[productKey] = {
                ...product,
                quantity: 1,
                selectedVolume: selectedVolume,
                basePrice: baseProductPrice,
                extraCost: extraCost,
                price: totalProductPrice,
                syrups: selectedSyrups.split(', '),
                toppings: selectedToppings.split(', '),
                sugar: sugarAmount,
                milk: selectedMilk
            };
        } else {
            listCards[productKey].quantity++;
            listCards[productKey].price = (baseProductPrice + extraCost) * listCards[productKey].quantity;
        }

        reloadCard();

        // Сброс скрытых полей после добавления товара
        document.getElementById('hiddenSyrups').value = '';
        document.getElementById('hiddenToppings').value = '';
        document.getElementById('hiddenSugar').value = '';
        document.getElementById('hiddenMilk').value = '';
        document.getElementById('hiddenTotalExtraCost').value = '';
    } else {
        alert('Такого объёма нет. Выберите другой объем.');
    }

    updateShoppingText();
    resetHiddenFields(); // Сброс скрытых полей после добавления товара
}

// Функция, выполняющаяся после загрузки страницы
document.addEventListener('DOMContentLoaded', function () {
    // Получаем все элементы товаров
    let items = document.querySelectorAll('.item');

    // Для каждого товара добавляем обработчики событий на кнопки "Добавить в корзину"
    items.forEach(function (item) {
        let productKey = item.getAttribute('data-key'); // Получаем идентификатор товара

        // Находим кнопку "Добавить в корзину" и добавляем обработчик для добавления товара в корзину
        let addButton = item.querySelector('.dobavit');
        addButton.addEventListener('click', function () {
            addToCartAnimation(productKey); // Вызов анимации добавления
            addToCart(productKey); // Добавление товара в корзину
        });
    });
});

// Функция для обновления отображения корзины
function reloadCard() {
    listCard.innerHTML = '';
    let totalPrice = 0;
    let count = 0;

    Object.keys(listCards).forEach((productKey) => {
        const value = listCards[productKey];
        const imagePath = value.id.startsWith('t')
            ? 'image/tea'
            : value.id.startsWith('n')
            ? 'image/necoffee'
            : value.id.startsWith('a')
            ? 'image/avtorskoe'
            : value.id.startsWith('k')
            ? 'image/cocktails'
            : 'image/coffee';

        let newDiv = document.createElement('li');
        newDiv.innerHTML = `
            <div class="item-details">
                <h2>${value.name}</h2>
                <div><img src="${imagePath}/${value.image}" class="picture"/></div>
                <div class="buttons">
                    <button onclick="changeQuantity('${productKey}', 'decrement')">-</button>
                    <div class="count" id="count_${productKey}">${value.quantity}</div>
                    <button onclick="changeQuantity('${productKey}', 'increment')">+</button>
                </div>
            </div>
            <div class="details">
                <div class="price-volume">
                    <span>Цена: ${value.price.toLocaleString()}р</span>
                    <span>Объём: ${value.selectedVolume} мл</span>
                </div>
                <div class="add-ons">
                    <span>Сахар: ${value.sugar}</span>
                    <span>Добавки: ${value.toppings.join(', ')}</span>
                    <span>Молоко: ${value.milk}</span>
                    <span>Сиропы: ${value.syrups.join(', ')}</span>
                </div>
            </div>`;
        listCard.appendChild(newDiv);

        totalPrice += value.price;
        count += value.quantity;
    });

    total.innerText = `${totalPrice.toLocaleString()}р`;
    quantity.innerText = count;
}

// Изменение количества товаров
function changeQuantity(productKey, action) {
    let currentQuantity = listCards[productKey].quantity;

    if (action === 'decrement') {
        if (currentQuantity > 1) {
            currentQuantity--;
        } else {
            delete listCards[productKey];
        }
    } else if (action === 'increment') {
        currentQuantity++;
    }

    if (listCards[productKey]) {
        listCards[productKey].quantity = currentQuantity;
        listCards[productKey].price = (listCards[productKey].basePrice + listCards[productKey].extraCost) * currentQuantity;
    }

    reloadCard();
    updateShoppingText();
}

// Обновление текста корзины
function updateShoppingText() {
    let totalQuantity = 0;
    let totalSum = 0;

    Object.keys(listCards).forEach((productKey) => {
        const value = listCards[productKey];
        totalQuantity += value.quantity;
        totalSum += value.price;
    });

    document.querySelector('.shopping p').innerText = totalQuantity > 0 ? `${totalSum.toLocaleString()}р` : 'Корзина';
}
