import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePositions } from "../../hooks/usePositions";

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
            <tr>
              <th>Company Name</th>
              <th>Address</th>
              <th>Work Location</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>GW Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position, index) => (
              <React.Fragment key={`positionFragment_${position.id}`}>
                <tr
                  className="hover:bg-secondary/10 cursor-pointer"
                  onClick={() =>
                    setExpandedRows((prev) => {
                      const a = [...prev];
                      a[index] = !a[index];
                      return a;
                    })
                  }
                >
                  <td>{position.company}</td>
                  <td>{position.address}</td>
                  <td>{position.workLocation}</td>
                  <td>{position.startDate}</td>
                  <td>{position.endDate}</td>
                  <td>{position.status}</td>
                  <td>{position.gwLocation}</td>
                  <td>
                    <a
                      className="btn btn-secondary hover:bg-secondary/90"
                      href={`/match/${position.id}`}
                    >
                      Select
                    </a>
                  </td>
                </tr>
                <tr className={`${expandedRows[index] ? "" : "hidden"}`}>
                  <td colSpan={7}>Show additional data here</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
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
