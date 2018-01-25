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
    getSegments: () => segments
}