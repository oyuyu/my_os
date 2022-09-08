export default (props: any) => {
  const { match, location, history, route, routes, children } = props;
  console.log(props);
  return (
    <div className={styles.outer}>
      <div className={styles.inner}></div>
    </div>
  );
};
