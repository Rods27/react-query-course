interface IPerson {
  readonly name: string;
  readonly hairColor: string;
  readonly eyeColor: string;
}

export function Person({ name, hairColor, eyeColor }: IPerson) {
  return (
    <li>
      {name}
      <ul>
        <li>hair: {hairColor}</li>
        <li>eyes: {eyeColor}</li>
      </ul>
    </li>
  );
}
