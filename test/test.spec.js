const expect = require('chai').expect;
const timer = require('../');

describe('functional timer', () => {
    it('timer supplies expected methods', () => {
        expect(timer).to.be.a('function');

        const instance = timer(null);
        expect(instance).to.be.an('object');
        expect(instance).to.contain.all.keys(['start']);
        expect(instance.start).to.be.a('function');

        const started = instance.start();
        expect(started).to.be.an('object');
        expect(started).to.contain.all.keys(['stop', 'log', 'value']);
        expect(started.stop).to.be.a('function');
        expect(started.log).to.be.a('function');
        expect(started.value).to.be.a('function');

        const startedLog = started.log();
        expect(startedLog).to.be.an('object');
        expect(startedLog).to.contain.all.keys(['stop', 'log', 'value']);
        expect(startedLog.stop).to.be.a('function');
        expect(startedLog.log).to.be.a('function');
        expect(startedLog.value).to.be.a('function');

        const startedValue = started.value();
        expect(startedValue).to.be.an('object');
        expect(startedValue).to.contain.all.keys(['start', 'stop', 'elapsed']);
        expect(startedValue.start).to.be.a('number');
        expect(startedValue.stop).to.be.a('number');
        expect(startedValue.elapsed).to.be.a('number');

        const stopped = started.stop();
        expect(stopped).to.be.an('object');
        expect(stopped).to.contain.all.keys(['log', 'value']);
        expect(stopped.log).to.be.a('function');
        expect(stopped.value).to.be.a('function');

        const stoppedLog = stopped.log();
        expect(stoppedLog).to.be.an('object');
        expect(stoppedLog).to.contain.all.keys(['log', 'value']);
        expect(stoppedLog.log).to.be.a('function');
        expect(stoppedLog.value).to.be.a('function');

        const stoppedValue = stopped.value();
        expect(stoppedValue).to.be.an('object');
        expect(stoppedValue).to.contain.all.keys(['start', 'stop', 'elapsed']);
        expect(stoppedValue.start).to.be.a('number');
        expect(stoppedValue.stop).to.be.a('number');
        expect(stoppedValue.elapsed).to.be.a('number');
    });

    const block = (ms) => {
        const start = new Date();
        var now = start;
        while (now - start < ms) {
            now = new Date();
        }
    }

    it('started timers can be stopped multiple times', () => {
        const instance = timer().start();

        block(7);
        const interval1 = instance.stop().value();
        block(7)
        const interval2 = instance.stop().value();

        expect(interval1.elapsed).to.equal(interval1.stop - interval1.start);
        expect(interval2.elapsed).to.equal(interval2.stop - interval2.start);
        expect(interval1.start).to.equal(interval2.start);

        expect(interval1.elapsed).to.within(6, 9);
        expect(interval2.elapsed).to.within(12, 17);
    });

    it('logging messages are built as expected', () => {
        const log = [];
        timer(msg => log.push(msg)).start().stop().log().log('prefix:');

        expect(log).to.deep.equal(['0 ms', 'prefix:0 ms']);
    });

    it('default logging does not cause errors', () => {
        timer().start().stop().log().log('prefix:');
    });

})