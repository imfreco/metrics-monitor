'use strict'

module.exports = function setupAgent (AgentModel) {
  function findById (agentId) {
    AgentModel.findById(agentId)
  }

  return {
    findById
  }
}
