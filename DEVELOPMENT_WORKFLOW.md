# Development Workflow

This repository aims to follow the GitFlow paradigm. If you are unfamiliar with GitFlow, please read [Atlassian's GitFlow documentation](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) which illustrates the concepts and its advantages.

# Branching

The following lists the branching semantics to follow:
  * feature: describes a new feature being implemented
    * `example: feature/list-component`

  * refactor: describes the refactoring of a portion of the application
    * `example: refactor/data-fetch-action`

  * hotfix: describes a bugfix/hotfix
    * `example: hotfix/header-scroll-bug`

## Commit Messages

Commit messages should have semantic meanings, and explain the 'why' of the change performed, to make it more easily possible to comb through commits. The following are commit types to follow.

* **feature**: New feature
* **hotfix**: Bug fixes
* **docs**: Documentation-only changes
* **chore**: General code changes not directly related to app functionality
* **style**: Changes to CSS / SCSS
* **lint**: Code formatting and style
* **test**: Test-only changes
* **refactor**: Code change that neither fixes a bug nor adds a feature
* **perf**: Refactor with significant performance benefits
* **ci**: Build system, CI, or CD pipeline changes
* **revert**: Commits which revert another commit
* **type**: Changes specific to static * types (TypeScript, Flow, etc...)

Commits should be isolated to one type. Make sure to keep commits small. This will help to easily change or revert back to past commits. Additionally, commits can have multi-line messages to better express the commit.

```
docs: commit messages doc
  - Add COMMIT_MESSAGES.md
    reflecting the structure and conventions for commit messages.
  - Write bullet points explaining the docs
  - Show an example commit
```

## Pull Requests

### Title

The title of the PR should have the type shown (feature, hotfix, chore, etc..) as well as a brief description of the PR's purpose. Example:

`[feature] Add Infinite Scroll`
