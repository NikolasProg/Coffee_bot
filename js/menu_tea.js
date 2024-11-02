// Получаем элемент, в который будут добавляться карточки товаров для категории чая
let teaList = document.querySelector('.tea-list');

// Массив с данными о продуктах для категории кофе
let productsTea = [
    {
        id: 't001',
        name: 'Чёрный',
        image: '7t.png',
        prices: {
            350: 80,
            400: 100,
        },
		description: 'Чёрный чай — это классика в каждой чашке! ☕🌿 Отличается насыщенным вкусом, приятным ароматом и ярким характером. Погрузитесь в традиционное чаепитие и насладитесь умиротворением каждого глотка. Откройте для себя простоту и великолепие в каждой чашке чёрного чая. 🌟🍃 #ЧаепитиеКлассики',
    },
    {
        id: 't002',
        name: 'Зелёный',
        image: '8t.png',
        prices: {
            350: 80,
            400: 100,
        },
		description: 'Зелёный чай — это свежесть и вдохновение в каждом листочке! 🍵🌱 Отметьте момент умиротворения с этим насыщенным напитком, который приносит вам не только вкус, но и благополучие. Погрузитесь в мир зелёного чая, где каждый глоток — это встреча с природой. 💚🌿 #ЧаепитиеЗелени',
    },
    {
        id: 't003',
        name: 'Пуэр',
        image: '1t.png',
        prices: {
            350: 160,
            400: 180,
        },
		description: 'Пуэр – чай с характером! ☕✨ Погрузись в волшебный мир глубокого вкуса и аромата этого уникального напитка. 🍃💖 Приглашаем на чаепитие, где каждая чашка – это невероятное путешествие в мир наслаждения! 🌏🌟 #ЧайныеЧудеса',
    },
    {
        id: 't004',
        name: 'Облепиховый',
        image: '2t.png',
        prices: {
            350: 160,
            400: 180,
        },
		description: 'Облепиховое угощение – настоящий взрыв витаминов и яркости! 🧡✨ Погрузитесь в волшебство вкуса свежих облепиховых ягод, дарящих не только удовольствие, но и пользу вашему здоровью. 🌿🍇 Откройте для себя яркий вкус и аромат облепихи в каждом глотке! 🌞🌈 #ЯгоднаяРадость',
    },
    {
        id: 't005',
        name: 'Таёжный',
        image: '3t.png',
        prices: {
            350: 160,
            400: 180,
        },
		description: 'Таёжное вдохновение в каждом глотке! 🌲❄️ Откройте для себя богатство вкусов таёжных ягод и трав, слившееся в уникальном напитке. Погрузитесь в атмосферу дремучего леса и насладитесь моментом встречи с природой в каждой чашке. 🍵🌲✨ #ТаёжнаяГармония',
    },
    {
        id: 't006',
        name: 'Медовая габа',
        image: '4t.png',
        prices: {
            350: 160,
            400: 180,
        },
		description: 'Медовая гастрономия в каждой ложке! 🍯✨ Погрузитесь в нежный вкус меда, окутанный волшебством утонченных гастрономических нот. Позвольте себе насладиться уникальным опытом, где каждый момент – сладкое приключение. 🌼🥄 #МедовоеУдовольствие',
    },
    {
        id: 't007',
        name: 'Молочный улун',
        image: '5t.png',
        prices: {
            350: 160,
            400: 180,
        },
		description: 'Молочный улун - волшебный танец нежности и насыщенного вкуса! 🍵🥛 Откройте для себя уникальное сочетание молочной мягкости и неповторимых оттенков улун-чая. Погрузитесь в чувственное чаепитие, где каждый глоток — это путешествие в мир изысканного вкуса. 🌿🌟 #ЧайноеНаслаждение',
    },
    {
        id: 't008',
        name: 'Зелёный Жень-Шень',
        image: '6t.png',
        prices: {
            350: 160,
            400: 180,
        },
		description: 'Зелёный Жень-Шень - природная энергия в каждом листочке! 🍵🌿 Откройте для себя удивительный вкус зелёного чая, обогащённого благотворными свойствами женьшеня. Погрузитесь в ароматное путешествие, вдохновлённое природной силой и освежением. 🌱💚 #ЗарядЭнергии',
    }
];

// Для каждого продукта из массива productsTea создаем карточку товара
productsTea.forEach((product) => {
    // Создаем новый элемент div для карточки товара
    let newDiv = document.createElement('div');
    newDiv.classList.add('item'); // Добавляем класс 'item' для стилизации
    newDiv.setAttribute('data-key', product.id); // Устанавливаем data-атрибут с идентификатором продукта
    
    // Формируем HTML для карточки товара
    newDiv.innerHTML = `
        <img src="image/tea/${product.image}" data-description="${product.description}" class="picture"> <!-- Путь к изображению -->
        <div class="title">${product.name}</div> <!-- Название продукта -->
        <div class="price" id="price_${product.id}">${getFormattedPrice(product.prices[350])}</div> <!-- Цена для объема 350 мл -->
        
        <!-- Выпадающий список для выбора объема -->
        <select id="user_obym_${product.id}" onchange="updatePrice('${product.id}')">
            <option value="350">350 мл</option>
            <option value="400">400 мл</option>
        </select>

        <!-- Кнопка для добавления товара в корзину -->
        <button class="dobavit" onclick="addToCard('${product.id}')">В корзину</button>`;
    
    // Добавляем сформированную карточку товара в teaList
    teaList.appendChild(newDiv);
});
