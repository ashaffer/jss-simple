/**
 * Imports
 */

import {create} from 'jss'

/**
 * Constants
 */

const jss = create()
const sheet = jss.createStyleSheet()

/**
 * JSS Simple
 */

function css (style) {
  return sheet.addRule(style).classes
}

function use (plugin) {
  jss.use(plugin)
  return {use, toString, attach}
}

function toString () {
  return sheet.toString()
}

function attach () {
  return sheet.attach()
}

/**
 * Exports
 */

export default css
export {
  use,
  toString,
  attach
}
