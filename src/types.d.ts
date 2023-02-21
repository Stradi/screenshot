type TAspectRatio = '1:1' | '4:3' | '16:9' | '21:9';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type OmitStartsWith<Set, Needle extends string> = Set extends `${Needle}${infer Rest}` ? never : Set;
