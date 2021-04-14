'use strict'

const debug = require('debug')('metricsmonitor:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt([{
    type: 'confirm',
    name: 'setup',
    message: 'This will destroy your database, are you sure?'
  }])

  if (!answer.setup) {
    return console.log('Nothing happened!')
  }

  const config = {
    database: process.env.DB_NAME || 'metricsmonitor',
    username: process.env.DB_USER || 'admonitor',
    password: process.env.DB_PASS || 'admonitor',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5433,
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red("[fatal error]")} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
