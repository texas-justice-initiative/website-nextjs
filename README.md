# TJI Next JS Website

To get started clone this repo and cd to the directory, then run:

`npm install`

To start the dev server run:

`npm run dev`

The url for the dev server will be: http://localhost:3333/

## Javascript Style Guide

To maintain consistency in code formatting and to avoid a ton of problems with Github tracking changes that are just differences in tab width, etc., this repo is set up according to [Wes Bos's No-Sweat™ Eslint and Prettier Setup](https://github.com/wesbos/eslint-config-wesbos)

The [Local/Per Project Install](https://github.com/wesbos/eslint-config-wesbos) is taken care of when you run `yarn` or `npm install`. Please follow the [With VS Code](https://github.com/wesbos/eslint-config-wesbos) instructions (if you're using VS Code) to have the formatting applied on save.

## Proptype Validation

We are using [prop-types](https://www.npmjs.com/package/prop-types) for component property validation. When building or updating components that have property, validation should now be incorporated as well.

See the [documentation](https://reactjs.org/docs/typechecking-with-proptypes.html) for more information.

## Using Next JS

To create a new page, simply create a new js file in [/pages](./pages). You can use this [template](./pages/_template-page.js) as a starter or create your own React Stateless or Class Component.

There is also an [example page](./pages/example-page.js) that has some examples of using Styled Components and where we can add other heavily commented examples in the future.

## Testing

We are using [Jest](https://jestjs.io/) for testing. When we add new features and fix bugs, especially related to mission-critical or complex code such as displaying data on the "Explore the Data" page, we should consider adding new tests to the corresponding file in the `/test` directory. GitHub Actions will [run our tests](.github/workflows/jest.yml) each time we push to this repository. To run tests locally, run:

`npm run test`

## Resources

[Next JS Docs](https://nextjs.org/docs)

[Next JS Tuturials](https://nextjs.org/learn/)

[A 5-minute Intro to Styled Components](https://medium.freecodecamp.org/a-5-minute-intro-to-styled-components-41f40eb7cd55)

[styled-components website](https://www.styled-components.com/)
