'use strict'

const mongoose = require('mongoose')
const env = require('./env')

class Database {
  constructor() {
    this.connect()
  }

  async connect(type = 'mongodb') {
    if (env.NODE_ENV === 'development') {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    try {
      await mongoose.connect(env.MONGODB_URI, {
        maxPoolSize: 50,
        serverSelectionTimeoutMS: 5000,
      })

      console.log(`Connected Mongodb Success! State:`, mongoose.connection.readyState)
    } catch (err) {
      console.error(`Error Connect to MongoDB: ${err.message}`)
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb
