const { getInfo } = require('@changesets/get-github-info');

const repo = 'godaddy/bento';

async function getReleaseLine(changeset, type, options) {
  const [firstLine, ...futureLines] = changeset.summary.split('\n').map((l) => l.trimEnd());

  let returnVal = `- ${firstLine}`;

  if (futureLines.length > 0) {
    returnVal += `\n${futureLines.map((l) => `  ${l}`).join('\n')}`;
  }

  // Add PR link and author if available, otherwise use commit hash
  if (changeset.commit) {
    let prInfo = null;
    try {
      prInfo = await getInfo({
        repo,
        commit: changeset.commit
      });
    } catch (_err) {
      // If we can't get GitHub info, fall back to commit hash
    }

    if (prInfo?.pull) {
      returnVal += ` ([#${prInfo.pull}](https://github.com/${repo}/pull/${prInfo.pull})`;
      if (prInfo.user) {
        returnVal += ` by @${prInfo.user}`;
      }
      returnVal += `)`;
    } else {
      // Fallback to commit hash
      const shortHash = changeset.commit.slice(0, 7);
      returnVal += ` ([${shortHash}](https://github.com/${repo}/commit/${changeset.commit}))`;
    }
  }

  return returnVal;
}

async function getDependencyReleaseLine(changesets, dependenciesUpdated) {
  if (dependenciesUpdated.length === 0) return '';

  const updatedDependenciesList = dependenciesUpdated.map(
    (dependency) => `  - ${dependency.name}@${dependency.newVersion}`
  );

  return `\n<details>\n<summary>Updated dependencies</summary>\n\n${updatedDependenciesList.join('\n')}\n</details>`;
}

module.exports = {
  getReleaseLine,
  getDependencyReleaseLine
};
