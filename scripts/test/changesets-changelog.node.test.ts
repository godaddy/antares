import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCommitInfo } from '@changesets/get-github-info';
import { getDependencyReleaseLine, getReleaseLine } from '../../.changeset/changelog-config.mjs';

vi.mock('@changesets/get-github-info', () => ({
  getCommitInfo: vi.fn()
}));

const commit = '1234567890abcdef';
const repo = 'https://github.com/godaddy/antares';
const commitInfo = {
  commit: { sha: commit, url: `${repo}/commit/${commit}`, markdownLink: '' },
  pull: { number: 42, url: `${repo}/pull/42`, markdownLink: '' },
  author: { login: 'contributor', url: 'https://github.com/contributor', markdownLink: '' }
};

const getCommitInfoMock = vi.mocked(getCommitInfo);

afterEach(function resetGitHubInfo() {
  getCommitInfoMock.mockReset();
});

describe('Changesets changelog', function changesetsChangelogSuite() {
  it('uses the v1 commit API to link the Antares PR and author', async function linksPullRequest() {
    getCommitInfoMock.mockResolvedValue(commitInfo);

    expect(await getReleaseLine({ summary: 'Fix release output', commit }, 'patch', {})).toBe(
      `- Fix release output ([#42](${repo}/pull/42) by @contributor)`
    );
    expect(getCommitInfoMock).toHaveBeenCalledWith({ repo: 'godaddy/antares', commit });
  });

  it('links a PR without an author', async function linksPullRequestWithoutAuthor() {
    getCommitInfoMock.mockResolvedValue({ ...commitInfo, author: undefined });

    expect(await getReleaseLine({ summary: 'Fix release output', commit }, 'patch', {})).toBe(
      `- Fix release output ([#42](${repo}/pull/42))`
    );
  });

  it.each([
    ['missing commit', undefined],
    ['commit without a PR', { ...commitInfo, pull: undefined }]
  ] as const)('falls back to the commit link for %s', async function fallsBackToCommit(_label, info) {
    getCommitInfoMock.mockResolvedValue(info);

    expect(await getReleaseLine({ summary: 'Fix release output', commit }, 'patch', {})).toBe(
      `- Fix release output ([1234567](${repo}/commit/${commit}))`
    );
  });

  it('falls back to the commit link when GitHub fails', async function handlesGitHubFailure() {
    getCommitInfoMock.mockRejectedValue(new Error('GitHub unavailable'));

    expect(await getReleaseLine({ summary: 'Fix release output', commit }, 'patch', {})).toBe(
      `- Fix release output ([1234567](${repo}/commit/${commit}))`
    );
  });

  it('preserves multiline summaries without a commit lookup', async function formatsMultilineSummary() {
    expect(await getReleaseLine({ summary: 'Fix release output  \n\nMore details  ' }, 'patch', {})).toBe(
      '- Fix release output\n  \n  More details'
    );
    expect(getCommitInfoMock).not.toHaveBeenCalled();
  });

  it('renders dependency updates in a details block', async function formatsDependencyUpdates() {
    expect(await getDependencyReleaseLine([], [{ name: '@bento/button', newVersion: '1.2.3' }])).toBe(
      '\n<details>\n<summary>Updated dependencies</summary>\n\n  - @bento/button@1.2.3\n</details>'
    );
    expect(await getDependencyReleaseLine([], [])).toBe('');
  });
});
