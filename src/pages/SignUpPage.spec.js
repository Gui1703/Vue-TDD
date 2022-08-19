import SignUpPage from "./SignUpPage.vue";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event"

describe("Sign Up Page", () => {
    describe("Layout", () => {
        it("has Sign Up Header", () => {
            render(SignUpPage);
            const header = screen.queryByRole("heading", { name: "Sign Up" });
            expect(header).not.toBeNull();
        });

        it('has username input', () => {
            render(SignUpPage);
            const input = screen.queryByLabelText('Username')
            expect(input).not.toBeNull()
        })

        it('has email input', () => {
            render(SignUpPage);
            const input = screen.queryByLabelText('E-mail')
            expect(input).not.toBeNull()
        })

        it('has password input', () => {
            render(SignUpPage);
            const input = screen.queryByLabelText('Password')
            expect(input).not.toBeNull()
        })

        it('has password type for password input', () => {
            render(SignUpPage);
            const input = screen.queryByLabelText('Password')
            expect(input.type).toBe("password")
        })

        it('has password repeat input', () => {
            render(SignUpPage);
            const input = screen.queryByLabelText('Password Repeat')
            expect(input).not.toBeNull()
        })

        it('has password type for password repeat input', () => {
            render(SignUpPage);
            const input = screen.queryByLabelText('Password Repeat')
            expect(input.type).toBe("password")
        })

        it("has Sign Up Button", () => {
            render(SignUpPage);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).not.toBeNull();
        });

        it("disables the button initially", () => {
            render(SignUpPage);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeDisabled;
        });
    });

    describe('Interactions', () => {
        it('enables the button when the password and password repeat fields have same values', async () => {
            render(SignUpPage);
            const passwordInput = screen.queryByLabelText('Password')
            const passwordRepeatInput = screen.queryByLabelText('Password Repeat')
            await userEvent.type(passwordInput, "P4ssword")
            await userEvent.type(passwordRepeatInput, "P4ssword")
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeEnabled;
        })
    })

});
