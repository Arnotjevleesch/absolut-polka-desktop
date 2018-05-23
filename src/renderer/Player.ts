import * as data from "./data.json";

export default class Player {

    private ctx: AudioContext;
    private frequencies: number[] = [];

    constructor() {
        this.ctx = new AudioContext();
    }

    // https://www.itrust.fr/la-programmation-asynchrone-javascript/
    public async play(numberOfNotes) {

        this.frequencies = this.pullFrequencies(numberOfNotes);

        for (const frequency of this.frequencies) {
            await this.playNote(frequency);
        }
        // play(440).then(result => { console.log(result) ; });
        // play(440).then(result => { play(293.7); });
        // play(440).then(() => { play(370).then(() => { play(293.7); }) });
    }

    private playNote(frequency) {

        let osc: OscillatorNode;

        /*
        if(osc == null) {
            osc = ctx.createOscillator();
            osc.frequency.value = frequency;
            osc.start(ctx.currentTime);
            osc.connect(ctx.destination);

            beepPlayButton.disabled = true
        }
        */

        return new Promise((resolve, reject) => {

            // https://www.keithmcmillen.com/blog/making-music-in-the-browser-web-audio-api-part-1/
            // https://www.sitepoint.com/web-audio-api-add-sound-to-web-page/
            // http://alemangui.github.io/blog//2015/12/26/ramp-to-value.html

            osc = this.ctx.createOscillator();
            osc.frequency.value = frequency;
            const  g = this.ctx.createGain();
            osc.connect(g);
            g.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime);

            g.gain.setValueAtTime(g.gain.value, this.ctx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + 2);

            window.setTimeout( () => {
                resolve();
            }, 500);
        });

    }

    // On renvoie un nombre aléatoire entre une valeur min (incluse)
    // et une valeur max (exclue)
    private getRandomArbitrary(min, max) {
        return parseInt(Math.random() * (max - min) + min, 0);
    }

    private pullFrequencies(nb) {

        const notesTab = (data as any).notes;
        // const note0: NoteModule.Note = notesTab[0];

        const frequencies: number[] = [];

        while (frequencies.length < nb) {
            const pullI = this.getRandomArbitrary(0, notesTab.length - 1);
            const pullNoteFrequency = notesTab[pullI].frequency;

            // if(res.indexOf(pullNote) == -1) {
            frequencies.push(pullNoteFrequency);
            // }
        }

        return frequencies;

    }

}
