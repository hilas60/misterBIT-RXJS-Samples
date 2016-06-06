const Observable = Rx.Observable;

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');

const start$ = Observable.fromEvent(startButton, 'click');
const interval$ = Observable.interval(1000);
const stop$ = Observable.fromEvent(stopButton, 'click');

const intervalThatStops$ = interval$
    .takeUntil(stop$);

const data = {count:0};
const inc = (acc)=> ({count: acc.count + 1});
const reset = (acc)=> data;

start$
    .switchMapTo(intervalThatStops$)
    .mapTo(inc)
    .startWith(data)
    .scan((acc, curr)=> {
      return curr(acc)
     })
    .subscribe((x)=> console.log(x));






