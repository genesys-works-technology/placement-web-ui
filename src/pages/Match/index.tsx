import { useParams } from "react-router-dom";
import { usePositions } from "../../hooks/usePositions";

export const MatchPage = () => {
  const { positionId: selectedPositionId, studentId: selectedStudentId } =
    useParams();

  const { positions } = usePositions();

  console.log({ selectedPositionId, selectedStudentId, positions });

  return (
    <div>
      <p>Hello</p>
    </div>
  );
};
