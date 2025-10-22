import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import { PositionsTable } from "./PositionsTable";

const fetcher = (url: string) => fetch(url).then(res => res.json());

describe("PositionsTable", () => {
    it("renders position rows", async () => {
        render(
            <SWRConfig value={{ fetcher }}>
                <MemoryRouter>
                    <PositionsTable />
                </MemoryRouter>
            </SWRConfig>
        );
        await waitFor(() => {
            expect(screen.getByText("Company 1")).toBeInTheDocument();
            expect(screen.getByText("301 Business Ave")).toBeInTheDocument();
            expect(screen.getByText("GW Location 1")).toBeInTheDocument();
        });
    });

    it("renders table headers", () => {
        render(
            <SWRConfig value={{ fetcher }}>
                <MemoryRouter>
                    <PositionsTable />
                </MemoryRouter>
            </SWRConfig>
        );
        expect(screen.getByText("Company Name")).toBeInTheDocument();
        expect(screen.getByText("Address")).toBeInTheDocument();
        expect(screen.getByText("Work Location")).toBeInTheDocument();
        expect(screen.getByText("Start Date")).toBeInTheDocument();
        expect(screen.getByText("End Date")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
    });
});