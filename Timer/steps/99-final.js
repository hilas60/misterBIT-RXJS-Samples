

const Observable = Rx.Observable;

const startButton       = document.querySelector('#start');
const halfButton        = document.querySelector('#half');
const quarterButton     = document.querySelector('#quarter');
const stopButton        = document.querySelector('#stop');
const resetButton       = document.querySelector('#reset');

const start$    = Observable.fromEvent(startButton, 'click');
const half$     = Observable.fromEvent(halfButton, 'click');
const quarter$  = Observable.fromEvent(quarterButton, 'click');
const stop$     = Observable.fromEvent(stopButton, 'click');
const reset$    = Observable.fromEvent(resetButton, 'click');



const data = {count:0};
const inc = (acc)=> ({count: acc.count + 1});
const reset = (acc)=> data;

const starters$ = Observable.merge(
    start$.mapTo(1000),
    half$.mapTo(500),
    quarter$.mapTo(250)
);

const intervalActions = (time)=> Observable.merge(
                                                    Observable.interval(time)
                                                        .takeUntil(stop$).mapTo(inc),
                                                    reset$.mapTo(reset)
                                  );

starters$
    .switchMap(intervalActions)
    .startWith(data)
    .scan((acc, curr)=> curr(acc))
    .subscribe((x)=> document.querySelector('#output').innerHTML=x.count);









