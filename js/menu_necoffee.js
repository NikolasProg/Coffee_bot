// Получаем элемент, в который будут добавляться карточки товаров для категории чая
let necoffeeList = document.querySelector('.necoffee-list');

// Массив с данными о продуктах для категории не кофе
let productsNecoffee = [
    {
        id: 'n001',
        name: 'Глинтвейн',
        image: '1n.png',
        prices: {
            350: 80,
        },
		description: 'Глинтвейн — согревающий ароматный напиток, созданный для уютных вечеров! 🍷✨ Насладитесь богатством пряностей, фруктов и согревающего вина, которые перенесут вас в атмосферу зимней сказки. Идеален для неспешного отдыха и душевных бесед. 🌲🍊 #ЗимнийКоктейль',
    },
    {
        id: 'n002',
        name: 'Матча',
        image: '2n.png',
        prices: {
            350: 80,
            400: 100,
        },
		description: 'Матча — энергия природы в каждой чашке! 🍵💚 Этот зелёный чай из Японии подарит вам бодрость, мягкий травяной вкус и лёгкий аромат. Ощутите связь с природой и гармонию в каждом глотке! #ЧайноеВдохновение',
    }, 
    {
        id: 'n003',
        name: 'Какао',
        image: '3n.png',
        prices: {
            350: 160,
        },
		description: 'Какао — возвращение в детство с насыщенным вкусом шоколада! 🍫🥛 Почувствуйте уют и тепло, которые дарит каждая чашка этого напитка, пробуждая приятные воспоминания и создавая настроение. #ШоколадноеСчастье',
    },
    {
        id: 'n004',
        name: 'Горячий шоколад',
        image: '4n.png',
        prices: {
            350: 160,
        },
		description: 'Горячий шоколад — истинное наслаждение для ценителей шоколада! 🍫☕ Бархатистый, насыщенный и согревающий, этот напиток словно создан, чтобы добавить сладости в холодный день. Окунитесь в его тёплые объятия и забудьте о заботах. #ШоколаднаяРадость',
    }
];

// Для каждого продукта из массива productsNecoffee создаем карточку товара
productsNecoffee.forEach((product) => {
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
        <img src="image/necoffee/${product.image}" data-description="${product.description}" class="picture"> <!-- Путь к изображению -->
        <div class="title">${product.name}</div> <!-- Название продукта -->
        <div class="price" id="price_${product.id}">${getFormattedPrice(minPrice)}</div> <!-- Цена для минимального объема -->
        
        <!-- Выпадающий список для выбора объема -->
        <select id="user_obym_${product.id}" onchange="updatePrice('${product.id}')">
            ${volumes.map(volume => `<option value="${volume}">${volume} мл</option>`).join('')}
        </select>

        <!-- Кнопка для добавления товара в корзину -->
        <button class="dobavit" onclick="addToCard('${product.id}')">В корзину</button>`;
    
    // Добавляем сформированную карточку товара в necoffeeList
    necoffeeList.appendChild(newDiv);
});
