# Publishing Tracks

*next* 
- the newest development release

*npm*
- the latest stable release

# Git

## Branches

- main/develop/trunk
  - the trunk branch
- feature
  - the individual branch that people develop in
- hotfix
  - the branch used for deploying changes directly to the production environment/release
- release/\<env\>
  - the branch used for testing changes in specific environments
- ci
  - the branch used for testing CI changes

## Requirements

- Trunk based
  - There is only one main branch
  - All code here is deployable
  - Atomic commits
    - All commits to the trunk should be a single item that makes sense by itself in isolation
- Short lived feature branches
- Release branches

### GitHub Flow

GitHub Flow: https://githubflow.github.io/

1. Anything in the master branch is deployable
2. To work on something new, create a descriptively named branch off of master (ie: new-oauth2-scopes)
3. Commit to that branch locally and regularly push your work to the same named branch on the server
4. When you need feedback or help, or you think the branch is ready for merging, open a pull request
5. After someone else has reviewed and signed off on the feature, you can merge it into master
6. Once it is merged and pushed to 'master', you can and should deploy immediately

## Commit Messages

[Angular Commit Message Convention](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format)

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (examples: CircleCi, SauceLabs)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- test: Adding missing tests or correcting existing tests

## Code Reviews

https://devblogs.microsoft.com/appcenter/how-the-visual-studio-mobile-center-team-does-code-review/

>Respect others, yet don’t take anything personally! We all make mistakes at some point. What’s important is to learn and improve, and to treat others how we’d like to be treated.

- Provide clear, obvious contribution guidelines
- Don’t criticize the submitter, point out flaws in the code
- Automate all the things
- Be a role model, and focus on what matters
- [Watch your tone](https://devblogs.microsoft.com/appcenter/how-the-visual-studio-mobile-center-team-does-code-review/#watch-your-tone)

```
👍 or `:+1:`: This is great! It always feels good when somebody likes your work. Show them!
❓ or `:question:`: I have a question / can you clarify?
❌ or `:x:`: This has to change. It’s possibly an error or strongly violates existing conventions.
🔧 or `:wrench:`: This is a well-meant suggestion. Take it or leave it.
🙃 or `:upside_down_face:`: This is a nitpick. Normally related to a small formatting or stylizing detail that shouldn’t block moving forward.
💭 or `:thought_balloon:`: I’m just thinking out loud here. Something doesn’t necessarily have to change, but I want to make sure to share my thoughts.
🤡 or `:clown_face:`: This is a complaint about something with no obvious answer, not necessarily a problem originating from changes.
```
