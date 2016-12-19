const alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple'
}

const alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
}

export default function flexboxOld(property, value, style) {
  if (property === 'flexDirection' && typeof value === 'string') {
    style.WebkitBoxOrient = value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
    style.WebkitBoxDirection = value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
  }
  if (alternativeProps[property]) {
    style[alternativeProps[property]] = alternativeValues[value] || value
  }
}
