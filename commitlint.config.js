module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    //   TODO Add Scope Enum Here
    "type-enum": [
      2,
      "always",
      [
        "🚀",
        "🪳",
        "📑",
        "🎨",
        "🤖",
        "📈",
        "🧪",
        "🛠",
        "👷🏻‍♂️",
        "🌴",
        "🗑",
      ],
    ],
  },
  prompt: {
    settings: {},
    messages: {
      skip: ":skip",
      max: "upper %d chars",
      min: "%d chars at least",
      emptyWarning: "can not be empty",
      upperLimitWarning: "over limit",
      lowerLimitWarning: "below limit",
    },
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          '🚀': {
            description: "A new feature",
            title: "Features",
            emoji: "🚀",
          },
          '🪳': {
            description: "A bug fix",
            title: "Bug Fixes",
            emoji: "🪳",
          },
          '📑': {
            description: "Documentation only changes",
            title: "Documentation",
            emoji: "📑",
          },
          '🎨': {
            description:
              "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
            title: "Styles",
            emoji: "🎨",
          },
          '🤖': {
            description:
              "A code change that neither fixes a bug nor adds a feature",
            title: "Code Refactoring",
            emoji: "🤖",
          },
          '📈': {
            description: "A code change that improves performance",
            title: "Performance Improvements",
            emoji: "📈",
          },
          '🧪': {
            description: "Adding missing tests or correcting existing tests",
            title: "Tests",
            emoji: "🧪",
          },
          '🛠': {
            description:
              "Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
            title: "Builds",
            emoji: "🛠",
          },
          '👷🏻‍♂️': {
            description:
              "Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)",
            title: "Continuous Integrations",
            emoji: "👷🏻‍♂️",
          },
          '🌴': {
            description: "Other changes that don't modify src or test files",
            title: "Chores",
            emoji: "🌴",
          },
          '🗑': {
            description: "Reverts a previous commit",
            title: "Reverts",
            emoji: "🗑",
          },
        },
      },
      scope: {
        description:
          "What is the scope of this change (e.g. Module name)",
      },
      subject: {
        description:
          "Write a short, imperative tense description of the change",
      },
      body: {
        description: "Provide a longer description of the change",
      },
      isBreaking: {
        description: "Are there any breaking changes?",
      },
      breakingBody: {
        description:
          "A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself",
      },
      breaking: {
        description: "Describe the breaking changes",
      },
      isIssueAffected: {
        description: "Does this change affect any open issues?",
      },
      issuesBody: {
        description:
          "If issues are closed, the commit requires a body. Please enter a longer description of the commit itself",
      },
      issues: {
        description: 'Add issue references (e.g. "pw-1234", "pw-4234".)',
      },
    },
  },
};
