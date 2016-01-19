
# jss-simple

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Thin wrapper around [jss](https://github.com/jsstyles/jss) that simplifies its interface and restricts you to a single, global stylesheet.

## Installation

    $ npm install jss-simple

## Usage

jss-simple is designed specifically for global, single-sheet, statically determined styles and its interface is optimized to reflect that. Instead of creating stylesheets, jss-simple maintains a single stylesheet internally for you, which you can either `toString` or `attach` whenever your components have all been imported.

This means that before you call `toString/attach` all your style rules must have been added, which means you must make sure that they are evaluated at import/require time - which generally means that they are in the outer-most scope of your module.  E.g.

*Bad:*
```javascript
import css from 'jss-simple'

export default function render ({props}) {
  const style = css({
    primary: {
      color: 'green'
    }
  })

  return <div class={style.primary}>{props.text}</div>
}
```

*Good*:
```javascript
import css from 'jss-simple'

const style = css({
  primary: {
    color: 'green'
  }
})

export default function render ({props}) {
  return <div class={style.primary}>{props.text}</div>
}
```

This means that once you've required your top-level component (which requires all of your other components, transitively), your stylesheet should be complete. So at the top of your app you can do:

```javascript
import App from 'components/app'
import {attach} from 'jss-simple'

attach()
render(<App />)
```

Or on the server:

```javascript
import App from 'components/app'
import * as jss from 'jss-simple'
import extend from 'jss-extend'
import nested from 'jss-nested'
import prefixer from 'jss-vendor-prefixer'
import camelCase from 'jss-camel-case'

const style = jss
  .use(extend)
  .use(nested)
  .use(camelCase)
  .use(prefixer)
  .toString()

export default function renderPage (args) {
  return `
    <html>
      <head>
        <style>
          ${style}
        </style>
      </head>
      <body>
        ${render(<App />, args)}
      </body>
    </html>`
}
```

## API

  * `css(obj)` - Default export. Add `obj` to the global sheet's rules.
  * `use(plugin)` - Add a jss plugin.
  * `attach()` - Attach the global sheet to the DOM.
  * `detach()` - Detach the global sheet (useful for hot reloading, etc.).
  * `toString()` - Render the global sheet and return it as a string.

## License

MIT
