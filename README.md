# functional-timer

Simple timer / stopwatch function that can be used to collect or log timing metrics. 

```javascript
const timer = require('functional-timer');

const instance = timer().start();

// do something

instance.log('Current time since started: ');

// do something else

instance.stop().log('Finished in: ');
```
