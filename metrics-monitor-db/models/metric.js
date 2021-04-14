'use strict'

const Sequelize = require('sequelize')
const setSequelizeInstance = require('../lib/db')

module.exports = function setupMetricModel (config) {
  const sequelize = setSequelizeInstance(config)

  return sequelize.define('metric', {
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    value: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  })
}
