# Contributing to MooVit

Thanks for contributing to MooVit.

MooVit is a frontend-first mobility and road-awareness project with feature-specific modules for transport, safety, route workflows, vehicles, scheduling, shipments, and related accessibility-oriented experiences. This guide is intended to help first-time contributors understand how to get started and how to submit clean, reviewable changes.

## Quick Links

- [README.md](./README.md)
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- [Issue Templates](./.github/ISSUE_TEMPLATE)
- [Pull Request Template](./.github/pull_request_template.md)
- [Open Issues](https://github.com/ShubhangiRoy12/MooVit/issues)

## Before You Start

Before opening a pull request:

- Read the project overview in `README.md`
- Check whether an issue already exists for your change
- Prefer small, focused pull requests over broad mixed updates
- Avoid starting major work until a maintainer or issue discussion makes the scope clear
- Follow the project Code of Conduct in all issue and PR discussions

## Repository Overview

This repository is organized mostly by feature area rather than by framework conventions.

Common places you may work in:

- Root pages such as `index.html`, `about.html`, `services.html`, `contact.html`, and `feedback.html`
- Shared frontend assets such as `styles.css`, `transport.css`, `script.js`, and `cursor.js`
- Feature folders such as `Routes/`, `Vehicles/`, `Shipments/`, `Schedule/`, `live-detection/`, and `Safety and awareness/`
- GitHub community files inside `.github/`

## Local Setup

### Frontend-only workflow

1. Fork the repository.
2. Clone your fork locally.

```bash
git clone https://github.com/your-username/MooVit.git
cd MooVit
```

3. Serve the project with any static server.

```bash
python -m http.server 8000
```

4. Open the local URL in a browser and test the pages you changed.

### Backend-related workflow

The project vision and docs reference backend and AI workflows, but the current repository layout is frontend-first. If you are working in a branch that includes backend code, the intended setup is typically:

```bash
cd backend
pip install -r requirements.txt
python app.py
```

If the relevant backend files are not present in your checkout, keep your contribution scoped to the frontend or documentation parts that do exist.

## Areas to Contribute

### Frontend Contributions

Frontend contributors can help with:

- UI improvements
- Accessibility fixes
- Responsiveness and layout issues
- Broken links, navigation bugs, and styling inconsistencies
- Page-specific JavaScript enhancements

Typical files:

- `index.html`
- `services.html`
- `about.html`
- `contact.html`
- `feedback.html`
- `styles.css`
- `transport.css`
- `script.js`

### Feature Module Contributions

Module-specific contributors can work in folders such as:

- `Routes/`
- `Vehicles/`
- `Shipments/`
- `Schedule/`
- `Safety and awareness/`
- `Public transportation/`
- `live-detection/`
- `sharp-detection/`

When working in a feature folder:

- Keep your changes scoped to that module unless a shared fix is necessary
- Verify local links, styles, and scripts for that module after editing
- Note any duplicated logic or styling in your PR description if you choose not to refactor it

### AI / ML / Detection Contributions

If you are contributing to detection-related areas:

- Keep documentation aligned with what actually exists in the repository
- Avoid making unsupported claims about models, APIs, or backend behavior
- Explain clearly whether your change is a demo/UI update, a documentation update, or an actual implementation change

### Documentation Contributions

Documentation contributions are welcome for:

- README improvements
- Setup guides
- Contributor onboarding
- Clarifying architecture or feature descriptions
- Fixing outdated or inconsistent instructions

Good documentation PRs should:

- Match the current repository state
- Avoid speculative architecture unless clearly labeled as future direction
- Improve clarity without introducing unnecessary churn

## Branch Naming

Use clear, descriptive branch names. Examples:

- `docs/improve-readme`
- `fix/routes-mobile-layout`
- `feat/dark-mode-toggle`
- `ci/issue-autocomment`

## Pull Request Workflow

1. Create a new branch from `main`.

```bash
git checkout -b docs/short-description
```

2. Make one focused change.
3. Test the affected behavior locally when applicable.
4. Commit with a clear message.

```bash
git add .
git commit -m "docs: improve contribution guide"
```

5. Push to your fork.

```bash
git push origin docs/short-description
```

6. Open a pull request against the upstream repository.

## PR Expectations

A strong PR should include:

- A concise summary of what changed
- Why the change was needed
- The related issue number when applicable
- Screenshots for user-facing UI changes
- Notes about what you tested locally

Please use the pull request template in `.github/pull_request_template.md`.

## Code and Content Standards

### General Standards

- Keep changes small and reviewable
- Use meaningful file names, IDs, classes, and variable names
- Avoid unrelated refactors in the same PR
- Add comments only where they clarify non-obvious logic

### HTML / CSS / JavaScript

- Prefer semantic HTML where possible
- Preserve responsiveness when modifying layouts
- Keep CSS organized and avoid unnecessary duplication
- Keep JavaScript scoped to the affected page or feature

### Documentation

- Use clear headings and short paragraphs
- Prefer current, verifiable project details over aspirational wording
- Link related files when it helps contributors navigate the repo faster

## Beginner-Friendly Contributions

Good first contributions include:

- Fixing typos or stale documentation
- Improving README clarity
- Updating folder-structure docs
- Fixing navigation bugs
- Improving responsiveness on existing pages
- Cleaning up small UI inconsistencies
- Updating issue or PR templates

## Checklist

Before submitting your PR, confirm:

- [ ] My changes are scoped to one issue or one clear task
- [ ] I reviewed the relevant existing files before editing
- [ ] I tested the affected pages or behavior locally when applicable
- [ ] I updated documentation if my change affects contributor or user understanding
- [ ] I linked the related issue or explained why no issue exists
- [ ] I followed the repository templates and contribution guidance

## Need Help?

If you are unsure where to start:

- Open or comment on an issue: <https://github.com/ShubhangiRoy12/MooVit/issues>
- Mention the page or folder you are working on
- Include screenshots, reproduction steps, or examples when reporting bugs
- Ask clarifying questions before making a broad structural change
