import routes from '../../config/router';

export default () => {
  const routerData = routes.map(({ routes }) => routes);

  return { routes: routerData };
};
