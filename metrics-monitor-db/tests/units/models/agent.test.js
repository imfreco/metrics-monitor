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
const newSingle = { ...agentFixtures.single, id: 10, uuid: 'new-new-new' }

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
    describe('findById service', () => {
      test('findById function should be called once', async () => {
        await db.Agent.findById(single.id)

        expect(mockAgentModel.findById).toBeCalledTimes(1)
      })

      test('findById function should be called with the same id', async () => {
        await db.Agent.findById(single.id)

        expect(mockAgentModel.findById).toBeCalledWith(single.id)
      })

      test('retorned value of findById function should be the same to fixture', async () => {
        const agent = await mockAgentModel.findById(single.id)

        expect(agent).toEqual(agentFixtures.byId(single.id))
      })
    })

    describe('createOrUpdate service when agent exist', () => {
      test('findOne function should be called twice', async () => {
        await db.Agent.createOrUpdate(single)

        expect(mockAgentModel.findOne).toBeCalledTimes(2)
      })

      test('update function should be called once', async () => {
        await db.Agent.createOrUpdate(single)

        expect(mockAgentModel.update).toBeCalledTimes(1)
      })
    })

    describe('createOrUpdate service when agent NOT exist', () => {
      test('findOne function should be called once', async () => {
        await db.Agent.createOrUpdate(newSingle)

        expect(mockAgentModel.findOne).toBeCalledTimes(1)
      })

      test('create function should be called once', async () => {
        await db.Agent.createOrUpdate(newSingle)

        expect(mockAgentModel.create).toBeCalledTimes(1)
      })

      test('update function shouldn\'t be called', async () => {
        await db.Agent.createOrUpdate(newSingle)

        expect(mockAgentModel.update).toBeCalledTimes(0)
      })
    })

    describe('findByUuid service', () => {
      test('findOne should be called once', async () => {
        await db.Agent.findByUuid(single.uuid)

        expect(mockAgentModel.findOne).toBeCalledTimes(1)
      })

      test('findOne should be called with filter object with uuid as arg', async () => {
        await db.Agent.findByUuid(single.uuid)

        expect(mockAgentModel.findOne).toBeCalledWith({ where: { uuid: single.uuid } })
      })
    })

    describe('findAll service', () => {
      test('findAll should be called once', async () => {
        await db.Agent.findAll()

        expect(mockAgentModel.findAll).toBeCalledTimes(1)
      })

      test('findAll should be called without arg', async () => {
        await db.Agent.findAll()

        expect(mockAgentModel.findAll).toBeCalledWith()
      })
    })

    describe('findByConnected service', () => {
      test('findAll should be called once', async () => {
        await db.Agent.findByConnected()

        expect(mockAgentModel.findAll).toBeCalledTimes(1)
      })

      test('findAll should be called with connected filter', async () => {
        await db.Agent.findByConnected()

        expect(mockAgentModel.findAll).toBeCalledWith({ where: { connected: true } })
      })
    })

    describe('findByUsername service', () => {
      test('findAll should be called once', async () => {
        await db.Agent.findByUsername(single.username)

        expect(mockAgentModel.findAll).toBeCalledTimes(1)
      })

      test('findAll should be called with username and connected filter', async () => {
        await db.Agent.findByUsername(single.username)

        expect(mockAgentModel.findAll).toBeCalledWith({ where: { username: single.username, connected: true } })
      })
    })
  })
})
