import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useModalStore } from "../../store/modal";
import { useUserStore } from "../../store/user";
import Form from "./index";

const mockUser = vi.fn();

vi.mock("../../store/modal", () => ({
    useModalStore: vi.fn(() => ({
        modalType: "Add",
        idUser: null,
        firstName: "",
        lastName: "",
        toggleModal: vi.fn(),
        clearForm: vi.fn(),
    })),
}));

vi.mock("../../store/user", () => ({
    useUserStore: vi.fn(() => ({
        addUser: mockUser,
        editUser: mockUser,
    })),
}));

describe("Form", () => {
    beforeEach(() => {
        mockUser.mockClear();
    });
    it("deve permitir preencher os campos", async () => {
        render(<Form type="Add" id='0' />);

        const nomeInput = screen.getByTestId("FirstName");
        const sobrenomeInput = screen.getByTestId("LastName");

        await userEvent.type(nomeInput, "João");
        await userEvent.type(sobrenomeInput, "Silva");

        expect(nomeInput).toHaveValue("João");
        expect(sobrenomeInput).toHaveValue("Silva");
    });

    it("deve exibir mensagens de erro ao submeter sem preencher", async () => {
        render(<Form type="Add" id={null} />);

        const submitButton = screen.getByRole("button", { name: "Enviar" });
        await userEvent.click(submitButton);

        expect(screen.getByText("Nome é obrigatório")).toBeInTheDocument();
        expect(screen.getByText("Sobrenome é obrigatório")).toBeInTheDocument();
    });

    it("deve chamar addUser ao submeter um novo usuário", async () => {
        render(<Form type="Add" id={null} />);

        const nomeInput = screen.getByTestId("FirstName");
        const sobrenomeInput = screen.getByTestId("LastName");
        const submitButton = screen.getByRole("button", { name: "Enviar" });

        await userEvent.type(nomeInput, "Carlos");
        await userEvent.type(sobrenomeInput, "Santos");
        await userEvent.click(submitButton);

        expect(mockUser).toHaveBeenCalledTimes(1);
        expect(mockUser).toHaveBeenCalledWith("Carlos", "Santos");
    });

    it("deve chamar editUser ao submeter um formulário de edição", async () => {
        render(<Form type="Edit" id={1} />);

        const nomeInput = screen.getByTestId("FirstName");
        const sobrenomeInput = screen.getByTestId("LastName");
        const submitButton = screen.getByRole("button", { name: "Enviar" });

        await userEvent.clear(nomeInput);
        await userEvent.clear(sobrenomeInput);
        await userEvent.type(nomeInput, "Ana");
        await userEvent.type(sobrenomeInput, "Pereira");
        await userEvent.click(submitButton);

        expect(mockUser).toHaveBeenCalledTimes(1);
        expect(mockUser).toHaveBeenCalledWith("Ana", "Pereira");
    });
});