'use strict'

const config = {
  logging: () => {}
}
let db = null

describe('Agent Model', () => {
  beforeEach(async () => {
    const setupDatabase = require('../../../')
    db = await setupDatabase(config)
  })

  test('should be defined', () => {
    expect(db.Agent).toBeTruthy()
  })
})
