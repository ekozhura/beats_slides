## Load samples

```ts
async function loadSample(path) {
    let response = await fetch(path, {
        method: "GET"
    });
    let audioData = await response.arrayBuffer();
    return audioCtx.decodeAudioData(audioData);
}
```