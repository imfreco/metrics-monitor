'use strict'

const agent = {
  id: 1,
  uuid: 'xxx-xxx-xxx',
  name: 'fixture',
  username: 'agentFixX',
  hostname: 'hostFix',
  pid: 0,
  connected: true,
  createdAt: new Date(),
  updatedAt: new Date()
}

const agents = [
  agent,
  { ...agent, id: 2, uuid: 'yyy-yyy-yyy', connected: false, username: 'agentFixY' },
  { ...agent, id: 3, uuid: 'zzz-zzz-zzz' }
]

module.exports = {
  single: agent,
  all: agents,
  connected: agents.filter(agent => agent.connected),
  agentFixX: agents.filter(agent => agent.username === 'agentFixX'),
  byUuid: uuid => agents.find(agent => agent.uuid === uuid),
  byId: id => agents.find(agent => agent.id === id)
}
