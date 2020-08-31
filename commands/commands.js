const program = require("commander");
const axios = require("axios");
const neatCsv = require("neat-csv");
const prettyjson = require("prettyjson");
const querystring = require("querystring");
require("dotenv").config();

const curr = () => {
  // CLI init
  program
    .version("v1.0.0")
    .description("This is an application to display Stocks price");

  // List available currencies command
  program
    .command("currencies")
    .alias("C")
    .description("A list of all supported currencies")
    .action(async () => {
      const url =
        "https://focusmobile-interview-materials.s3.eu-west-3.amazonaws.com/Cheap.Stocks.Internationalization.Currencies.csv";

      try {
        const csv = await axios.get(url);

        const currencies = await neatCsv(csv.data);

        let supportedCurrencies = [];
        currencies.forEach((currency) => {
          supportedCurrencies.push({
            Currency: currency.Currency,
            "ISO 4217 Code": currency["ISO 4217 Code"],
          });
        });

        console.log(prettyjson.render(supportedCurrencies));
      } catch (err) {
        console.log("There was an issue with the server, try again later");
      }
    });

  // List available languages command
  program
    .command("languages")
    .alias("L")
    .description("A list of all supported languages")
    .action(async () => {
      const url =
        "https://focusmobile-interview-materials.s3.eu-west-3.amazonaws.com/Cheap.Stocks.Internationalization.Languages.csv";

      try {
        const csv = await axios.get(url);

        const languages = await neatCsv(csv.data);

        console.log(prettyjson.render(languages));
      } catch (err) {
        console.log("There was an issue with the server, try again later");
      }
    });

  // Display stock price command
  program
    .command("stock")
    .option("-c, --curr <code...>", "specify currency code e.g 'EUR'")
    .option("-l, --lang <lang...>", "specify language e.g 'fr'")
    .alias("S")
    .description("Display stock price")
    .action(async (cmdObj) => {
      try {
        const fixer = await axios.get(
          `http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}`
        );

        const currencyLayer = await axios.get(
          `http://api.currencylayer.com/live?access_key=${process.env.CURRENCY_LAYER_API_KEY}`
        );

        if (fixer) {
          const rates = fixer.data.rates;
          let price = 247.74;

          if (cmdObj.curr && !cmdObj.lang) {
            //If only currency flag is selected

            const usd = rates.USD;
            const codes = Object.keys(rates);
            const currCode = codes.find(
              (code) => code === cmdObj.curr[0].toUpperCase()
            );
            price = (price * rates[currCode]) / usd;
            console.log(
              `The current price for AAPL is ${price} ${cmdObj.curr[0].toUpperCase()}`
            );
          } else if (cmdObj.lang && !cmdObj.curr) {
            //If only language flag is selected
            let originalText = "The current price for AAPL is 247.74 USD";
            const res = await axios.post(
              "https://google-translate1.p.rapidapi.com/language/translate/v2",
              querystring.stringify({
                source: "en",
                q: `${originalText}`,
                target: `${cmdObj.lang[0]}`,
              }),
              {
                headers: {
                  "x-rapidapi-host": "google-translate1.p.rapidapi.com",
                  "x-rapidapi-key": process.env.RAPID_TRANSLATE_API_KEY,
                  "accept-encoding": "application/gzip",
                  "content-type": "application/x-www-form-urlencoded",
                },
              }
            );
            const text = res.data.data.translations[0];
            console.log(prettyjson.render(text.translatedText));
          } else if (cmdObj.curr && cmdObj.lang) {
            //If both currency and language flags are selected
            const usd = rates.USD;
            const codes = Object.keys(rates);
            const currCode = codes.find(
              (code) => code === cmdObj.curr[0].toUpperCase()
            );
            price = (price * rates[currCode]) / usd;
            originalText = `The current price for AAPL is ${price} ${cmdObj.curr[0].toUpperCase()}`;
            const res = await axios.post(
              "https://google-translate1.p.rapidapi.com/language/translate/v2",
              querystring.stringify({
                source: "en",
                q: `${originalText}`,
                target: `${cmdObj.lang[0]}`,
              }),
              {
                headers: {
                  "x-rapidapi-host": "google-translate1.p.rapidapi.com",
                  "x-rapidapi-key": process.env.RAPID_TRANSLATE_API_KEY,
                  "accept-encoding": "application/gzip",
                  "content-type": "application/x-www-form-urlencoded",
                },
              }
            );
            const text = res.data.data.translations[0];
            console.log(prettyjson.render(text.translatedText));
          } else {
            console.log(`The current price for AAPL is 247.74 USD`);
          }
        } else {
          const rates = currencyLayer.data.quotes;

          let price = 247.74;

          if (cmdObj.curr && !cmdObj.lang) {
            //If only currency flag is selected

            const codes = Object.keys(rates);

            let newcodes = [];
            codes.forEach((code) => {
              newcodes.push(code.substring(3));
            });

            const currCode = newcodes.find(
              (code) => code === cmdObj.curr[0].toUpperCase()
            );
            price = price * rates[`USD${currCode}`];
            console.log(
              `The current price for AAPL is ${price} ${cmdObj.curr[0].toUpperCase()}`
            );
          } else if (cmdObj.lang && !cmdObj.curr) {
            //If only language flag is selected
            let originalText = "The current price for AAPL is 247.74 USD";
            const res = await axios.post(
              "https://google-translate1.p.rapidapi.com/language/translate/v2",
              querystring.stringify({
                source: "en",
                q: `${originalText}`,
                target: `${cmdObj.lang[0]}`,
              }),
              {
                headers: {
                  "x-rapidapi-host": "google-translate1.p.rapidapi.com",
                  "x-rapidapi-key": process.env.RAPID_TRANSLATE_API_KEY,
                  "accept-encoding": "application/gzip",
                  "content-type": "application/x-www-form-urlencoded",
                },
              }
            );
            const text = res.data.data.translations[0];
            console.log(prettyjson.render(text.translatedText));
          } else if (cmdObj.curr && cmdObj.lang) {
            //If both currency and language flags are selected
            const usd = rates.USD;
            const codes = Object.keys(rates);
            const currCode = codes.find(
              (code) => code === cmdObj.curr[0].toUpperCase()
            );
            price = (price * rates[currCode]) / usd;
            originalText = `The current price for AAPL is ${price} ${cmdObj.curr[0].toUpperCase()}`;
            const res = await axios.post(
              "https://google-translate1.p.rapidapi.com/language/translate/v2",
              querystring.stringify({
                source: "en",
                q: `${originalText}`,
                target: `${cmdObj.lang[0]}`,
              }),
              {
                headers: {
                  "x-rapidapi-host": "google-translate1.p.rapidapi.com",
                  "x-rapidapi-key": process.env.RAPID_TRANSLATE_API_KEY,
                  "accept-encoding": "application/gzip",
                  "content-type": "application/x-www-form-urlencoded",
                },
              }
            );
            const text = res.data.data.translations[0];
            console.log(prettyjson.render(text.translatedText));
          } else {
            console.log(`The current price for AAPL is 247.74 USD`);
          }
        }
      } catch (err) {
        console.log("There was an issue with the server, try again later");
      }
    });

  program.parse(process.argv);
};

module.exports = {
  curr,
};
