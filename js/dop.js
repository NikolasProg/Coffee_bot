let currentProductKey = null; // Глобальная переменная для хранения ключа товара
const sugarRange = document.getElementById('sugarRange');

function updateSliderBackground() {
    const value = ((sugarRange.value - sugarRange.min) / (sugarRange.max - sugarRange.min)) * 100;
    sugarRange.style.setProperty('--val', value + '%');
}

sugarRange.addEventListener('input', updateSliderBackground);
updateSliderBackground(); // Инициализация

// Функция для отображения контейнера с добавками и сохранения ключа товара
function butt(key) {
    currentProductKey = key; // Сохраняем ключ товара
    console.log("Текущий ключ товара:", currentProductKey); // Проверка ключа товара
    const container = document.querySelector('.container2'); // Контейнер с дополнительными опциями
    
    // Показать или скрыть контейнер
    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}

document.getElementById('sugarRange').addEventListener('input', function () {
    let sugarAmount = document.getElementById('sugarRange').value;
    document.getElementById('sugarAmount').innerText = sugarAmount + ' ложек';
});

document.addEventListener('DOMContentLoaded', function () {
    // Обработчик события на кнопку "Ok"
    document.getElementById('submitBtn').addEventListener('click', function () {
        console.log("Кнопка 'Ok' нажата");

        // Получаем все выбранные сиропы
        let selectedSyrups = Array.from(document.querySelectorAll('input[name="syrup"]:checked')).map(cb => cb.value);

        // Получаем все выбранные добавки
        let selectedToppings = Array.from(document.querySelectorAll('input[name="topping"]:checked')).map(cb => cb.value);

        // Получаем количество сахара
        let sugarAmount = document.getElementById('sugarRange').value;

        // Получаем выбранное молоко
        let selectedMilk = document.getElementById('milkSelect').value;

        // Рассчитываем общую стоимость добавок
        let totalExtraCost = calculateAddOnsCost(selectedMilk, selectedSyrups, selectedToppings);

        // Формируем текст результата и сохраняем в скрытые поля
        document.getElementById('hiddenSyrups').value = selectedSyrups.join(', ') || 'без сиропов';
        document.getElementById('hiddenToppings').value = selectedToppings.join(', ') || 'без добавок';
        document.getElementById('hiddenSugar').value = `${sugarAmount} ложки сахара`;
        document.getElementById('hiddenMilk').value = selectedMilk;
        document.getElementById('hiddenTotalExtraCost').value = totalExtraCost;

        // Выводим результат и скрываем блок с результатом
        let resultContainer = document.getElementById('result');
        resultContainer.innerText = `
            Сиропы: ${selectedSyrups.join(', ') || 'без сиропов'}; 
            Добавки: ${selectedToppings.join(', ') || 'без добавок'}; 
            ${sugarAmount} ложки сахара; 
            Молоко: ${selectedMilk}; 
            Итоговая сумма добавок: ${totalExtraCost}р.
        `;
        resultContainer.style.display = 'none'; // Скрываем результат

        // Закрываем контейнер
        document.querySelector('.container2').style.display = 'none';

        // Проверяем, что ключ товара сохранён и добавляем товар в корзину
        if (currentProductKey !== null) {
            console.log("Добавление товара в корзину с ключом:", currentProductKey); // Проверка перед добавлением
            addToCart(currentProductKey); // Вызываем функцию добавления в корзину
        } else {
            console.error("Ключ товара не найден.");
        }

        // Сбрасываем форму
        resetForm();
    });

    // Функция для расчета стоимости добавок
    function calculateAddOnsCost(selectedMilk, selectedSyrups, selectedToppings) {
        let totalExtraCost = 0;

        if (selectedMilk !== 'Не выбрано') {
            totalExtraCost += parseInt(selectedMilk.match(/\+(\d+)р/)[1]);
        }

        totalExtraCost += selectedSyrups.length * 40;
        totalExtraCost += selectedToppings.length * 30;

        return totalExtraCost;
    }

    // Функция для сброса всех данных формы
    function resetForm() {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
        document.getElementById('sugarRange').value = 0;
        document.getElementById('sugarAmount').innerText = '0 ложки';
        document.getElementById('milkSelect').value = 'Не выбрано';
    }
});

// Функция для сброса скрытых полей
function resetHiddenFields() {
    document.getElementById('hiddenSyrups').value = '';
    document.getElementById('hiddenToppings').value = '';
    document.getElementById('hiddenSugar').value = '';
    document.getElementById('hiddenMilk').value = '';
    document.getElementById('hiddenTotalExtraCost').value = '';
}
