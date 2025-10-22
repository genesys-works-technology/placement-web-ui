import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import { MatchPage } from "./index";

// Provide a fetcher for SWR
const fetcher = (url: string) => fetch(url).then(res => res.json());

describe("MatchPage navigation", () => {
    it("renders positions table by default", async () => {
        render(
            <SWRConfig value={{ fetcher }}>
                <MemoryRouter initialEntries={["/match"]}>
                    <MatchPage />
                </MemoryRouter>
            </SWRConfig>
        );
        await waitFor(() => {
            expect(screen.getByText("Company Name")).toBeInTheDocument();
            expect(screen.getByText("Company 1")).toBeInTheDocument();
        });
    });

    it("renders students table when positionId is selected", async () => {
        render(
            <SWRConfig value={{ fetcher }}>
                <MemoryRouter initialEntries={["/match?positionId=1"]}>
                    <MatchPage />
                </MemoryRouter>
            </SWRConfig>
        );
        await waitFor(() => {
            expect(screen.getByText("First Name")).toBeInTheDocument();
            expect(screen.getByText("Student1")).toBeInTheDocument();
        });
    });

    it("renders confirmation page when both positionId and studentId are present", () => {
        render(
            <SWRConfig value={{ fetcher }}>
                <MemoryRouter initialEntries={["/match?positionId=1&studentId=1"]}>
                    <MatchPage />
                </MemoryRouter>
            </SWRConfig>
        );
        expect(screen.getByText("Confirm Match")).toBeInTheDocument();
    });
});