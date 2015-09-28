slack-history-export
=========
Command line module to allow you download your slack history. \
Supports IM/DM now, support for channels and private groups coming soon.


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
    -u, --username [value]   Enter username to download history
    -d, --directory [value]  Directory to save generated file. Default is current directory.
    -f, --filename [value]   Name of generated file. Default is "<current timestamp><username || channel || group>-slack-history" e.g '1443378584156-abimbola-slack-history.json'
    -F, --format [value]     Format you want to download the data, supported format is [csv, json], default is 'json'
  ```
## Usage
```
slack-history-export -t "slack-token-123456abcde" -u abimbola -F csv
```
## Contributing

Fork and submit pull requests to improve this repo

## Issues/Features requests

Yes, there would be bugs or feature requests.

Please open an issue [here](https://github.com/andela-aidowu/slack-history-export/issues/new) and I would try to reply as soon as possible

## Release History

* 0.0.1 Initial release
