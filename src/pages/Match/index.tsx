import { useParams } from "react-router-dom";
import { usePositions } from "../../hooks/usePositions";
import { useEffect, useState } from "react";

const PositionsTable = () => {
  const { positions } = usePositions();
  const [expandedRows, setExpandedRows] = useState<boolean[]>([]);

  useEffect(() => {
    setExpandedRows(new Array(positions.length).fill(false));
  }, [positions]);
  return (
    <div>
      <div className="overflow-x-auto m-4">
        <table className="table table-xs table-pin-rows">
          <thead>
            <th>Company Name</th>
            <th>Address</th>
            <th>Work Location</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>GW Location</th>
            <th></th>
          </thead>
          {positions.map((position, index) => (
            <>
              <tr
                key={`positionRow_${position.id}`}
                className="hover:bg-secondary/10 cursor-pointer"
                onClick={() =>
                  setExpandedRows((prev) => {
                    const a = [...prev];
                    a[index] = !a[index];
                    return a;
                  })
                }
              >
                <th>{position.company}</th>
                <td>{position.address}</td>
                <td>{position.workLocation}</td>
                <td>{position.startDate}</td>
                <td>{position.endDate}</td>
                <td>{position.status}</td>
                <td>{position.gwLocation}</td>
                <td>
                  <a
                    className="btn btn-secondary"
                    href={`/match/${position.id}`}
                  >
                    Select
                  </a>
                </td>
              </tr>
              <tr className={`${expandedRows[index] ? "" : "hidden"}`}>
                <td colSpan={7}>Hello</td>
              </tr>
            </>
          ))}
        </table>
      </div>
    </div>
  );
};

export const MatchPage = () => {
  const { positionId: selectedPositionId, studentId: selectedStudentId } =
    useParams();

  console.log({ selectedPositionId, selectedStudentId });

  if (selectedStudentId) return <div>Confirm Match</div>;
  if (selectedPositionId) return <div>Select Student</div>;
  return <PositionsTable />;
};
