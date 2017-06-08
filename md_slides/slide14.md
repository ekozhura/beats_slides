### Subscribe for playback

```ts
function playSequence(time, currentStep, buffer) {
    if(currentStep === 1) {
        playSound(buffer, time);
    }
}

channel.subscribe(playSequence);
```