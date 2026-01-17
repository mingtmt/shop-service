'use strict'

const SmartphoneService = require('./smartphoneServices')
const TabletService = require('./tabletServices')
const LaptopService = require('./laptopServices')

module.exports = {
  smartphone: SmartphoneService,
  tablet: TabletService,
  laptop: LaptopService,
}
