'use strict'

module.exports = function setupAgent (AgentModel) {
  function findById (agentId) {
    AgentModel.findById(agentId)
  }

  function findByUuid (uuid) {
    return AgentModel.findOne({
      where: { uuid }
    })
  }

  function findAll () {
    return AgentModel.findAll()
  }

  function findByConnected () {
    return AgentModel.findAll({
      where: { connected: true }
    })
  }

  function findByUsername (username) {
    return AgentModel.findAll({
      where: {
        username,
        connected: true
      }
    })
  }

  async function createOrUpdate (agent) {
    const filter = {
      where: {
        uuid: agent.uuid
      }
    }

    const foundAgent = await AgentModel.findOne(filter)

    if (foundAgent) {
      const updatedAgent = await AgentModel.update(agent, filter)
      return updatedAgent ? AgentModel.findOne(filter) : foundAgent
    }

    const createdAgent = await AgentModel.create(agent)
    return createdAgent.toJSON()
  }

  return {
    findById,
    findByUuid,
    findAll,
    findByConnected,
    findByUsername,
    createOrUpdate
  }
}
