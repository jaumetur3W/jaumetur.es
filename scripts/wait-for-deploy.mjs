import { execSync } from 'node:child_process';

const cred = execSync('git credential fill', { input: 'protocol=https\nhost=github.com\n\n' }).toString();
const token = cred.split('\n').find(l => l.startsWith('password=')).replace('password=', '').trim();

const runId = process.argv[2] || '39335130241';

console.log(`Monitoring GitHub Actions Run ${runId}...`);

async function checkRun() {
  const res = await fetch(`https://api.github.com/repos/jautur/jaumetur.es/actions/runs/${runId}`, {
    headers: {
      'Authorization': 'token ' + token,
      'User-Agent': 'Node-Fetch'
    }
  });

  const data = await res.json();
  const status = data.status;
  const conclusion = data.conclusion;

  console.log(`[${new Date().toLocaleTimeString()}] Status: ${status} | Conclusion: ${conclusion}`);

  if (status === 'completed') {
    if (conclusion === 'success') {
      console.log('Deployment SUCCEEDED!');
      process.exit(0);
    } else {
      console.error(`Deployment FAILED with conclusion: ${conclusion}`);
      process.exit(1);
    }
  }

  // Poll jobs for live progress
  const jobsRes = await fetch(`https://api.github.com/repos/jautur/jaumetur.es/actions/runs/${runId}/jobs`, {
    headers: {
      'Authorization': 'token ' + token,
      'User-Agent': 'Node-Fetch'
    }
  });
  const jobsData = await jobsRes.json();
  if (jobsData.jobs) {
    jobsData.jobs.forEach(j => {
      console.log(`   Job: ${j.name} -> ${j.status} (${j.conclusion || 'running'})`);
    });
  }

  setTimeout(checkRun, 8000);
}

checkRun();
