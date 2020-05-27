import mongoose from 'mongoose';

export declare interface Stats { 
  position: Array<number>;
  hunger: number;
  thirst: number;
}

export declare interface Components { 
  shapeFirst: number,
  shapeSecond: number,
  shapeThird: number,
  skinFirst: number,
  skinSecond: number,
  skinThird: number,
  shapeMix: number,
  skinMix: number,
  thirdMix: number,
  eyeColor: number,
  hairColor: number,
  hightlightColor: number,
  hairStyle: number
}

export interface Character extends mongoose.Document {
  serial: string;
  socialClub: string;
  name: string;
  gender: number;
  age: number;
  money: number;
  stats: Stats;
  components: Components;
}

export const CharacterSchema = new mongoose.Schema({
  serial: { type: String, required: true },
  socialClub: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: Boolean, required: true },
  age: { type: Number, default: 17 },
  money: { type: Number, default: 0 },
  stats: { type: Object},
  components: { type: Object}
}, {
  timestamps: true,
});


const Character = mongoose.model<Character>('Character', CharacterSchema);
export default Character;
