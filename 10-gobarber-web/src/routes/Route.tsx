import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType; // Recebe o nome do compoente Ex: component={Dashboard}
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  /*
    Rota privata (isPrivate) | usuario logado (user) | direcionamento
             true                      true                segue
             true                      false               login
             false                     true                 dashboard
             false                     false                segue
  */

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
            }}
          />
        );
      }}
    />
  );
};

export default Route;
