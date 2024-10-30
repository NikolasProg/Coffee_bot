window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        // Добавляем класс для полупрозрачности при прокрутке
        header.classList.add('scrolled');
    } else {
        // Убираем класс, если мы находимся в верхней части страницы
        header.classList.remove('scrolled');
    }
});
