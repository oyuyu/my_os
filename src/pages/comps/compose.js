const f1 = (fn) => {
  console.log('f1');
  return fn;
};
const f2 = (fn) => {
  console.log('f2');
  return fn;
};
const f3 = (fn) => {
  console.log('f3');
  return fn;
};

const compose = (...fns) =>
  fns.reduce((pre, curr) => (...args) => {
    return pre(curr(args));
  });

compose(f1, f2, f3)(WrapComponent);
