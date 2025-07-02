import { AllStaff } from "../AllStaff";

import { render, screen } from "@/test-utils";

test("renders response from query", async () => {

  render(<AllStaff />);

  const staff = await screen.findAllByTestId(/card-/i);

  expect(staff).toHaveLength(4);
});
