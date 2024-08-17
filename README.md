# React + TypeScript + Vite

**### Запуск проекта**
npm run dev

**### Тестирование**
npm run test

**### Сборка проекта**
npm run build

**## Функционал веб-приложения**

1. Хедер

- Отображается логотип с описанием сервиса
- Если пользователь неавторизован отображается кнопка "Войти"
- Если пользователь авторизован отображаются элементы личного кабинета
- По клику на кнопку "Войти" открывается модальное окно с авторизацией
- По клику на элементы личного кабинета открывается окно с информацией о пользователе и кнопками "Профиль" и "Выйти"
- По клику на кнопку "Профиль" осуществляется переход в личный кабинет пользователя
- По клику на кнопку "Выйти" осуществляется разлогинивание пользователя

2. Главная страница

- Отображение всех доступных курсов для всех пользователей на главной странице
- До загрузки из БД всех курсов на странице отображается лоадер
- Подготовлена мобильная версия страницы

3. Карточка курса

- Если пользователь неавторизован, по клику на иконку плюсика открывается модальное окно авторизации
- Если пользователь авторизован и соотвтетствующий курс не приобретен пользователем, отображается иконка плюсика
- Если пользователь авторизован, по клику на иконку плюсика осуществляется добавление курса к пользователю в приобретенные
- Если пользователь авторизован и соотвтетствующий курс приобретен пользователем, отображается иконка минуса
- Если пользователь авторизован, по клику на иконку минуса осуществляется удаление курса у пользователю из приобретенных
- При каждом взаимодействии с курсами, объекты курсов добавляются / удаляются из контекста приложения
- В личном кабинете у карточки курса отображаются дополнительные элементы: прогресс и кнопка "Начать тренировку" / "Продолжить троенировки"
- Прогресс курса формируется в зависимости от доли завершенных тренировок
- Если ни одна тренировка курса не завершена, то в карточке курса отображается кнопка "Начать тренировку"
- Если хотя бы одна тренировка курса завершена, то в карточке курса отображается кнопка "Продолжить"
- По клику на кнопки "Начать тренировку" / "Продолжить" открывается модальное окно с выбором тренировки курса
- По клику на любую область карточки курса кроме кнопок "Начать тренировку" / "Продолжить" и иконку минуса осуществляется переход на страницу курса
- В карточке курса отображается количество дней курса на основе количества тренировок в курсе
- Если курс добавить в приобретенные, карточка курса отобразится в личном кабинете пользователя без перезагрузки страницы
- Если курс удалить из приобретенных, карточка курса исчезнет в личном кабинете пользователя без перезагрузки страницы
- До загрузки из БД картинки курса в карточке курса вместо картинки отображается лоадер
- Подготовлена мобильная версия карточки курса

4. Страница курса

- Страница курса с подробной информацией о курсе
- На странице курса отображается кнопка, которая меняет свое состояние в зависимости от авторизации и наличия курса в приобретенных у пользователя
- Если пользователь не авторизован, отображается кнопка "Войдите, чтобы добавить курс"
- Если пользователь авторизован, курс не добавлен в приобретенные, отображается кнопка "Добавить курс"
- Если пользователь авторизован, курс добавлен в приобретенные, отображается кнопка "Удалить курс"
- По клику на кнопку "Войдите, чтобы добавить курс" открывается модальное окно авторизации
- По клику на кнопку "Добавить курс" курс добавляется в приобретенные к пользователю и осуществляется редирект в личный кабинет
- По клику на кнопку "Удалить курс" курс удаляется из приобретенных у пользователя
- Редирект со страницы курса на главную, если введен ID несуществующего курса
- До загрузки из БД информации по курсу на странице отображается лоадер
- Подготовления мобильная версия страницы курса

5. Страница личного кабинета (Профиль)

- На странице профиля отображается информация о пользователе: имя, e-mail
- На странице профиля отображаются кнопки "Изменить пароль" и "Выйти"
- По клику на кнопку "Изменить пароль" открывается модальное окно с изменением пароля
- По клику на кнопку "Выйти" осуществляется разлогинивание пользователя и редирект на главную страницу
- На странице профиля отображаются приобретенные пользователем карточки курсов с дополнительными ээлементами, которые описаны в п.3
- Если у пользователя нет ни одного приобретенного курса, отображается соответствующая информация
- До загрузки из БД информации по курсам на странице отображается лоадер
- Подготовлена мобильная версия страницы профиля

6. Страница тренировки

