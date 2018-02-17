import { Segmental } from '../models/segmental';
import { Suprasegmental } from '../models/suprasegmental';
import { Tone } from '../models/tone';

const segments: Map<Segmental, number> = new Map();
// const segments: Set<Segmental> = new Set();
const suprasegments: Set<Suprasegmental> = new Set<Suprasegmental>();
const tones: Set<Tone> = new Set();
const syllableBreak: Suprasegmental = new Suprasegmental('.');
const badChars: Map<string, string> = new Map();

const sort = (a: any, b: any): number => a.instances < b.instances ? 1 : a.instances === b.instances ? 0 : -1;

export const inventory = {
    segments,
    getSegment: str => {
        let segment, numInstances;
        segments.forEach((value, seg) => {
            if (seg.readable === str) {
                numInstances = value;
                segment = seg;
            }
        });
        if (segment) {
            segments.set(segment, numInstances + 1);
            return segment;
        } else {
            segment = new Segmental(str);
            segments.set(segment, 1);
            return segment;
        }
    },
    removeSegment: segment => {
        let instances = segments.get(segment);
        if (instances > 1) {
            segments.set(segment, instances - 1);
        } else {
            segments.delete(segment);
        }
    },
    getTone: str => {
        let tone;
        tones.forEach(seg => {
            if (seg.readable === str) {
                tone = seg;
            }
        });
        if (tone) {
            return tone;
        } else {
            tone = new Tone(str);
            tones.add(tone);
            return tone;
        }
    },
    getSegments: () => segments,
    getConsonants: () => {
        let consonants = [];
        segments.forEach((instances, segment) => segment.type === 'C' && consonants.push({segment, instances}));
        return consonants.sort(sort);
    },
    getVowels: () => {
        let vowels = [];
        segments.forEach((instances, segment) => segment.type === 'V' && vowels.push({segment, instances}));
        return vowels.sort(sort);
    },
    getSyllableTemplates: function (): Map<string, number> {
        let syllableTemplates: Map<string, any> = new Map();
        let location;
        this.words.forEach(word => {
            word.syllableCVPatterns.forEach(pattern => {
                location = syllableTemplates.get(pattern.pattern);
                if (location) {
                    Object.assign(location, pattern.location)
                } else {
                    syllableTemplates.set(pattern.pattern, pattern.location);
                }
            });
        });
        return syllableTemplates;
    },
    words: null,
    syllableBreak,
    badChars
}