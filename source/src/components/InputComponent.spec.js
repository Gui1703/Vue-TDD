import InputComponent from "./InputComponent.vue";
import { render } from "@testing-library/vue";

it("has is-invalid class for input when help is set", () => {
  const { container } = render(InputComponent, {
    props: { help: "Error message" },
  });
  const input = container.querySelector("input");
  expect(input.classList).toContain("is-invalid");
});

it("has invalid-feedback class for span when help is set", () => {
  const { container } = render(InputComponent, {
    props: { help: "Error message" },
  });
  const input = container.querySelector("span");
  expect(input.classList).toContain("invalid-feedback");
});

it("does not have is-invalid class for input when help is set", () => {
  const { container } = render(InputComponent);
  const input = container.querySelector("input");
  expect(input.classList).not.toContain("is-invalid");
});
