# CLAUDE.md - AI Assistant Guide for n-r-gantt

This document provides guidance for AI assistants working on the n-r-gantt project.

## Project Overview

**n-r-gantt** is a Gantt chart library project. The repository is currently in its initial setup phase.

## Repository Status

- **Current State**: Newly initialized repository
- **Main Branch**: To be established
- **Development Branch**: `claude/claude-md-mkgjwe9i6nxf4c3m-Q1JIx`

## Project Structure (Planned)

```
n-r-gantt/
├── src/                    # Source code
│   ├── components/         # React components (if applicable)
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript type definitions
│   └── index.ts            # Main entry point
├── tests/                  # Test files
├── docs/                   # Documentation
├── examples/               # Usage examples
├── package.json            # Node.js package configuration
├── tsconfig.json           # TypeScript configuration
├── README.md               # Project documentation
└── CLAUDE.md               # This file - AI assistant guide
```

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow consistent naming conventions:
  - PascalCase for components and types
  - camelCase for functions and variables
  - kebab-case for file names
- Prefer functional components with hooks (if React-based)
- Write self-documenting code with meaningful names

### Git Workflow

1. **Branch Naming**: Use descriptive branch names prefixed appropriately
   - `feature/` for new features
   - `fix/` for bug fixes
   - `docs/` for documentation updates
   - `claude/` for AI-assisted development sessions

2. **Commit Messages**: Write clear, descriptive commit messages
   - Use imperative mood ("Add feature" not "Added feature")
   - Keep subject line under 50 characters
   - Provide context in body when needed

3. **Pull Requests**: Include description of changes and testing done

### Testing

- Write tests for new functionality
- Maintain test coverage for critical paths
- Run tests before committing changes

## Commands (To Be Configured)

Once the project is set up, common commands will include:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Lint code
npm run lint
```

## Key Conventions for AI Assistants

### When Making Changes

1. **Read before modifying**: Always read existing code before making changes
2. **Minimal changes**: Make only the changes necessary to accomplish the task
3. **Preserve style**: Match existing code style and patterns
4. **Test changes**: Verify changes work as expected
5. **Document significant changes**: Update relevant documentation

### When Adding New Features

1. Consider the overall architecture
2. Follow established patterns in the codebase
3. Add appropriate tests
4. Update documentation as needed

### When Fixing Bugs

1. Understand the root cause before fixing
2. Consider edge cases
3. Add regression tests when appropriate
4. Avoid introducing new issues

## Notes for Future Updates

As the project develops, update this file to include:

- [ ] Specific build and test commands
- [ ] Architecture decisions and patterns
- [ ] API documentation references
- [ ] Deployment procedures
- [ ] Environment setup requirements
- [ ] Common troubleshooting steps

---

*Last updated: 2026-01-16*
*Repository state: Initial setup*
