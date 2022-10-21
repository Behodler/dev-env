#!/usr/bin/env node

const spawn = require('cross-spawn');
const shell = require('shelljs');
const path = require('path');
const dockerComposeYmlPath = path.resolve(path.join(__dirname, '../docker-compose.yml'));

shell.echo('Stopping Behodler ganache dev env...');
shell.exec(`docker-compose -f ${dockerComposeYmlPath} down`);

const child = spawn.sync('node', __filename, { stdio: 'inherit' });
process.exit(child.signal || child.status);
