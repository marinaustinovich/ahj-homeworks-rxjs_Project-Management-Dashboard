[![Build status](https://ci.appveyor.com/api/projects/status/nawx7n510shyhduy/branch/main?svg=true)](https://ci.appveyor.com/project/marinaustinovich/ahj-homeworks-rxjs-project-management-dashboard/branch/main)

deployment: https://marinaustinovich.github.io/ahj-homeworks-rxjs_Project-Management-Dashboard/

## Project Management Dashboard

### Легенда

Вы делаете рабочее место менеджера проектов, который может отслеживать как задачи по конкретному проекту, так и общую статистику по проектам.

В вашу задачу входит реализация двух виджетов:
1. Виджет статистики открытых задач по каждому проекту.
1. Виджет просмотра задач.

### Описание

Реализуйте на базе State Management общее состояние приложения, где задачи хранятся в стейт-менеджере, а виджеты получают `Store` через конструктор, подписываясь на состояние.

Как это должно выглядеть:

![](./src/img/dashboard.png)

Для выбора проекта:

![](./src/img/dashboard-2.png)

Все данные храните в памяти, серверная часть не нужна. Для хранения используется следующая структура:

```javascript
{
  "projects": [
    ...,
    {
      "id": 4,
      "name": "iOS App",
      "tasks": [
        {
          "id": 25,
          "name": "Push Notifications",
          "done": true
        },
        {
          "id": 26,
          "name": "Apple Pay Support",
          "done": false
        },
        ...
      ]
    }
  ]
}

```

При завершении задач — установка флажка — в правом виджете, количество открытых задач в левом виджете должно автоматически обновляться. Это же касается снятия флажка.

Виджеты не должны ничего знать друг о друге и должны быть способны функционировать отдельно.
