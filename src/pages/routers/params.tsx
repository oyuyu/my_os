import React from 'react';
export default (props: any) => {
  const { match, location, history, route, routes, children } = props;
  console.log(props);
  return <div>11</div>;
};
