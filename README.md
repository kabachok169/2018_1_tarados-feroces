# Deadlines

## Ссылка

[Deadlines!](http://tf-sand-server.herokuapp.com)

## Описание

Deadlines - это игра, созданная по мотивам карты 101 rounds из популярной игры Warcraft. Управляя своим персонажем в пределах арены, уклоняйся от наплывающих со всех сторон и жаждущих тебя уничтожить врагов. Будь быстрым и внимательным. Объединяйся в команды с друзьями и придумывай стратегии победы. Оттачивай скилл и покажи, кто тут самый ловкий!

## Средства разработки

### Frontend

#### Router
В процессе разработки был написан класс [Router](https://goo.gl/k1wa3M), который предоставляет интерфейс для быстрого перехода по ссылкам на сайте.
```javascript
const router = new Router();
router.addUrl(
        '/login/',
        new LoginView()
    );
```

#### Template Manager
Для упрощения и оптимизации работы был использован шаблонизатор Handlebars, для которого был написан класс-обертка [TemplateManager](https://goo.gl/QSYNDJ).

##### Components
Компоненты - элементарные единицы структуры.
```javasctipt
const btn = new Header();
```
##### Views
Вьюшки - сущности, состоящие из компонент.
```javasctipt
const loginView = new LoginView();
loginView.__render();
```

#### Html Parser
Для работы с компонентами был разработан фреймворк, позволяющий создавать собственные html-теги, и затем вставлять их в шаблоны. В связи с этим появилось строгое разделение сущностей на два понятия - компоненты и вьюшки. Подразумевается, что вьюшки не могут содержать другие вьюшки, что, в будущем, будет дорабатываться.
Для удобного написания html страниц был создан парсер, позволяющий преобразовывать все в обычный html.
```javasctipt
const htmlParser = new HtmlParser();
const template = `<Header>{{login}}</Header>`;
const context = {login: 'FirstUser'};
htmlParser.getHTML(templateManager.getHTML(context, template)); //<div><h1>FirstUser</h1></div>
```

#### Http Module
Для работы с http-запросами был создан класс-обертка [HttpModule](https://goo.gl/iDx7Ne), при запросе возвращающий объект Promise, что позволяет хорошо наладить работу с асинхронными запросами.
```javasctipt
const httpModule = new HttpModule();
const context = {};
httpModule.doGet('/me').then(
                (response) => {
                    context = response;
                }
            );
```

#### Eslint
Для проверки кодстайла был использован Eslint, для которого были написаны два скрипта - eslint для проверки кодстайла, flint - для автоматического исправления доступных ошибок.
```
npm run eslint
```

#### Тестирование

Для проверки на локальной машине нужно перейти в папку с проектом и ввести команду 

  - node server/

#### Клиент
  - Javascript

#### Сервер
  - Node JS
  - Express
  
### Other
  - CI (Travis)
  
## Команда

### Frontend

  * [Тучин Даниил](https://github.com/Danchetto)
  * [Дмитриев Антон](https://github.com/kabachok169)

### Backend

  * [Кузнецов Александр](https://github.com/Alex-Kuz)
