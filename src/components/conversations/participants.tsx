type ParticipantsProps = {
  participants: string[] | undefined;
};

const ParticipantsComponent = ({ participants }: ParticipantsProps) => {
  return (
    <>
      {participants ? (
        <ul className="flex space-x-1">
          {participants.map((participant: string, index: number) => (
            <li key={participant}>
              <span className="font-bold">
                {participant}
                {index !== participants.length - 1 && <span>,</span>}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <span className="font-bold">Me</span>
      )}
    </>
  )
};

export default ParticipantsComponent;
