# View Stock Price CLI

Command line interface for checking supported currencies, languages and displaying Stock price. Uses commander.js, dotenv, axios, neat-csv, prettyjson, querystring, chalk, clear and figlet

### Version

1.0.0

## Usage

### Installation

Install the dependencies

```sh
$ npm install
```

### Environment Variables

Create and place your credentials for third party APIs in a .env file

```sh
FIXER_API_KEY=yourSecureKey
CURRENCY_LAYER_API_KEY=yourSecureKey
RAPID_TRANSLATE_API_KEY=yourSecureKey
```

### Create Symlink

```sh
$ npm link
```

### Commands

List supported currencies (C)

```sh
$ curren C
```

List supported languages (L)

```sh
$ curren L
```

Display stock price (S)

```sh
$ curren S
```

Display stock price with desired currency and language

```sh
$ curren S --curr <code> --lang <lang>
```

Display help (-h)

```sh
$ curren -h
```

## App Info

### Author

Michael Mwaura

### Version

1.0.0

### License

This project is licensed under the MIT License
