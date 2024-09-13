interface Props {
  json: object | undefined | null;
}

/** tHOS CPMPONENT IS MAILY FOR TETING PERPOSES AS IT SHOWS THE THE JSON OBJECT ON THE SCREEN IN A VISUALLY PLEASING WAY */

export default function JsonView({ json }: Props) {
  return (
    <>
      <div>
        <div>{JSON.stringify(json, null, 2)}</div>
      </div>
    </>
  );
}
