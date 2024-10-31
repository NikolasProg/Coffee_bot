// JavaScript для управления всплывающей формой
const overlay = document.getElementById('overlay');
const form = document.getElementById('form');
const totalDiv = document.querySelector('.total');

// Показать форму при клике на totalDiv
totalDiv.addEventListener('click', () => {
    body.classList.remove('active');
    overlay.style.display = 'block';
    form.style.display = 'block';
    setTimeout(() => {
        form.style.opacity = '1';
        form.style.pointerEvents = 'auto';
    }, 50);
});

// Скрыть форму при клике вне её области
overlay.addEventListener('click', (event) => {
    // Проверка, был ли клик за пределами формы
    if (!form.contains(event.target)) {
        form.style.opacity = '0';
        form.style.pointerEvents = 'none';
        setTimeout(() => {
            overlay.style.display = 'none';
            form.style.display = 'none';
        }, 300);
    }
});
