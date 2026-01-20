'use strict'

const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((item) => [item, 1]))
}

const getUnSelectData = (select = []) => {
  return Object.fromEntries(select.map((item) => [item, 0]))
}

const removeUndefined = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === null) delete obj[key]
  })

  return obj
}

const updateNestedObjectParser = (obj) => {
  const final = {}
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      const nestedObj = updateNestedObjectParser(obj[key])
      Object.keys(nestedObj).forEach((nestedKey) => {
        final[`${key}.${nestedKey}`] = nestedObj[nestedKey]
      })
    } else {
      final[key] = obj[key]
    }
  })

  return final
}

module.exports = {
  getSelectData,
  getUnSelectData,
  removeUndefined,
  updateNestedObjectParser,
}
