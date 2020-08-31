#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const { curr } = require("../commands/commands");

clear();

console.log(
  chalk.yellow(
    figlet.textSync("Cheap Stocks Inc", { horizontalLayout: "default" })
  )
);

const main = () => {
  curr();
};

main();
