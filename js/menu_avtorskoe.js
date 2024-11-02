// Получаем элемент, в который будут добавляться карточки товаров для категории авторских напитков
let avtorskoeList = document.querySelector('.avtorskoe-list');

// Массив с данными о продуктах для категории авторских напитков
let productsAvtorskoe = [
    {
        id: 'a001',
        name: 'Сырный раф',
        image: '1a.png',
        prices: {
            350: 80,
        },
		description: 'Сырный РАФ — необычное сочетание для гурманов! 🧀☕ Этот напиток удивит вас нежной сливочностью с лёгким оттенком сыра, превращая каждую чашку в маленький праздник. Попробуйте новое измерение вкуса! #СливочнаяФантазия',
    },
    {
        id: 'a002',
        name: 'Раф СКА',
        image: '2a.png',
        prices: {
            350: 80,
            400: 100,
        },
		description: 'РАФ солёный красный апельсин — взрыв вкусов с неожиданным акцентом! 🍊🌊 Этот раф объединяет сливочную мягкость и солоноватый вкус апельсина, создавая насыщенный и экзотический коктейль, который оставляет приятное послевкусие. #ЭкзотическийРАФ',
    },
    {
        id: 'a003',
        name: 'Раф Б-ИК',
        image: '3a.png',
        prices: {
            350: 160,
        },
		description: 'РАФ Баунти-Ирландский крем — вкус островов в вашей чашке! 🥥🇮🇪 Мягкий кокос и изысканный ирландский крем делают этот напиток роскошным и незабываемым. Идеален для особых моментов и наслаждения. #ТропическийРАФ',
    },
    {
        id: 'a004',
        name: 'Капучино САП',
        image: '4a.png',
        prices: {
            350: 160,
        },
		description: 'Капучино с солёной арахисовой пастой — нежный кофе с хрустящими ореховыми нотками! ☕🥜 Этот напиток соединяет в себе сливочную текстуру капучино с солёно-ореховым акцентом, добавляя новизны вашему кофейному ритуалу. #ОреховоеНаслаждение',
    }
];

// Для каждого продукта из массива productsAvtorskoe создаем карточку товара
productsAvtorskoe.forEach((product) => {
    // Создаем новый элемент div для карточки товара
    let newDiv = document.createElement('div');
    newDiv.classList.add('item'); // Добавляем класс 'item' для стилизации
    newDiv.setAttribute('data-key', product.id); // Устанавливаем data-атрибут с идентификатором продукта

    // Находим минимальный объем и соответствующую цену
    let volumes = Object.keys(product.prices).map(Number); // Получаем массив объемов
    let minVolume = Math.min(...volumes); // Находим минимальный объем
    let minPrice = product.prices[minVolume]; // Получаем цену для минимального объема

    // Формируем HTML для карточки товара
    newDiv.innerHTML = `
        <img src="image/avtorskoe/${product.image}" data-description="${product.description}" class="picture"> <!-- Путь к изображению -->
        <div class="title">${product.name}</div> <!-- Название продукта -->
        <div class="price" id="price_${product.id}">${getFormattedPrice(minPrice)}</div> <!-- Цена для минимального объема -->
        
        <!-- Выпадающий список для выбора объема -->
        <select id="user_obym_${product.id}" onchange="updatePrice('${product.id}')">
            ${volumes.map(volume => `<option value="${volume}">${volume} мл</option>`).join('')}
        </select>

        <!-- Кнопка для добавления товара в корзину -->
        <button class="dobavit" onclick="addToCard('${product.id}')">В корзину</button>`;
    
    // Добавляем сформированную карточку товара в avtorskoeList
    avtorskoeList.appendChild(newDiv);
});
