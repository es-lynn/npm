import React from 'react'

export const withProps = <Component extends React.ElementType>(
  WrappedComponent: Component
) => <Props = {}>(
  props:
    | React.ComponentProps<Component>
    | ((
        _props: React.ComponentProps<Component> & Props
      ) => React.ComponentProps<Component>)
): React.FC<React.ComponentProps<Component> & Props> => {
  return p => {
    return React.createElement(WrappedComponent, {
      // @ts-ignore
      ...(typeof props === 'function' ? props(p) : props),
      ...p,
      style: {
        // @ts-ignore
        ...(typeof props === 'function' ? props(p).style : props.style),
        ...p.style
      }
    })
  }
}
