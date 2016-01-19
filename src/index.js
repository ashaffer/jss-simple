/**
 * Imports
 */

import {create} from 'jss'

/**
 * Constants
 */

const jss = create()
const sheets = []

/**
 * JSS Simple
 */

function css (style) {
  const sheet = jss.createStyleSheet(style)
  sheets.push(sheet)
  return sheet.classes
}

function use (plugin) {
  jss.use(plugin)
  return {use, toString, attach}
}

function toString () {
  return sheets.map(sheet => sheet.toString()).join('\n')
}

function attach () {
  return sheets.forEach(sheet => sheet.attach())
}

function detach () {
  return sheets.forEach(sheet => sheet.detach())
}

/**
 * Exports
 */

export default css
export {
  use,
  toString,
  attach,
  detach
}
