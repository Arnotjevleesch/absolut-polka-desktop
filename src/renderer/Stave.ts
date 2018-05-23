import Vex from "vexflow";
import * as data from "./data.json";

const VF = Vex.Flow;

export default class Stave {

  private div: HTMLElement;
  private notes: any[];
  private stave: Vex.Flow.Stave;
  private context: Vex.IRenderContext;
  private numberOfNotes: number;
  private renderer: Vex.Flow.Renderer;

  constructor(div: HTMLElement, numberOfNotes: number) {
    this.div = div;
    this.numberOfNotes = numberOfNotes;
    this.notes = [];

    this.renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    this.initStave(this.numberOfNotes, true);
  }

  public initStave(numberOfNotes: number, deleteNotes: boolean) {

    this.numberOfNotes = numberOfNotes;

    if (deleteNotes) {
      this.notes = [];
    }

    // Configure the rendering context.
    this.renderer.resize(400, 200);
    this.context = this.renderer.getContext();
    this.context.setFont("Arial", 10, 1).setBackgroundFillStyle("#eed");

    this.context.clearRect(0, 0, 400, 200);

    // Create a stave of width 400 at position 0, 0 on the canvas.
    this.stave = new VF.Stave(0, 30, 400);

    // Add a clef and time signature.
    this.stave.addClef("treble").addTimeSignature(this.numberOfNotes + "/4");

    // Connect it to the rendering context and draw!
    this.stave.setContext(this.context).draw();
  }

  public drawCorrection(frequencies: number[]) {
    const playedNotes: any[] = [];

    for (const frequency of frequencies) {
      const playedNote = this.getNoteFromFrequency(frequency);
      playedNotes.push(playedNote);
    }

    let staveNotes: Vex.Flow.StaveNotes = [];
    let triplet: Vex.Flow.Tuplet = null;

    // https://fr.wikipedia.org/wiki/Mesure_(musique)#/media/File:YB0142_Mesures_simples.png
    if (this.numberOfNotes === 1) {
      staveNotes = this.createQuarters(playedNotes, 1, false);
    } else if (this.numberOfNotes === 2) {
      if (playedNotes.length === 1) {
        staveNotes = this.createHalves(playedNotes, 1, false);
      } else if (playedNotes.length === 2) {
        staveNotes = this.createQuarters(playedNotes, 2, false);
      }
    } else if (this.numberOfNotes === 3) {
      if (playedNotes.length === 1) {
        staveNotes = this.createHalves(playedNotes, 1, true);
      } else if (playedNotes.length === 2) {
        staveNotes = this.createQuarters(playedNotes, 2, true);
      } else if (playedNotes.length === 3) {
        staveNotes = this.createQuarters(playedNotes, 3, false);
      }
    } else if (this.numberOfNotes === 4) {
      if (playedNotes.length === 1) {
        staveNotes = this.createAWhole(playedNotes);
      } else if (playedNotes.length === 2) {
        staveNotes = this.createHalves(playedNotes, 2, false);
      } else if (playedNotes.length === 3) {
        staveNotes = this.createHalves(playedNotes, 3, false);
        triplet = new Vex.Flow.Tuplet(staveNotes);
      } else if (playedNotes.length === 4) {
        staveNotes = this.createQuarters(playedNotes, 4, false);
      }
    }

    // color notes
    for (const staveNote of staveNotes) {
      staveNote.setKeyStyle(0, { fillStyle: "YellowGreen ", strokeStyle: "YellowGreen" });
      staveNote.setStemStyle({ fillStyle: "YellowGreen ", strokeStyle: "YellowGreen" });
    }

    const voice = new VF.Voice({num_beats: this.numberOfNotes,  beat_value: 4});

    voice.addTickables(staveNotes);

    // Format and justify the notes to 400 pixels.
    const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

    // Render voice
    voice.draw(this.context, this.stave);

    if (triplet != null) {
      triplet.setContext(this.context).draw();
    }

    // Connect it to the rendering context and draw!
    this.stave.setContext(this.context).draw();
  }

