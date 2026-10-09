# Password Security Education Prototype

A responsive React prototype for Topic 43 of the ICT midterm project. The interface demonstrates a short learning flow: start, practice with a fictional example, receive local feedback, and complete the lesson.

## Run locally

```bash
npm install
npm run dev
```

## Prototype notes

- Practice text is checked in the browser only and is cleared when the learner completes or restarts the lesson.
- Pasting into the practice field is disabled as an extra safeguard.
- An empty submission and a missing fictional-example confirmation show the recovery state.
- The simple pattern checks are educational examples, not a password-strength guarantee.
- This is a front-end prototype with no API, account system, analytics, or database.
