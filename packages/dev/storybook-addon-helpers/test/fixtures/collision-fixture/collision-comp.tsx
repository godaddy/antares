interface DefaultProps {
  /** how loud it is */
  volume?: number;
}

/** Named to clash with the story the `default.tsx` example generates. */
export function Default(props: DefaultProps) {
  return <span>{props.volume}</span>;
}
