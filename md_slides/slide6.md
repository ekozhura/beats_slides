## Precise timing clocks

```ts
  const wait_time = 0.25;
  let got_up_to;
  const interval = 0.125;
  setInterval(function() {
      let now = audioCtx.currentTime;
      let max_future_time = now + (wait_time * 1.5);
      if (got_up_to > now) now = got_up_to;
      while (now <= max_future_time) {
          playSound(buffer, time);
          now += interval;
      }
      got_up_to = now;
  }, wait_time * 1000);
```
_(borrowed from Matthew Yee-King snippet)_