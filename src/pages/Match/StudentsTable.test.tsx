import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import { StudentsTable } from "./StudentsTable";

const fetcher = (url: string) => fetch(url).then(res => res.json());

describe("StudentsTable", () => {
    it("renders student rows", async () => {
        render(
            <SWRConfig value={{ fetcher }}>
                <MemoryRouter>
                    <StudentsTable />
                </MemoryRouter>
            </SWRConfig>);
        await waitFor(() => {
            expect(screen.getByText("Student1")).toBeInTheDocument();
            expect(screen.getByText("Last1")).toBeInTheDocument();
        });
    });

    it("renders table headers", () => {
        render(
            <SWRConfig value={{ fetcher }}>
                <MemoryRouter>
                    <StudentsTable />
                </MemoryRouter>
            </SWRConfig>
        );
        expect(screen.getByText("First Name")).toBeInTheDocument();
        expect(screen.getByText("Last Name")).toBeInTheDocument();
        expect(screen.getByText("Graduation Year")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Phone")).toBeInTheDocument();
        expect(screen.getByText("Home Address")).toBeInTheDocument();
        expect(screen.getByText("High School ID")).toBeInTheDocument();
    });
});