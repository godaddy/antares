import { getCommitInfo } from '@changesets/get-github-info';

const repo = 'godaddy/antares';

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
      prInfo = await getCommitInfo({
        repo,
        commit: changeset.commit
      });
    } catch (_err) {
      // If we can't get GitHub info, fall back to commit hash
    }

    if (prInfo?.pull?.number) {
      returnVal += ` ([#${prInfo.pull.number}](https://github.com/${repo}/pull/${prInfo.pull.number})`;
      if (prInfo.author?.login) {
        returnVal += ` by @${prInfo.author.login}`;
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

export { getReleaseLine, getDependencyReleaseLine };
