// Получаем элемент, в который будут добавляться карточки товаров для категории кофе
let coffeeList = document.querySelector('.coffee-list');

// Массив с данными о продуктах для категории кофе
let productsCoffee = [
    {
        id: 'c001',
        name: 'Эсперссо',
        image: '1.png',
        prices: {
            250: 10,
        },
		description: 'Эспрессо — это вдохновение в каждом глотке! ☕✨ Почувствуйте мощь и насыщенность этого короткого напитка, который пробуждает вас своим насыщенным ароматом и богатым вкусом. Освежите свой день с чашечкой настоящего итальянского эспрессо. ☕🇮🇹 #КофейноеНаслаждение',
    },
    {
        id: 'c002',
        name: 'Амерекано',
        image: '2.png',
        prices: {
            250: 110,
            350: 140,
        },
		description: 'Американо — свежесть и легкость в каждом глотке! ☕🌞 Нежный эспрессо, разбавленный горячей водой, создаёт удивительно мягкий напиток с насыщенным ароматом и деликатным вкусом. Откройте для себя лёгкость кофейного наслаждения в каждой чашке американо. ☕🌿 #КофейнаяГармония',
    },
    {
        id: 'c003',
        name: 'Капучино',
        image: '3.png',
        prices: {
            250: 140,
            350: 170,
            400: 200,
        },
		description: 'Капучино — это искусство кофейного уюта! ☕🎨 Слои нежного эспрессо, густой молочной пены и легкой порции воздушной пенки образуют чарующий вкус и аромат. Погрузитесь в мир тепла и наслаждения с каждым глотком капучино. ☕🌟 #КофейнаяИзысканность',
    },
    {
        id: 'c004',
        name: 'Латте',
        image: '4.png',
        prices: {
            350: 170,
            400: 200,
        },
		description: 'Латте — это настоящее искусство гармонии в каждой чашке! ☕🌈 Отличается бархатистой текстурой молока, окутывающей нежный эспрессо. Погрузитесь в волшебный мир мягкости и насыщенности, наслаждаясь утонченным вкусом латте. Превратите свой кофейный момент в настоящее удовольствие. ☕💖 #КофейноеНаслаждение',
    },
    {
        id: 'c005',
        name: 'Раф',
        image: '5.png',
        prices: {
            350: 180,
            400: 200,
        },
		description: 'Раф — это бархатное наслаждение в каждом глотке! ☕🍰 Это сочетание нежного эспрессо, теплого молока и богатого ванильного сиропа. Погрузитесь в атмосферу нежности и утонченности с этим восхитительным кофейным напитком. Освежите свой вкусовой опыт с рафом — деликатным угощением для вашего вкуса. ☕✨ #КофейнаяНежность',
    },
    {
        id: 'c006',
        name: 'Раф халва',
        image: '6.png',
        prices: {
            350: 180,
            400: 200,
        },
		description: 'Раф Халва — это пленительное соединение нежного эспрессо, теплого молока и насыщенной сладости халвы. Наслаждайтесь уникальным вкусом, где традиционные восточные ноты встречаются с ароматом свежеиспеченного кофе. Погрузитесь в волшебный мир вкусов и наслаждения с этим удивительным кофейным напитком. ☕🌰✨ #КофейнаяИзысканность',
    },
    {
        id: 'c007',
        name: 'Флет уайт',
        image: '7.png',
        prices: {
            250: 160,
            350: 190,
        },
		description: 'Флет Уайт — это легкость и изысканность в каждой чашке! ☕🍼 Эспрессо, облегченное горячим молоком и нежной пеной, создает напиток с бархатистой текстурой и приятным вкусом. Погрузитесь в чувственный опыт кофейной гармонии с Флет Уайт. ☕🌟 #КофейнаяЛегкость',
    },
    {
        id: 'c008',
        name: 'Моккачино',
        image: '8.png',
        prices: {
            350: 170,
            400: 200,
        },
		description: 'Моккачино — это сочетание страстного эспрессо, гладкого шоколада и воздушной пены молока! ☕🍫 Наслаждайтесь утонченным вкусом кофе и нежностью шоколадного аромата в каждом глотке. Погрузитесь в мир неповторимого наслаждения с этим изысканным напитком. ☕✨ #КофейнаяСтрасть',
    },
    {
        id: 'c009',
        name: 'Глясе',
        image: '9.png',
        prices: {
            350: 200,
            400: 230,
        },
		description: 'Глясе — это тонкий шарм и насыщенный вкус в каждой ложке! 🍧✨ Сладкий десерт с яркими оттенками, охваченный изысканной глазурью, раскроет перед вами настоящий вкусовой праздник. Погрузитесь в мир сладких наслаждений с этим изысканным десертом Глясе. 🍰🌈 #ДесертнаяРоскошь',
    }
];

// Для каждого продукта из массива productsCoffee создаем карточку товара
productsCoffee.forEach((product) => {
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
        <img src="image/coffee/${product.image}" data-description="${product.description}" class="picture"> <!-- Путь к изображению -->
        <div class="title">${product.name}</div> <!-- Название продукта -->
        <div class="price" id="price_${product.id}">${getFormattedPrice(minPrice)}</div> <!-- Цена для минимального объема -->
        
        <!-- Выпадающий список для выбора объема -->
        <select id="user_obym_${product.id}" onchange="updatePrice('${product.id}')">
            ${volumes.map(volume => `<option value="${volume}">${volume} мл</option>`).join('')}
        </select>

        <!-- Кнопка для добавления товара в корзину -->
        <button class="extra-btn" onclick="butt('${product.id}')">Добавки</button>
        <button class="dobavit" onclick="addToCard('${product.id}')">В корзину</button>`;
    
    // Добавляем сформированную карточку товара в coffeeList
    coffeeList.appendChild(newDiv);
});
