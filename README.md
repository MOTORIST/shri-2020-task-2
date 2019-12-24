<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://yastatic.net/s3/lpc/28978093-8753-4cf9-97b2-dcc79dbe722d.svg" alt="Project logo"></a>
</p>

<h3 align="center">Yandex SHRI 2020, TASK-2</h3>

---

<p align="center"> Creating linter
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

Одна из проблем, которую нужно было решить это вывод позиции ошибки. Возможные решения: написать парсер или воспользоваться готовым. Решил не изобретать велосипед. Сначала выбор пал на Acorn, т.к. это одни из самых популярных парсеров js кода. Потом я наткнулся на json-to-ast. Acorn отвалился из-за размера пакета.

Вторая проблема - хотелось провести валидацию за один проход абстрактного синтаксического дерева. Для этого я создал буфер данных для правил (rulesDataBuffer). Функция traverse рекурсивно бегает по узлам и при помощи функции collectRulesData складирует данные в буфер. Затем, после того как данные собраны, запускается функция validation и возвращает ошибки.


## 🏁 Getting Started <a name = "getting_started"></a>

Все правила для валидации находятся в папке rules. Подключаются в файле rules.ts. Каждое правило содержится в отдельном файле. Он должен содержать код ошибки ERROR_CODE и две функции getDataForRule и rule.
По ERROR_CODE данные складируются в буфер (объект с ключами ERROR_CODE). Для сбора данных в функции getDataForRule можно воспользоваться помощниками из helpers/bemaot.ts. Функция getDataForRule может возврщать данные в любом формате. Функция rule получает эти данные в виде массива (т.к. валидирующих элементов может быть много) из буфера по ключу (ERROR_CODE) и на основании этих данных формирует массив ошибок.

### Installing

```
git clone git@github.com:MOTORIST/shri-2020-task-2.git
cd shri-2020-task-2
yarn install or npm install
```

## 🔧 Running the tests <a name = "tests"></a>

```
yarn test
or
yarn test:watch
```


### And coding style tests

```
yarn tslint
```

## 🚀 Deployment <a name = "deployment"></a>

For create poduction bundle use:

```
yarn build
```

## ⛏️ Built Using <a name = "built_using"></a>

- [webpack](https://webpack.js.org/)
- [typescript](https://www.typescriptlang.org/)
- [json-to-ast](https://github.com/vtrushin/json-to-ast)
- [stylelint](https://github.com/stylelint/stylelint)
- [tslint](https://palantir.github.io/tslint/)
- [prettier](https://prettier.io/)
- [commitizen](http://commitizen.github.io/cz-cli/)
- [husky](https://github.com/typicode/husky)
- [jest](https://jestjs.io)
- [ts-jest](https://github.com/kulshekhar/ts-jest)

## ✍️ Authors <a name = "authors"></a>

- [@MOTORIST](https://github.com/MOTORIST)
