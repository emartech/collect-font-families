import * as test from 'tape';

export const singleTest = (description: string, fn: (t: test.Test) => void) => {
  test(description, (t: test.Test) => {
    fn(t);
    t.end();
  });
};
