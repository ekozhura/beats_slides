### How to use

```ts
let bassdrumSample = Observable.fromPromise(
    loadSample('sounds/bassdrum.wav'));

let bassdrumSequence = createPattern([1,0,0,0,0,1,0], 4);

let bassdrumChannel = createChannel(
    clock, bassdrumSequence, bassdrumSample);

bassdrumChannel.subscribe(playSequence);
```