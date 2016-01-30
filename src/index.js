/**
 * Imports
 */

import {create} from 'jss'

/**
 * Constants
 */

const jss = create()
let sheets = []
let map = {}

/**
 * JSS Simple
 */

function css (style, opts, key) {
  if ('string' === typeof opts) {
    key = opts
    opts = undefined
  }

  const sheet = jss.createStyleSheet(style, opts)

  if (key !== undefined) {
    if (map[key] !== undefined) {
      sheets[map[key]] = sheet
      return sheet.classes
    }

    map[key] = sheets.length
  }

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

function clear () {
  sheets = []
  map = {}
}

/**
 * Exports
 */

export default css
export {
  use,
  toString,
  attach,
  detach,
  clear
}
