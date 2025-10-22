import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import type { components } from "../../types/api";

type Student = components["schemas"]["Student"];

export const StudentsTable = () => {
    const [searchParams] = useSearchParams();
    const positionId = searchParams.get("positionId");

    const { data, isLoading } = useSWR<{ items?: Student[] }>("/students");
    const students = useMemo(() => data?.items ?? [], [data?.items]);
    // const students = data?.items ?? [];
    const [expandedRows, setExpandedRows] = useState<boolean[]>([]);

    useEffect(() => {
        console.log("Students data:", students);
        if (!isLoading) {
            setExpandedRows(new Array(students.length).fill(false));
        }
    }, [isLoading, students]);

    return (
        <div>
            <div className="overflow-x-auto m-4">
                <table className="table table-xs table-pin-rows">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Graduation Year</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Home Address</th>
                            <th>High School ID</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <React.Fragment key={`studentFragment_${student.id}`}>
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
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.graduationYear}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.homeAddress}</td>
                                    <td>{student.highSchoolId}</td>
                                    <td>
                                        <a
                                            className="btn btn-secondary hover:bg-secondary/90"
                                            href={`/match?positionId=${positionId}&studentId=${student.id}`}
                                        >
                                            Select
                                        </a>
                                    </td>
                                </tr>
                                <tr className={`${expandedRows[index] ? "" : "hidden"}`}>
                                    <td colSpan={8}>Show additional data here</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};