import test from 'tape';
import Substitute from './substitute';

const target = {
  prop1: 'one',
  function1() { return 1; },
};

test('Substitute property handling', (t) => {
  let subject = Substitute(target);
  t.notEqual(subject.prop1, 'one', 'Substitute does not forward property to target.');

  subject = Substitute(target, { prop1: 'two' });
  t.equals(subject.prop1, 'two', 'Substitute returns getter value from passed options.');

  subject.prop1 = 'three';
  t.assert(subject.$set.prop1, 'Substitute records telemetry on property setters.');
  t.equals(subject.$set.prop1[0], 'three', 'Substitute records telemetry for setter value.');

  t.end();
});


test('Substitute function handling', (t) => {
  let subject = Substitute(target);
  subject.function1('one', 'two');
  t.notEqual(subject.function1, 1, 'Substitute does not forward function to target.');
  t.assert(subject.$called.function1, 'Substitute records telemetry on function calls.');
  t.deepEquals(subject.$called.function1[0], ['one', 'two'], 'Substitute records telemetry on function call arguments.');

  subject = Substitute(target, { function1() { return 'fake'; } });
  t.equals(subject.function1(), 'fake', 'Substitute function return can be configured.');

  t.end();
});
