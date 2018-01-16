Recommended workflow
1. Make changes
1. Commit those changes
1. Make sure Travis turns green
1. Bump version in package.json
1. Generate conventionalChangelog (  ``` $ npm run changelog ``` )
1. Commit package.json and package-lock.md and CHANGELOG.md files
1. Tag
1. Push

The reason why you should commit and tag after conventionalChangelog is that the CHANGELOG should be included in the new release, hence gitRawCommitsOpts.from defaults to the latest semver tag.

Important: The npm run changelog command needs to be executed only from master branch.

More details at: https://www.npmjs.com/package/conventional-changelog-cli . 
