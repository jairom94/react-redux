import { render,screen } from "@testing-library/react";
import SignPage from "./signup-page";
import { Router } from "react-router";
import { NotificationContext } from "../../components/ui/notification/context";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

import { authSignup } from "../../store/actions"
vi.mock("../../store/actions")
describe("SignupPage", () => {
  const state = {
    auth: false,
    session: "",
    adverts: {
      loaded: false,
      data: [],
    },
    tags: [],
    filters: {
      name: "",
      tags: [],
      price: [0, 0],
      range: [0, 0],
    },
    ui: {
      pending: false,
      error: null,
    },
    modal: {
      data: null,
      type: "",
      visible: false,
    },
  };
  const renderComponent = () =>
    render(
      <Provider
        store={{
          getState: () => state,
          // @ts-expect-error: we only need to mock the methods we use
          subscribe: () => {},
          // @ts-expect-error: we only need to mock the methods we use
          dispatch: () => {},
        }}
      >
        <NotificationContext.Provider value={{ addNoti: vi.fn() }}>
          <Router
            navigator={{
              createHref: () => "",
              go: () => {},
              push: () => {},
              replace: () => {},
            }}
            location={{ pathname: "" }}
          >
            <SignPage />
          </Router>
        </NotificationContext.Provider>
      </Provider>,
    );
  test("should render correctly", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("should dispatch authSignup",async ()=>{
    renderComponent();
    // const name = screen.getByLabelText("Nombres");
    // const username = screen.getByLabelText("Nombre de usuario");
    // const email = screen.getByLabelText("E-mail");
    // const password = screen.getByLabelText("Contraseña");
    const submit = screen.getByRole("button", { name: /enviar/i });

    await userEvent.click(submit)
    expect(authSignup).toHaveBeenCalledWith({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  })
});
