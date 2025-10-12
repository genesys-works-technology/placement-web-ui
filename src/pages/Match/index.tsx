import { useParams } from "react-router-dom";

export const MatchPage = () => {
  const { placementId: selectedPlacementId, studentId: selectedStudentId } =
    useParams();

  console.log({ selectedPlacementId, selectedStudentId });

  return (
    <div>
      <p>Hello</p>
    </div>
  );
};
