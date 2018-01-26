import { Segmental } from '../models/segmental';
import { Suprasegmental } from '../models/suprasegmental';

const segments: Set<Segmental> = new Set();
const suprasegments: Set<Suprasegmental> = new Set<Suprasegmental>();

export const inventory = {
    getSegment: str => {
        let segment;
        segments.forEach(seg => {
            if (seg.readable === str) {
                segment = seg;
            }
        });
        if (segment) {
            return segment;
        } else {
            segment = new Segmental(str);
            segments.add(segment);
            return segment;
        }
    },
    getSegments: () => segments,
    getConsonants: () => {
        let consonants = [];
        segments.forEach(segment => segment.type === 'C' && consonants.push(segment));
        return consonants;
    },
    getVowels: () => {
        let vowels = [];
        segments.forEach(segment => segment.type === 'V' && vowels.push(segment));
        return vowels;
    },
    words: null
}