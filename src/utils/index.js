'use strict'

const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((item) => [item, 1]))
}

const getUnSelectData = (select = []) => {
  return Object.fromEntries(select.map((item) => [item, 0]))
}

module.exports = {
  getSelectData,
  getUnSelectData,
}
