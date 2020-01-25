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

To create a new page, simply create a new js file in [/pages](./pages) and add it to [`exportPathMap` in next.config.js](https://github.com/texas-justice-initiative/website-nextjs/blob/330d4ed75bbc742d9db5eaa83cb8be5aabbf5a52/next.config.js#L8-L23) to [generate a URL for the static site](https://nextjs.org/docs/api-reference/next.config.js/exportPathMap). You can use this [template](./pages/_template-page.js) as a starter or create your own React Stateless or Class Component.

There is also an [example page](./pages/example-page.js) that has some examples of using Styled Components and where we can add other heavily commented examples in the future.

## Netlify CMS

Some content is editable with [Netlify CMS](https://www.netlifycms.org/). Editors log in to the CMS at https://texasjusticeinitiative.org/static/admin. When an editor saves content changes, the CMS opens a pull request to save the content as Markdown in [/content](https://github.com/texas-justice-initiative/website-nextjs/tree/master/content). We compile the Markdown into the HTML on the live site. The content available to edit in the CMS is configured in [/static/admin/config.yml](https://github.com/texas-justice-initiative/website-nextjs/blob/master/static/admin/config.yml). Learn more in the [Netlify CMS docs](https://www.netlifycms.org/docs/intro/).

## Resources

[Next JS Docs](https://nextjs.org/docs)

[Next JS Tuturials](https://nextjs.org/learn/)

[A 5-minute Intro to Styled Components](https://medium.freecodecamp.org/a-5-minute-intro-to-styled-components-41f40eb7cd55)

[styled-components website](https://www.styled-components.com/)
