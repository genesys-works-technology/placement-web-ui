import { useSearchParams } from "react-router-dom";
import { PositionsTable } from "./PositionsTable";
import { StudentsTable } from "./StudentsTable";

export const MatchPage = () => {
  const [searchParams] = useSearchParams();
  const selectedPositionId = searchParams.get("positionId");
  const selectedStudentId = searchParams.get("studentId");

  console.log({ selectedPositionId, selectedStudentId });

  if (selectedStudentId && selectedPositionId) return <div>Confirm Match</div>;
  if (selectedPositionId) return <StudentsTable />;
  return <PositionsTable />;
};
