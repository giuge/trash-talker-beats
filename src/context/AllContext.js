import React from 'react'

import { StoreContext } from './StoreContext'
import { InterfaceContext } from './InterfaceContext'

export function withAllContext(Component) {
  return function WrapperComponent(props) {
    return (
      <StoreContext.Consumer>
        {storeState => (
          <InterfaceContext.Consumer>
            {interfaceState => (
              <Component
                {...props}
                context={{ ...storeState, ...interfaceState }}
              />
            )}
          </InterfaceContext.Consumer>
        )}
      </StoreContext.Consumer>
    )
  }
}
