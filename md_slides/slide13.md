### Combine everything in a stream

```ts
function createChannel(
        clock: Observable<number>, 
        sequence: Observable<number>, 
        sample: Observable<AudioBuffer>
    ): Observable<[[number, number], AudioBuffer]> {
    return clock.zip(sequence).withLatestFrom(sample);
}
```