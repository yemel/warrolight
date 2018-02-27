const _ = require('lodash');

const LightDeviceSerial = require('./LightDeviceSerial')
const LightDeviceUDP = require('./LightDeviceUDP')
const DeviceMultiplexer = require('./DeviceMultiplexer')
const LightController = require('./light-programs/main-program')

// const device1 = new LightDeviceSerial(150, 'COM21', '/dev/ttyACM0');
// const device2 = new LightDeviceSerial(150, 'COM18', '/dev/ttyACM1');
const device1 = new LightDeviceUDP(300);

setTimeout(() => {
  let multiplexer = new DeviceMultiplexer(1200, [device1], (index) => [0, index])
  // let multiplexer = new DeviceMultiplexer(600, [device1], (index) => {
  //   if (index > 150 && index < 300) {
  //     return [0, index - 150]
  //   // } else if (index < 300) {
  //   //   return [1, index - 150]
  //   } else {
  //     return [0,0]
  //   }
  // })

  let program = new LightController(colorArray => multiplexer.setState(colorArray))
  program.start()

  const server = require("./server")
  server.createRemoteControl(program, multiplexer);
}, 100)