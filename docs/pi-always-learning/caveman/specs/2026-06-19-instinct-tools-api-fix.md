# caveman spec: instinct-tools API fix

Bug: ExtensionAPI not exported by @earendil-works/pi-ai.

Pattern: Import fix. Remove ExtensionAPI from import; adjust types accordingly.

Reason: prevent TS2305 error in src/instinct-tools.ts; satisfy eslint no-explicit-any.

Next step: implement code changes, run npm run check, fix any TS ESLint issues.
