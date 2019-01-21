const timer = require('../');

test('timer supplies expected methods', () => {
    expect(timer).toBeFunction();
    expect(timer).toContainAllKeys([]);

    const instance = timer(null);
    expect(instance).toBeObject();
    expect(instance).toContainAllKeys(['start']);
    expect(instance.start).toBeFunction();

    const started = instance.start();
    expect(started).toBeObject();
    expect(started).toContainAllKeys(['stop', 'log', 'value']);
    expect(started.stop).toBeFunction();
    expect(started.log).toBeFunction();
    expect(started.value).toBeFunction();

    const startedLog = started.log();
    expect(startedLog).toBeObject();
    expect(startedLog).toContainAllKeys(['stop', 'log', 'value']);
    expect(startedLog.stop).toBeFunction();
    expect(startedLog.log).toBeFunction();
    expect(startedLog.value).toBeFunction();

    const startedValue = started.value();
    expect(startedValue).toBeObject();
    expect(startedValue).toContainAllKeys(['start', 'stop', 'elapsed']);
    expect(startedValue.start).toBeNumber();
    expect(startedValue.stop).toBeNumber();
    expect(startedValue.elapsed).toBeNumber();

    const stopped = started.stop();
    expect(stopped).toBeObject();
    expect(stopped).toContainAllKeys(['log', 'value']);
    expect(stopped.log).toBeFunction();
    expect(stopped.value).toBeFunction();

    const stoppedLog = stopped.log();
    expect(stoppedLog).toBeObject();
    expect(stoppedLog).toContainAllKeys(['log', 'value']);
    expect(stoppedLog.log).toBeFunction();
    expect(stoppedLog.value).toBeFunction();

    const stoppedValue = stopped.value();
    expect(stoppedValue).toBeObject();
    expect(stoppedValue).toContainAllKeys(['start', 'stop', 'elapsed']);
    expect(stoppedValue.start).toBeNumber();
    expect(stoppedValue.stop).toBeNumber();
    expect(stoppedValue.elapsed).toBeNumber();
});

const block = (ms) => {
    const start = new Date();
    var now = start;
    while (now - start < ms) {
        now = new Date();
    }
}

test('started timers can be stopped multiple times', () => {
    const instance = timer().start();

    block(7);
    const interval1 = instance.stop().value();
    block(7)
    const interval2 = instance.stop().value();

    expect(interval1.elapsed).toBe(interval1.stop - interval1.start);
    expect(interval2.elapsed).toBe(interval2.stop - interval2.start);
    expect(interval1.start).toBe(interval2.start);

    expect(interval1.elapsed).toBeWithin(6, 9);
    expect(interval2.elapsed).toBeWithin(12, 17);
});

test('logging messages are built as expected', () => {
    const log = [];
    timer(msg => log.push(msg)).start().stop().log().log('prefix:');

    expect(log).toEqual(['0 ms', 'prefix:0 ms']);
});

test('default logging does not cause errors', () => {
    timer().start().stop().log().log('prefix:');
});