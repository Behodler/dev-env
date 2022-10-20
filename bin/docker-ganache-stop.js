#!/usr/bin/env node

const spawn = require('cross-spawn');
const shell = require('shelljs');
const path = require('path');

const tmpDirPath = path.resolve(path.join(__dirname, '../.tmp/'));

shell.echo('Stopping Behodler ganache dev env...');
shell.exec('docker-compose down');

shell.echo('Removing temporary ganache database...');
shell.rm('-rf', tmpDirPath);
shell.echo('Database removed.');

const child = spawn.sync('node', __filename, { stdio: 'inherit' });
process.exit(child.signal || child.status);
