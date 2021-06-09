'use strict'

globalThis.fetch = require('node-fetch').default
var Client = require('sms77-client')
var Characteristic
var Service

module.exports = function(homebridge) {
    Characteristic = homebridge.hap.Characteristic
    Service = homebridge.hap.Service

    homebridge.registerAccessory('homebridge-sms77-sms', 'Sms77Sms', Sms77SmsSwitch)
}

function Sms77SmsSwitch(log, config) {
    this.log = log

    this.apiKey = config['apiKey']
    this.debug = config['debug']
    this.flash = config['flash']
    this.foreign_id = config['foreign_id']
    this.from = config['from']
    this.label = config['label']
    this.name = config['name']
    this.no_reload = config['no_reload']
    this.performance_tracking = config['performance_tracking']
    this.text = config['text']
    this.to = config['to']
    this.ttl = config['ttl']

    if (!this.apiKey) throw new Error('Missing apiKey!')
    if (!this.name) throw new Error('Missing name!')
    if (!this.text) throw new Error('Missing text!')
    if (!this.to) throw new Error('Missing to!')

    this.client = new Client(this.apiKey, 'homebridge-sms')

    this.services = {
        AccessoryInformation: new Service.AccessoryInformation(),
        Switch: new Service.Switch(this.name)
    }

    this.services.AccessoryInformation
        .setCharacteristic(Characteristic.Manufacturer, 'sms77 e.K.')

    this.services.AccessoryInformation
        .setCharacteristic(Characteristic.Model, 'Send SMS Switch')

    this.services.Switch.getCharacteristic(Characteristic.On)
        .on('set', this.setPowerState.bind(this))

    this.services.Switch.setCharacteristic(Characteristic.On, false)
}

Sms77SmsSwitch.prototype.sendSms = function(to) {
    var self = this
    var params = {
        debug: self.debug,
        flash: self.flash,
        foreign_id: self.foreign_id,
        from: self.from,
        label: self.label,
        no_reload: self.no_reload,
        performance_tracking: self.performance_tracking,
        text: self.text,
        to: to,
        ttl: self.ttl
    }

    self.client.sms(params).then(finalize).catch(function(e) {
        self.log('SMS error (will retry):')
        self.log(e)

        setTimeout(function() {
            self.log('SMS retry...')

            params.text = params.text + ' (retry)'

            self.client.sms(params).then(finalize).catch(function(e) {
                self.log('SMS error (giving up):')
                self.log(e)
            })
        }, 30000)
    })

    function finalize() {
        console.log('SMS sent: ' + to + ' : ' + self.text)
        self.services.Switch.setCharacteristic(Characteristic.On, false) // switch off
    }
}

Sms77SmsSwitch.prototype.setPowerState = function(powerOn, callback) {
    if (powerOn)
        for (var i = 0; i < this.to.length; ++i) this.sendSms(this.to[i])

    callback()
}

Sms77SmsSwitch.prototype.getServices = function() {
    return [this.services.AccessoryInformation, this.services.Switch]
}
