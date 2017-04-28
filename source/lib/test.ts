import * as test from 'tape';

export function singleTest(description: string, fn: (t: test.Test) => void) {
  test(description, (t: test.Test) => {
    fn(t);
    t.end();
  });
};
