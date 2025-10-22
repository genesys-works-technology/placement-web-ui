import { render, screen, waitFor } from "@testing-library/react";
import { StudentsTable } from "./StudentsTable";
import { MemoryRouter } from "react-router-dom";
import { SWRConfig } from "swr";

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
        }, { timeout: 10000 });
    });
});