#!/usr/bin/env node

const spawn = require('cross-spawn');
const shell = require('shelljs');

shell.echo('Stopping Behodler ganache dev env...');
shell.exec('docker-compose down');

const child = spawn.sync('node', __filename, { stdio: 'inherit' });
process.exit(child.signal || child.status);
