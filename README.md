[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Dependency Status](https://www.versioneye.com/user/projects/59b51ee1368b08003311bd9d/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/59b51ee1368b08003311bd9d)

# Twitter API
This project is to learn more about the Twitter API and indexing the last 100 entries of a Twitter Channel.

## Requirements
* [Docker](https://www.docker.com/)
* [Node](https://nodejs.org/) - _I have used version 8.4_
* [Yarn](https://yarnpkg.com) (optional)

As I like yarn as paket manager you can just replace _npm_ with _yarn_ in the following documentation.

## Config
Before we start we need to setup the config. Therefor you copy the _config.js.example_ file to _config.js_.
```bash
copy ./etc/config.js.example ./etc/config.js.
```

Now you need replace the Twitter credentials marked with _xxx_ by your own credentials.
```json
{
	"Twiter": {
        "credentials": {
            "consumerKey": "xxx",
            "consumerSecret": "xxx",
            "accessToken": "xxx",
            "accessTokenSecret": "xxx"
        }
    }
}
```

## Run It
If you are running this project for the first time, you need to use the _init_ script from npm.
```bash
npm run init
```

You can stop the docker container by just executing the _stop_ script.
```bash
npm run stop
```

For the second (and following) time you can use the _start_ script.
```bash
npm run start
```

To reset everything you need to run the _destroy_ script.
```bash
npm run destroy
```
Keep in mind after destroying you need to execute the _init_ script.

## Access Frontend
After running the _init_ (or _start_) script you can access the frontend under [http://localhost:8080](http://localhost:8080).
