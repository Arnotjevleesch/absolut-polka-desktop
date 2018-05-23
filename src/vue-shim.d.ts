declare module "*.json" {
    const value: any;
    export default value;
}

declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}

declare module "NoteModule" {
  export interface Note {
    name: string;
    frequency: number;
    ymin: number;
    ymax: number;
  }

  export interface RootObject {
    notes: Note[];
  }
}