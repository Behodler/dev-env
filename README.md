# Behodler Ganache chain
The scripts allowing to run a Ganache dev blockchain with the Behodler contracts pre-deployed.

## Development

### Requirements
* `nodejs` >= 14
* `yarn`
* `docker` and `docker-compose`

### Overview
The repo and the resulting npm package consists of two scripts: one for starting the docker container running the Behodler ganache chain and the second one for stopping the containers. The saved network state (with deployed Behodler contracts, etc.) is stored in the `database` directory. The working db is kept in `.tmmp/database` directory to avoid chaning the saved state accidentally.

### docker-ganache-start.js
* checks if `.tmp` dir exists and creates one if not
* checks if the `database` and `.tmp/database` dirs have the same content
* if the files in both `database` dirs are the same, the script only starts the dev chain
* if the files differs, the script restores the saved state and then starts the dev chain

### docker-ganache-stop.js
Stops the docker container running the dev chain.

## Usage in an app

Install the package:
```
yarn add @behodler/dev-env
```

Update `package.json` scripts
```
{
  "scripts": {
    "start-ganache"; "behodler-dev-env-start",
    "stop-ganache"; "behodler-dev-env-stop"
  }
}
```

And then
```
yarn start-ganache
```
or
```
yarn stop-ganache
```
