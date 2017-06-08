### Clock as a stream

```ts
let clockStream = Observable.create(observer => {

    // put here code from slide #5 or #6

    // while () { ...
    observer.next(now);
    // ... }
});
```