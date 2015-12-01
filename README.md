# Parent Reports - Redux

**This branch is very much a WIP and is an experimental playground, you have been warned.**

Currently almost nothing beyond the concept of widgets positioned on pages is actually implemented.


## What is it?

It's an attempt to reimplement the parent reports functionality using a bunch of shiney new technologies. Namely...

- React (https://facebook.github.io/react/index.html)
- Redux (http://redux.js.org/)
- Immutable.js (http://facebook.github.io/immutable-js/)
- Babel/ES6 (https://babeljs.io/)
- Webpack (https://webpack.github.io/)
- Mocha (https://mochajs.org/)
- unxpected (http://unexpected.js.org/)
- Standard JS (http://standardjs.com)


## Why?

1. I wanted to try them all out and this seemed like quite a well defined yet meaty problem area.
2. Parent reports is a bit of mess for a couple of reasons that this tech stack should solve...
  - Mutable state in DOM leads to obscure bugs
  - no test coverage
  - no dependency tree and therefore no proper build process
  - coffeescript


## How can I help out?

**Yay! Come join me in paradise...**
See [TODOS.md](https://github.com/assembly-edu/parent-reports/blob/redux/TODO.md) for an up to date list of stuff.


## How do I run it?

Install deps with...

    npm intall

Start a dev server with...

    npm start

Run the tests with...

    npm test

Run tests continuously with...

    npm run test:watch

