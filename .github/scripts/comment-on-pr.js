export default async function commentOnPR({ github, context }) {
  const comment = `#***REMOVED***📝 Changeset Required

This PR contains changes to packages but is missing a changeset. Changesets help us automatically version packages and generate changelogs.

##***REMOVED***To add a changeset:

1. Run \`npm run changeset\` in your local repository
2. Select the packages you've changed
3. Choose the appropriate version bump type:
   - **patch**: Bug fixes and small changes
   - **minor**: New features (backwards compatible)
   - **major**: Breaking changes
4. Write a brief description of your changes using conventional commit syntax (e.g., "fix: resolve issue", "feat: add feature")
5. Commit the generated changeset file

##***REMOVED***Exemptions:

If this PR only contains:
- Test file changes (\`.test.\`, \`.spec.\`, \`.stories.\`)

Then no changeset is required.

**Note:** Documentation changes in packages (e.g., README.mdx) require changesets with \`patch\` version bumps and a \`docs:\` prefix.

[Learn more about changesets](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)`;

  // Check if we already commented
  const { data: comments } = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number
  });

  const botComment = comments.find(
    (comment) => comment.user.type === 'Bot' && comment.body.includes('Changeset Required')
  );

  if (!botComment) {
    await github.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
      body: comment
    });
  }
}