  public drawNotes(evt) {

    if (this.notes.length === this.numberOfNotes) {
      return;
    }

    this.initStave(this.numberOfNotes, false);

    // Create a voice in numberOfNotes/4 and add above notes
    const voice = new VF.Voice({num_beats: this.numberOfNotes,  beat_value: 4});

    voice.setMode(Vex.Flow.Voice.Mode.STRICT);
    // voice.setMode(Vex.Flow.Voice.Mode.FULL);
    // voice.isComplete

    const mousePos = this.getMousePos(evt);

    const note = this.getNoteFromMouseY(mousePos.y);
    if (note !== undefined) {
      this.notes.push(note);
    }

    let staveNotes: Vex.Flow.StaveNotes = [];
    let triplet: Vex.Flow.Tuplet = null;

    // https://fr.wikipedia.org/wiki/Mesure_(musique)#/media/File:YB0142_Mesures_simples.png
    if (this.numberOfNotes === 1) {
      staveNotes = this.createQuarters(this.notes, 1, false);
    } else if (this.numberOfNotes === 2) {
      if (this.notes.length === 1) {
        staveNotes = this.createHalves(this.notes, 1, false);
      } else if (this.notes.length === 2) {
        staveNotes = this.createQuarters(this.notes, 2, false);
      }
    } else if (this.numberOfNotes === 3) {
      if (this.notes.length === 1) {
        staveNotes = this.createHalves(this.notes, 1, true);
      } else if (this.notes.length === 2) {
        staveNotes = this.createQuarters(this.notes, 2, true);
      } else if (this.notes.length === 3) {
        staveNotes = this.createQuarters(this.notes, 3, false);
      }
    } else if (this.numberOfNotes === 4) {
      if (this.notes.length === 1) {
        staveNotes = this.createAWhole(this.notes);
      } else if (this.notes.length === 2) {
        staveNotes = this.createHalves(this.notes, 2, false);
      } else if (this.notes.length === 3) {
        staveNotes = this.createHalves(this.notes, 3, false);
        triplet = new Vex.Flow.Tuplet(staveNotes);
      } else if (this.notes.length === 4) {
        staveNotes = this.createQuarters(this.notes, 4, false);
      }
    }

    voice.addTickables(staveNotes);

    // Format and justify the notes to 400 pixels.
    const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

    // Render voice
    voice.draw(this.context, this.stave);

    if (triplet != null) {
      triplet.setContext(this.context).draw();
    }

    // Connect it to the rendering context and draw!
    this.stave.setContext(this.context).draw();
  }

  private getMousePos(evt: MouseEvent) {
    const rect = this.div.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }

  private getNoteFromMouseY(yPosition: number) {
    const notesTab = (data as any).notes;

    for (const noteTab of notesTab) {
      if (noteTab.ymax % 10 === 8) {
        if (yPosition <= noteTab.ymax && yPosition >= noteTab.ymin) {
          return noteTab;
        }
      } else {
        if (yPosition < noteTab.ymax && yPosition > noteTab.ymin) {
          return noteTab;
        }
      }
    }
  }

  private getNoteFromFrequency(frequency: number) {
    const notesTab = (data as any).notes;

    for (const noteTab of notesTab) {
      if (noteTab.frequency === frequency) {
        return noteTab;
      }
    }
  }

/*
  private yPosition2NoteString(yPosition: number) {
    if (yPosition < 102 && yPosition > 98) {
      return "A/3";
    } else if (yPosition <= 98 && yPosition >= 92) {
      return "B/3";
    } else if (yPosition < 92 && yPosition > 88) {
      return "C/4";
    } else if (yPosition <= 88 && yPosition >= 82) {
      return "D/4";
    } else if (yPosition < 82 && yPosition > 78) {
      return "E/4";
    } else if (yPosition <= 78 && yPosition >= 72) {
      return "F/4";
    } else if (yPosition < 72 && yPosition > 68) {
      return "G/4";
    } else if (yPosition <= 68 && yPosition >= 62) {
      return "A/4";
    } else if (yPosition < 62 && yPosition > 58) {
      return "B/4";
    } else if (yPosition <= 58 && yPosition >= 52) {
      return "C/5";
    } else if (yPosition < 52 && yPosition > 48) {
      return "D/5";
    } else if (yPosition <= 48 && yPosition >= 42) {
      return "E/5";
    } else if (yPosition < 42 && yPosition > 38) {
      return "F/5";
    } else if (yPosition <= 38 && yPosition >= 32) {
      return "G/5";
    } else if (yPosition < 32 && yPosition > 28) {
      return "A/5";
    } else if (yPosition <= 28 && yPosition >= 22) {
      return "B/5";
    } else if (yPosition < 22 && yPosition > 18) {
      return "C/6";
    }
    return null;
  }
*/

  // q = noire = quarter
  private createQuarters(notes, numberOfQuarter: number, dotted: boolean) {
    const staveNotes: Vex.Flow.StaveNotes = [];

    for (let i = 0; i < numberOfQuarter; i++) {
      if (dotted) {
        staveNotes.push(new VF.StaveNote({clef: "treble", keys: [notes[i].name], duration: "qd" }).addDot(0));
      } else {
        staveNotes.push(new VF.StaveNote({clef: "treble", keys: [notes[i].name], duration: "q" }));
      }
    }
    return staveNotes;
  }

  // h = blanche = half
  private createHalves(notes, numberOfHalf: number, dotted: boolean) {
    const staveNotes: Vex.Flow.StaveNotes = [];

    for (let i = 0; i < numberOfHalf; i++) {
      if (dotted) {
        staveNotes.push(new VF.StaveNote({clef: "treble", keys: [notes[i].name], duration: "hd" }).addDot(0));
      } else {
        staveNotes.push(new VF.StaveNote({clef: "treble", keys: [notes[i].name], duration: "h" }));
      }
    }
    return staveNotes;
  }

  // w = ronde = whole
  private createAWhole(notes) {
    const staveNotes: Vex.Flow.StaveNotes = [];
    staveNotes.push(new VF.StaveNote({clef: "treble", keys: [notes[0].name], duration: "w" }));
    return staveNotes;
  }
}
