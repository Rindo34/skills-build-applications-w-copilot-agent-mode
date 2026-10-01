# OctoFit Tracker frontend

Presentation tier built with React 19, Vite, Bootstrap, and React Router.

## API configuration

Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` with the name of the Codespace hosting the API:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend requests resources from `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[resource]/`. Restart the Vite development server after changing `.env.local`. Without the variable, the UI shows a configuration message and does not send requests to an invalid URL.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Environment changes

Restart Vite after changing `.env.local` so the new environment value is loaded.
