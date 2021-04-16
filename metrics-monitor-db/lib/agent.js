'use strict'

module.exports = function setupAgent (AgentModel) {
  function findById (agentId) {
    AgentModel.findById(agentId)
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
    return createdAgent
  }

  return {
    findById,
    createOrUpdate
  }
}
