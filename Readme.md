
# jss-simple

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Thin wrapper around [jss](https://github.com/jsstyles/jss) that simplifies its interface and restricts you to a single, global stylesheet.

## Installation

    $ npm install jss-simple

## Usage

jss-simple is designed specifically for global, single-sheet, statically determined styles. Instead of creating stylesheets, jss-simple maintains a single stylesheet internally for you, which you can either `toString` or `attach` whenever your components have all been imported.

This means that before you call `toString/attach` all your style rules must have been added. So you must make sure that they are evaluated at import/require time - which generally means that they are in the outer-most scope of your module.  E.g.

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

Once you've required your top-level component (which requires all of your other components, transitively), your stylesheet should be complete. So at the top of your app you can do:

```javascript
import App from 'components/app'
import * as jss from 'jss-simple'

jss.attach()
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

Or with hot reloading on the client using [vdux](https://github.com/ashaffer/vdux):

```
// ...imports...
import * as jss from 'jss-simple'

jss.attach()

let hmr
domready(() => hmr = vdux({
  middleware,
  reducer,
  initialState: window.__initialState__,
  app: state => <App state={state} />
}))

if (module.hot) {
  module.hot.decline()
  module.hot.accept(['./components/app', './reducer'], () => {
    jss.detach()
    hmr.replace(require('./components/app').default, require('./reducer').default)
    jss.attach()
  })
}
```

## API

  * `css(obj)` - Default export. Add `obj` to the global sheet's rules. Returns only the `classes` property from the sheet. So you have `css({primary: {color: 'green'}}) -> {primary: <generatedClassName>}`
  * `use(plugin)` - Add a jss plugin.
  * `attach()` - Attach the global sheet to the DOM.
  * `detach()` - Detach the global sheet (useful for hot reloading, etc.).
  * `toString()` - Render the global sheet and return it as a string.

## Plugins

jss-simple just uses regular [jss plugins](https://github.com/jsstyles/jss#plugins). Nothing special here, just `.use` them as you normally would.

## License

MIT
