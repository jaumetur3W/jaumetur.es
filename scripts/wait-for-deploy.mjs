import { execSync } from 'node:child_process';

const cred = execSync('git credential fill', { input: 'protocol=https\nhost=github.com\n\n' }).toString();
const token = cred.split('\n').find(l => l.startsWith('password=')).replace('password=', '').trim();

const runIds = process.argv.slice(2);
if (runIds.length === 0) runIds.push('39335367936', '39335367982');

console.log(`Monitoring GitHub Actions Runs: ${runIds.join(', ')}...`);

async function checkAll() {
  let allDone = true;
  let anyFailed = false;

  for (const id of runIds) {
    const res = await fetch(`https://api.github.com/repos/jaumetur3W/jaumetur.es/actions/runs/${id}`, {
      headers: {
        'Authorization': 'token ' + token,
        'User-Agent': 'Node-Fetch'
      }
    });
    const d = await res.json();
    console.log(`[${new Date().toLocaleTimeString()}] ${d.name} (${id.slice(-6)}): status=${d.status}, conclusion=${d.conclusion}`);
    if (d.status !== 'completed') {
      allDone = false;
    } else if (d.conclusion !== 'success') {
      anyFailed = true;
    }
  }

  if (allDone) {
    if (anyFailed) {
      console.error('One or more workflows FAILED.');
      process.exit(1);
    } else {
      console.log('ALL WORKFLOWS SUCCEEDED AND DEPLOYED!');
      process.exit(0);
    }
  }

  setTimeout(checkAll, 10000);
}

checkAll();
