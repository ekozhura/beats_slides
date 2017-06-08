import { Observable } from 'rxjs';

let audioCtx = new AudioContext();
function playSound(audioSample: AudioBuffer, startTime: number) {
    var sampler = audioCtx.createBufferSource();
    sampler.buffer = audioSample;
    sampler.connect(audioCtx.destination);
    sampler.start(startTime);
}

async function loadSample(path: string): Promise<AudioBuffer> {
    let response: Response = await fetch(path, {
        method: "GET"
    });
    let audioData = await response.arrayBuffer();
    return audioCtx.decodeAudioData(audioData);
}

function playSequence([[time, currentStep], buffer]: [[number, number], AudioBuffer]) {
    if(currentStep === 1) {
        playSound(buffer, time);
    }
}

let clockStream = Observable.create(observer => {
    // borrowed from Matthew Yee-King snippet:
    var wait_time = 0.25;
    var got_up_to;
    var interval = 0.125;
    setInterval(function() {
        var now = audioCtx.currentTime;
        var max_future_time = now + (wait_time * 1.5);
        if (got_up_to > now) { 
            now = got_up_to;
        }
        while (now <= max_future_time) {
            observer.next(now);
            now += interval;
        }
        got_up_to = now;
    }, wait_time * 1000);
});

/*
let clockStream = Observable.interval(125).map(x => {
    return x * 0.125;
});*/

function createChannel(
        clock: Observable<number>, 
        sequence: Observable<number>, 
        sample: Observable<AudioBuffer>
    ): Observable<[[number, number], AudioBuffer]> {
    return clock.zip(sequence).withLatestFrom(sample);
}

function createPattern(sequence: number[], repeat = 1) {
    return Observable.from(sequence).repeat(repeat);
}

const btn = document.getElementById('start');
let click = Observable.fromEvent(btn, 'click');

let clock = click.mergeMapTo(clockStream);

let snareSample =  Observable.fromPromise(loadSample('sounds/snare.wav'));
let kickSample = Observable.fromPromise(loadSample('sounds/kick.wav'));
let hihatSample = Observable.fromPromise(loadSample('sounds/hit.wav'));

const SEQ_DURATION = 8;
let hihatSequence = createPattern([1,0,0,1,1,1,0], SEQ_DURATION);
let hihatChannel = createChannel(clock, hihatSequence, hihatSample);
hihatChannel.subscribe(playSequence);

let kickSequence = createPattern([1,0,0,0,0,1,0], SEQ_DURATION);
let kickChannel = createChannel(clock, kickSequence, kickSample)
kickChannel.subscribe(playSequence);

let snareSequence = createPattern([0,0,0,0,0,1,0], SEQ_DURATION);
let snareChannel = createChannel(clock, snareSequence, snareSample);
snareChannel.subscribe(playSequence);