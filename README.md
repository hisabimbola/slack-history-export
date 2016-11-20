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

    -h, --help               output usage information
    -V, --version            output the version number
    -t, --token <value>      [REQUIRED] Enter your slack token API, you can generate it from here https://api.slack.com/web
    -u, --username [value]   Enter username of the person whose chat history with you you will like to download
    -c, --channel [value]    Enter the name of the channel you will like to download
    -g, --group [value]      Enter the name of the group you will like to download
    -d, --directory [value]  Directory to save generated file
    -f, --filename [value]   Name of generated file. Default is "<current timestamp><username || channel || group>-slack-history" e.g '1443378584156-abimbola-slack-history.json'
    -F, --format [value]     Format you want to download the data, supported format is [csv, json], default is 'json'
  ```
## Usage
```
slack-history-export -t "slack-token-123456abcde" -u abimbola -F csv
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
