#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const spawn = require('cross-spawn');
const shell = require('shelljs');
const dirCompare = require('dir-compare');

const tmpDirPath = path.resolve(path.join(__dirname, '../.tmp/'));
const tmpDbPath = path.join(tmpDirPath, 'database');
const savedDbPath = path.resolve(path.join(__dirname, '../database/'));
const dockerComposeYmlPath = path.resolve(path.join(__dirname, '../docker-compose.yml'));

if (!fs.existsSync(tmpDirPath)) {
  shell.echo('Creating .tmp directory...');
  shell.mkdir('-p', tmpDirPath);
  shell.chmod('-R','777',tmpDirPath)
  shell.echo('Copying saved Behodler state to ganache temp db dir...');
  shell.cp('-R', savedDbPath, tmpDbPath);
  shell.echo('Behodler state ready.');
} else {
  shell.echo('Checking changes to saved db...');

  const dbComparisonResult = dirCompare.compareSync(tmpDbPath, savedDbPath, {
    compareSize: true,
    compareContent: true,
  });

  if (!dbComparisonResult.same) {
    shell.echo('Changes detected, removing temporary ganache database...');
    shell.rm('-rf', tmpDbPath);

    shell.echo('Copying saved Behodler state to ganache temp db dir...');
    shell.cp('-R', savedDbPath, tmpDbPath);
    shell.echo('Behodler state ready.');
  } else {
    shell.echo('No changes detected.');
  }
}

shell.echo('Starting Behodler ganache dev env...');
shell.exec(`docker compose -f ${dockerComposeYmlPath} up --remove-orphans -d ganache`);

const child = spawn.sync('node', __filename, { stdio: 'inherit' });
process.exit(child.signal || child.status);
