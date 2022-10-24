#!/usr/bin/env node

const shell = require('shelljs');
const path = require('path');
const dockerComposeYmlPath = path.resolve(path.join(__dirname, '../docker-compose.yml'));

shell.echo('Stopping Behodler ganache dev env...');
shell.exec(`docker compose -f ${dockerComposeYmlPath} down`);

shell.echo("Restoring file permissions for executing user")
const tmpDirPath = path.resolve(path.join(__dirname, '../.tmp/'));
