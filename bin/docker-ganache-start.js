#!/usr/bin/env node

const path = require('path');
const spawn = require('cross-spawn');
const shell = require('shelljs');

const tmpDirPath = path.resolve(path.join(__dirname, '../.tmp/'));
const tmpDbPath = path.join(tmpDirPath, 'database');
const savedDbPath = path.resolve(path.join(__dirname, '../database/'));
const dockerComposeYmlPath = path.resolve(path.join(__dirname, '../docker-compose.yml'));

shell.echo('Removing temporary ganache database...');
shell.rm('-rf', tmpDirPath);
shell.echo('Database removed.');

shell.echo('Restoring .tmp directory...');
shell.mkdir('-p', tmpDirPath);
shell.echo('.tmp directory created.');

shell.echo('Copying saved Behodler state to ganache temp db dir...');
shell.cp('-R', savedDbPath, tmpDbPath);
shell.echo('Behodler state ready.');

shell.echo('Starting Behodler ganache dev env...');
shell.exec(`docker-compose -f ${dockerComposeYmlPath} up --remove-orphans -d ganache`);

const child = spawn.sync('node', __filename, { stdio: 'inherit' });
process.exit(child.signal || child.status);
