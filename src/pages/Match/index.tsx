import { useParams } from "react-router-dom";
import { PositionsTable } from "./PositionsTable";

export const MatchPage = () => {
  const { positionId: selectedPositionId, studentId: selectedStudentId } =
    useParams();

  console.log({ selectedPositionId, selectedStudentId });

  if (selectedStudentId) return <div>Confirm Match</div>;
  if (selectedPositionId) return <div>Select Student</div>;
  return <PositionsTable />;
};
