### Sequence as a stream:

```ts
function createPattern(sequence: number[], repeat = 1) {
    return Observable.from(sequence).repeat(repeat);
}

createPattern([1,0,0,0,1], 4);
```