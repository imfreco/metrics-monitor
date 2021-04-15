'use strict'

const { agentFixtures } = require('../fixtures')

module.exports = {
  hasMany: jest.fn(),
  findById: jest.fn(id => Promise.resolve(agentFixtures.byId(id)))
}
