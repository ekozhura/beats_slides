## Playback samples

```ts
function playSound(audioSample: AudioBuffer, startTime: number) {
    var sampler = audioCtx.createBufferSource();
    sampler.buffer = audioSample;
    sampler.connect(audioCtx.destination);
    sampler.start(startTime);
}
```