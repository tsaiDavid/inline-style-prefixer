/* @flow */
import prefixProperty from '../utils/prefixProperty'
import prefixValue from '../utils/prefixValue'

import addNewValuesOnly from '../utils/addNewValuesOnly'
import isObject from '../utils/isObject'

export default function createPrefixer(
  propertyPrefixMap: Object,
  plugins: Array<Function> = []
) {
  function prefixAll(style: Object): Object {
    for (const property in style) {
      const value = style[property]

      // handle nested objects
      if (isObject(value)) {
        style[property] = prefixAll(value)
        // handle array values
      } else if (Array.isArray(value)) {
        const combinedValue = []

        for (let i = 0, len = value.length; i < len; ++i) {
          const processedValue = prefixValue(
            plugins,
            property,
            value[i],
            style,
            propertyPrefixMap
          )
          addNewValuesOnly(combinedValue, processedValue || value[i])
        }

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (combinedValue.length > 0) {
          style[property] = combinedValue
        }
      } else {
        const processedValue = prefixValue(
          plugins,
          property,
          value,
          style,
          propertyPrefixMap
        )

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (processedValue) {
          style[property] = processedValue
        }

        prefixProperty(propertyPrefixMap, property, style)
      }
    }

    return style
  }

  return prefixAll
}