- На странице отображается информация по тренировке: название курса, название тренировки, видео тренировки и список упражнений, если таковые есть в тренировке
- Если в тренировке нет упражнений, вместо блока с упражнениями выводится соответствующая информация
- По упражнениям отображается прогресс, который рассчитывается на основе введенных пользователем информации
- Тренировка считается выполненной, если в ней выполнены все упражнения на 100%
- Прогресс упражнений рассчитывается на основе введенных пользователем данных
- Если в тренировке нет прогресса ни по одному упражнению, отображается кнопка "Заполнить свой прогресс"
- Если в тренировке есть прогресс хотя бы по одному упражнению, отображается кнопка "Обновить свой прогресс"
- Редирект со страницы тренировки на главную, если введен ID несуществующего курса и/или ID несуществущей тренировки
- Подготовлена мобильная версия страницы тренировки

7. Модальное окно авторизации

- Модальное окно содержит текстовые поля "Логин", "Пароль" и кнопки "Войти", "Зарегистрироваться"
- По клику на кнопку "Войти" осуществляется валидация введенных данных в текстовые поля
- Если валидации пройдены, осуществляется авторизация пользователя и закрытие модального окна
- Реализованы подсказки для пользователя, если валидация не пройдена
- По клику на кнопку "Зарегистрироваться" открывается модальное окно регистрации
- Реализована защита на ввод в текстовые поля нежелательных данных
- Если пароль введен неправильно предлагается сменить пароль выводом соответствующей ссылкой
- По клику на ссылку "Восстановить пароль" открыватеся модальное окно восстановления пароля
- По клику на область вне модального окна, модальное окно закрывается
- Блокировка скролла по вертикали, если открыто модальное окно
- Подготовлена мобильная версия модального окна

8. Модальное окно регистрации

- Модальное окно содержит текстовые поля "Имя", "Логин", "Пароль", "Повторите пароль" и кнопки "Войти", "Зарегистрироваться"
- По клику на кнопку "Войти" открывается модальное окно авторизации
- Реализованы подсказки для пользователя, если валидация не пройдена
- По клику на кнопку "Зарегистрироваться" осуществляется валидация введенных данных в текстовые поля
- Если валидации пройдены, осуществляется регистрация пользователя и открывается модальное окно авторизации
- Реализована защита на ввод в текстовые поля нежелательных данных
- По клику на область вне модального окна, модальное окно закрывается
- Блокировка скролла по вертикали, если открыто модальное окно
- Подготовлена мобильная версия модального окна

9. Модальное окно восстановления пароля

- Модальное окно содержит информацию, что ссылка для восстановления пароля отправлена на почту введенную пользователем
- По клику на область вне модального окна, модальное окно закрывается
- Блокировка скролла по вертикали, если открыто модальное окно
- Подготовлена мобильная версия модального окна

10. Модальное окно изменения пароля

- Модальное окно содержит текстовые поля "Пароль", "Повторите пароль" и кнопку "Подтвердить"
- Реализованы подсказки для пользователя, если валидация не пройдена
- По клику на кнопку "Подтвердить" осуществляется валидация введенных данных в текстовые поля
- Если валидации пройдены, осуществляется изменение пароля и модальное окно закрывается
- Реализована защита на ввод в текстовые поля нежелательных данных
- По клику на область вне модального окна, модальное окно закрывается
- Блокировка скролла по вертикали, если открыто модальное окно
- Подготовлена мобильная версия модального окна

11. Модальное окно выбора тренировки

- Модальное окно содержит список тренировок курса
- Если тренировка выполнена, отображается соответствующая по смыслу иконка галочки
- По клику на тренировку осуществляется открытие страницы данной тренировки
- По клику на область вне модального окна, модальное окно закрывается
- Блокировка скролла по вертикали, если открыто модальное окно
- Подготовлена мобильная версия модального окна

12. Модальное окно заполнения прогресса упражнений

- Модальное окно содержит список упражнений с соответствующим текстовыми полями для ввода прогресса упражнений и кнопку "Сохранить"
- По клику на кнопку "Сохранить" осуществляется учет прогресса упражнений и треинровки, а также открывается саксес-экран с подтверждением, что прогресс зачтен
- По клику на область вне модального окна, модальное окно закрывается
- Блокировка скролла по вертикали, если открыто модальное окно
- Подготовлена мобильная версия модального окна

12. Модальное окно учета прогресса тренировки

- По клику на область вне модального окна, модальное окно закрывается
- Блокировка скролла по вертикали, если открыто модальное окно
- Подготовлена мобильная версия модального окна

14. Дополнительный функционал

- При авторизации пользователь добавляется в контекст приложения
- Данные пользователя хранятся в cookies и добавляются в контекст при перезагрузке страницы

**## Разработчики**

- **Регина** - [GitHub](https://github.com/ReginaZaets)
- **Юлия** - [GitHub](https://github.com/amjulia)
- **Екатерина** - [GitHub](https://github.com/Kekyra228)
- **Андрей** - [GitHub](https://github.com/Andrey-Bakin)
- **Рамал** - [GitHub](https://github.com/rambak02)
- **Павел** - [GitHub](https://github.com/productPach)
