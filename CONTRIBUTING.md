# Contributing to MooVit

Thanks for contributing to MooVit.

MooVit is a web-first project focused on road safety, accessibility, logistics support, and AI-assisted mobility. Contributions are welcome across frontend pages, JavaScript behavior, documentation, and project structure improvements.

## Before You Start

- Read [README.md](./README.md) for the project overview
- Read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) before participating
- Check existing issues and pull requests to avoid duplicate work
- Prefer small, focused pull requests over large mixed changes

## Tech Stack Overview

This repository is currently organized as a static web project with feature-specific folders.

- HTML for page structure
- CSS for styling and responsiveness
- JavaScript for interactions and page logic
- Vercel-compatible static deployment for the frontend

Some documentation mentions backend and AI integrations, but the current repository is primarily frontend-oriented.

## Project Structure

Common areas you may work in:

- `index.html`, `about.html`, `contact.html`, `services.html`, and similar root pages
- `styles.css`, `transport.css`, and feature-level CSS files
- `script.js`, `cursor.js`, and folder-specific JavaScript files
- Feature folders such as `Routes/`, `Vehicles/`, `Shipments/`, and `Safety and awareness/`

## Local Setup

1. Fork the repository.
2. Clone your fork.

```bash
git clone https://github.com/your-username/MooVit.git
cd MooVit
```

3. Open the project in your editor.
4. Run the site locally using any static server.

Examples:

```bash
npx serve .
```

or

```bash
python -m http.server 8000
```

Then open the local server URL in your browser and test the pages you changed.

## Contribution Workflow

1. Create a branch from `main`.

```bash
git checkout -b docs/short-description
```

2. Make focused changes related to one issue or task.
3. Test the affected pages, links, and interactions locally.
4. Commit with a clear message.

```bash
git add .
git commit -m "docs: improve contributor setup guidance"
```

5. Push your branch to your fork.

```bash
git push origin docs/short-description
```

6. Open a pull request against the upstream repository.

## What to Include in a Pull Request

- A short summary of what changed
- Why the change was needed
- The related issue number, if applicable
- Screenshots for UI changes
- Testing notes describing what you verified locally

## Code Standards

When contributing:

- Match the existing file and folder structure
- Use meaningful file names, IDs, class names, and variables
- Keep HTML semantic where possible
- Keep CSS organized and avoid unnecessary duplication
- Keep JavaScript simple and scoped to the feature you are changing
- Avoid unrelated refactors in the same pull request

## Best Practices

- Fix the root problem, not just the visible symptom
- Preserve existing behavior outside the scope of your change
- Update documentation when contributor workflow or user-visible behavior changes
- Verify links and asset paths after editing pages
- Check mobile responsiveness when changing layouts or CSS

## Good First Contributions

Good contribution areas for this project include:

- Documentation improvements
- Accessibility and responsiveness fixes
- Broken links or navigation fixes
- UI consistency improvements
- Small JavaScript bug fixes
- Cleanup of unclear setup or contributor guidance

## Need Help?

- Open an issue: <https://github.com/ShubhangiRoy12/MooVit/issues>
- Mention the related page or folder when reporting a bug
- Include screenshots, steps to reproduce, and expected behavior when possible
