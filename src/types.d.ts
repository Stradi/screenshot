// eslint-disable-next-line @typescript-eslint/no-unused-vars
type OmitStartsWith<Set, Needle extends string> = Set extends `${Needle}${infer Rest}`
  ? never
  : Set;
