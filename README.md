<p align="center">
  <img src="https://www.seven.io/wp-content/uploads/Logo.svg" width="250" alt="seven logo" />
</p>

<h1 align="center">seven SMS for Homebridge</h1>

<p align="center">
  Send SMS from <a href="https://homebridge.io/">Homebridge</a> automations - perfect for HomeKit alarms (water leak, smoke detection, motion).
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-teal.svg" alt="MIT License" /></a>
  <a href="https://www.npmjs.com/package/@seven.io/homebridge-sms"><img src="https://img.shields.io/npm/v/@seven.io/homebridge-sms" alt="npm" /></a>
  <img src="https://img.shields.io/badge/Homebridge-1.x-blue" alt="Homebridge 1.x" />
</p>

---

## Features

- **HomeKit Trigger to SMS** - Wire any HomeKit accessory to send an SMS
- **Multiple Recipients** - Comma-separate phone numbers in the `to` array
- **Flash SMS** - Optional flash mode that bypasses the inbox
- **Performance Tracking** - Optional URL shortening + click tracking
- **Foreign ID & Label** - Tag messages for downstream tracking

## Prerequisites

- [Homebridge](https://homebridge.io/) 1.x
- A [seven account](https://www.seven.io/) with API key ([How to get your API key](https://help.seven.io/en/developer/where-do-i-find-my-api-key))

## Installation

```bash
npm i -g homebridge
npm i -g @seven.io/homebridge-sms
```

## Configuration

Add a `Sms77Sms` accessory to your Homebridge `config.json`:

```json
{
  "accessories": [
    {
      "accessory":            "Sms77Sms",
      "apiKey":               "InsertSuperSecretApiKey",
      "debug":                false,
      "flash":                false,
      "foreign_id":           null,
      "from":                 "MyBookStore",
      "label":                null,
      "name":                 "SMS to employees on smoke detection",
      "no_reload":            false,
      "performance_tracking": false,
      "text":                 "Emergency: The smoke detection has triggered!",
      "to":                   ["+49876543210", "+490123456789"],
      "ttl":                  null
    }
  ]
}
```

| Field | Description |
|-------|-------------|
| `accessory` | Must be `Sms77Sms` |
| `apiKey` | Your seven API key |
| `name` | HomeKit accessory name |
| `text` | SMS body |
| `to` | Array of recipient phone numbers |
| `from` | Sender ID. Up to 11 alphanumeric or 16 numeric characters |
| `flash` | Send as [flash SMS](https://help.seven.io/en/flash-sms) |
| `performance_tracking` | Enable [click tracking](https://help.seven.io/en/performance-tracking-1) |
| `foreign_id` / `label` | Tag the message for callbacks / analytics |
| `ttl` | Time-to-live in minutes |
| `debug` | Print extra log output |

## Usage

The accessory exposes a HomeKit switch. Toggling it on - via Home app, Siri, or any HomeKit automation - sends the configured SMS to every recipient in `to`.

## Support

Need help? Feel free to [contact us](https://www.seven.io/en/company/contact/) or [open an issue](https://github.com/seven-io/homebridge-sms/issues).

## License

[MIT](LICENSE)
