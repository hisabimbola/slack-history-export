slack-history-export
=========
Command line module to allow you download your slack history.
Supports IM/DM, channels and private groups now, support for multiparty direct message coming soon.


[![Travis Build Status][travis-icon]][travis]
[![Codecov Coverage Status][codecov-icon]][codecov]
[![David Dependencies Status][david-icon]][david]
[![David devDependencies Status][david-dev-icon]][david-dev]

## Installation
  ```
  npm install slack-history-export -g
  ```

## Options
  ```
  Usage: slack-history-export [options]
  Options:

    --help, -h      Show help text.                                      [boolean]
    --version, -v   Show version number                                  [boolean]
    --token, -t     Slack Token. You can generate it
                    from here https://api.slack.com/custom-integrations/legacy-tokens
    --type, -T      Type of export you want to do         [choices: "dm", "group"]
    --username, -u  Username of the person who chat
                    history with you you want to download
    --group, -g     Name of the group to download history
    --logLevel, -l  Enable and set log level
          [choices: "info", "silly", "verbose", "warn", "error"] [default: "info"]
    --channel, -c   Name of the channel to download history
    --filepath, -f  Path to the json file to save the history  [default: "stdout"]
  ```

  You can provide token to the module in several ways
  * CLI flag
  * Environment variable `SLACK_HISTORY_EXPORT_TOKEN`
  * File. File location is `~/.config/slack-history-export/config.json` with key of `SLACK_HISTORY_EXPORT_TOKEN`
  ```
  {
    "SLACK_HISTORY_EXPORT_TOKEN": "testingtoken"
  }

  ```
## Usage
```
slack-history-export -t "slack-token-123456abcde" -u abimbola -f 'amimbola.json'
```

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for info on contributing to slack-history-export


[travis]: https://travis-ci.org/hisabimbola/slack-history-export
[travis-icon]: https://img.shields.io/travis/hisabimbola/slack-history-export/master.svg?style=flat-square
[codecov]: https://codecov.io/gh/hisabimbola/slack-history-export
[codecov-icon]: https://img.shields.io/codecov/c/github/hisabimbola/slack-history-export.svg?style=flat-square
[david]: https://david-dm.org/hisabimbola/slack-history-export
[david-icon]: https://img.shields.io/david/hisabimbola/slack-history-export.svg?style=flat-square
[david-dev]: https://david-dm.org/hisabimbola/slack-history-export?type=dev
[david-dev-icon]: https://img.shields.io/david/dev/hisabimbola/slack-history-export.svg?style=flat-square
