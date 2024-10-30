// Функция для работы бургер-меню
document.querySelector('.burger').addEventListener('click', function() {
    // Переключаем класс 'active' на иконке бургер-меню при клике
    this.classList.toggle('active');
    // Открываем или закрываем меню, переключая класс 'open' на элементе навигации
    document.querySelector('.nav').classList.toggle('open');
});

// Функция для форматирования цены
function getFormattedPrice(price) {
    // Если цена указана, форматируем ее, добавляем символ 'р' в конце
    // Если объема нет, возвращаем соответствующее сообщение
    return price !== 'такого объёма нет' ? String(price).replace(/р$/, '') + 'р' : 'такого объёма нет';
}

function updatePrice(productId) {
    const selectedVolume = document.getElementById(`user_obym_${productId}`).value;
    let priceElement = document.getElementById(`price_${productId}`);
    let product;

    // Проверка категории продукта
    if (productId.startsWith('t')) {
        product = productsTea.find(p => p.id === productId);
    } else if (productId.startsWith('n')) {
        product = productsNecoffee.find(p => p.id === productId);
    } else if (productId.startsWith('a')) {
        product = productsAvtorskoe.find(p => p.id === productId);
    } else if (productId.startsWith('k')) {
        product = productsCocktails.find(p => p.id === productId);
    } else {
        product = productsCoffee.find(p => p.id === productId);
    }

    // Обновляем цену, если продукт найден
    if (product) {
        const newPrice = product.prices[selectedVolume];
        priceElement.innerText = newPrice !== undefined ? `${newPrice}р` : 'такого объёма нет';
    }
}


document.addEventListener('DOMContentLoaded', function () {
    let items = document.querySelectorAll('.item');
    let modal = document.getElementById('modal');
    let modalDescription = document.getElementById('modal-description');
    let closeBtn = document.querySelector('.close');

    items.forEach(function (item) {
        let img = item.querySelector('img');

        img.addEventListener('click', function () {
            let description = img.getAttribute('data-description');
            modalDescription.textContent = description; // Устанавливаем текст описания
            modal.style.display = "block"; // Показываем модальное окно
        });
    });

    // Закрытие модального окна
    closeBtn.onclick = function () {
        modal.style.display = "none";
    }

    // Закрытие модального окна при клике вне его
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

// Функция для анимации добавления товара в корзину
function addToCartAnimation(productKey) {
    // Находим элемент товара по его data-атрибуту
    const item = document.querySelector(`.item[data-key="${productKey}"]`);
    const img = item.querySelector('img'); // Находим изображение товара
    const clone = img.cloneNode(true); // Клонируем изображение

    // Устанавливаем стили для клонированного изображения, чтобы оно выглядело как оригинал
    clone.style.opacity = '0.8';
    clone.style.position = 'absolute';
    clone.style.height = '150px';
    clone.style.width = '150px';
    clone.style.objectFit = 'cover';
    clone.style.zIndex = '100';
    clone.style.transition = 'all 1s ease-in-out';
    clone.style.top = `${img.offsetTop}px`;
    clone.style.left = `${img.offsetLeft}px`;

    // Добавляем клонированное изображение в документ
    document.body.appendChild(clone);

    // Находим элемент корзины и его координаты на странице
    const shoppingCart = document.querySelector('.shopping');
    const cartRect = shoppingCart.getBoundingClientRect();

    // Задаем конечные координаты для клонированного изображения (перемещение к корзине)
    clone.style.top = `${cartRect.top + 5}px`;
    clone.style.left = `${cartRect.left + 5}px`;
    clone.style.width = '75px';
    clone.style.height = '75px';

    // Удаляем клонированное изображение после завершения анимации
    clone.addEventListener('transitionend', () => {
        document.body.removeChild(clone);
    });
}
