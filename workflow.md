# Development Workflow

## Development

* `npm run start` starts the Vite development server. Work on the site in VS Code, and changes to your JavaScript, CSS/SCSS, and HTML will be reflected in the browser automatically.

## Before Turning In

Run these commands in order:

1. `npm run lint` — runs ESLint to check your JavaScript for errors and warnings.
2. `npm run format` — runs Prettier to automatically format your code.
3. `npm run build` — creates the final production files in the `dist/` folder.
4. `npm run preview` — serves the production build locally so you can check what the built site will look like.

## Deploy

After everything looks correct:

1. Commit your changes with Git.
2. Push the changes to GitHub.
3. Netlify detects the GitHub update and deploys the new production build.
4. Check the live Netlify site to make sure everything works correctly.
