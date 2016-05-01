slack-history-export
=========
Command line module to allow you download your slack history.
Supports IM/DM, channels and private groups now, support for multiparty direct message coming soon.


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

Fork and submit pull requests to improve this tool

## Issues/Features requests

Yes, there would be bugs or feature requests.

Please open an issue [here](https://github.com/andela-aidowu/slack-history-export/issues/new) and I would try to reply as soon as possible
