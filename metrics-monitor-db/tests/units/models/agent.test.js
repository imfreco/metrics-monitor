'use strict'

const { mockAgentModel, mockMetricModel } = require('../../mocks')
const setupDatabase = require('../../../')
const { agentFixtures } = require('../../fixtures')

jest.mock('../../../models/agent.js', () => jest.fn(() => mockAgentModel))
jest.mock('../../../models/metric.js', () => jest.fn(() => mockMetricModel))

const config = {
  logging: () => {}
}
let db = null
const single = { ...agentFixtures.single }

describe('Agent Model', () => {
  beforeEach(async () => {
    jest.clearAllMocks()

    db = await setupDatabase(config)
  })

  test('should be defined', () => {
    expect(db.Agent).toBeTruthy()
  })

  describe('Setup success run', () => {
    test('hasMany function of AgentModel should be executed once', () => {
      expect(mockAgentModel.hasMany).toBeCalledTimes(1)
    })

    test('Argument for hasMany function should be MetricModel', () => {
      expect(mockAgentModel.hasMany).toBeCalledWith(mockMetricModel)
    })

    test('belongTo function of MetricModel should be executed once', () => {
      expect(mockMetricModel.belongsTo).toBeCalledTimes(1)
    })

    test('Argument for belongsTo function should be AgentModel', () => {
      expect(mockMetricModel.belongsTo).toBeCalledWith(mockAgentModel)
    })
  })

  describe('Services Agent', () => {
    test('findById function should be the same', async () => {
      const agent = await db.Agent.findById(single.id)

      expect(agent).toEqual(agentFixtures.byId(single.id))
    })
  })
})
