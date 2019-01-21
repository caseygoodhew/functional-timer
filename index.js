const startCommand = (logger, start) => {
    const _stop = () => {
        return stopCommand(logger, start, new Date());
    };

    return {
        stop: _stop,
        log: (msg) => {
            const instance = _stop();
            instance.log(msg);
            return startCommand(logger, start);
        },
        value: () => {
            const instance = _stop();
            return instance.value();
        }
    }
}

const stopCommand = (logger, start, stop) => {
    return {
        log: (msg) => {
            logger(`${msg||''}${stop-start} ms`);
            return stopCommand(logger, start, stop);
        },
        value: () => {
            return {
                start: start.valueOf(),
                stop: stop.valueOf(),
                elapsed: stop - start
            };
        }
    }
}

const getLogger = (logger) => {
    switch (typeof logger) {
        case 'undefined':
            return (...args) => console.log(...args);

        case 'function':
            return logger;

        default:
            return () => {}
    }
}

module.exports = (logger) => {
    return {
        start: () => {
            return startCommand(getLogger(logger), new Date());
        }
    }
}