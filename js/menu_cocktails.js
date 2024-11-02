// Получаем элемент, в который будут добавляться карточки товаров для категории коктейлей
let cocktailsList = document.querySelector('.cocktails-list');

// Массив с данными о продуктах для категории не кофе
let productsCocktails = [
    {
        id: 'k001',
        name: 'Коктейль',
        image: '1k.png',
        prices: {
            350: 80,
			400: 100,
        },
		description: 'Молочный коктейль — всплеск свежести и вкуса в каждом глотке! 🥤🍦 Лёгкий, воздушный и нежный, он перенесёт вас в солнечные дни, добавив сладости и позитива. Наслаждайтесь густой текстурой и разнообразием вкусов! #ОсвежающийМикс',
    }
];

// Для каждого продукта из массива productsCocktails создаем карточку товара
productsCocktails.forEach((product) => {
    // Создаем новый элемент div для карточки товара
    let newDiv = document.createElement('div');
    newDiv.classList.add('item'); // Добавляем класс 'item' для стилизации
    newDiv.setAttribute('data-key', product.id); // Устанавливаем data-атрибут с идентификатором продукта
    
    // Формируем HTML для карточки товара
    newDiv.innerHTML = `
        <img src="image/cocktails/${product.image}" data-description="${product.description}" class="picture"> <!-- Путь к изображению -->
        <div class="title">${product.name}</div> <!-- Название продукта -->
        <div class="price" id="price_${product.id}">${getFormattedPrice(product.prices[350])}</div> <!-- Цена для объема 350 мл -->
        
        <!-- Выпадающий список для выбора объема -->
        <select id="user_obym_${product.id}" onchange="updatePrice('${product.id}')">
            <option value="350">350 мл</option>
            <option value="400">400 мл</option>
        </select>

        <!-- Кнопка для добавления товара в корзину -->
		<button class="extra-btn" onclick="butt('${product.id}')">Добавки</button>
        <button class="dobavit" onclick="addToCard('${product.id}')">В корзину</button>`;
    
    // Добавляем сформированную карточку товара в cocktailsList
    cocktailsList.appendChild(newDiv);
});
