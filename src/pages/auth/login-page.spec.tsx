import { render,screen } from "@testing-library/react";
import LoginPage from "./login-page";
import { Provider } from "react-redux";
import { NotificationContext } from "../../components/ui/notification/context";
import { Router } from "react-router";
import userEvent from "@testing-library/user-event";

import { authLogin } from "../../store/actions"
vi.mock("../../store/actions")

describe("LoginPage", () => {
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
            <Router navigator={{createHref:()=>'',go:()=>{},push:()=>{},replace:()=>{}}} 
            location={{ pathname: "" }}>
                <LoginPage />
            </Router>
        </NotificationContext.Provider>
      </Provider>,
    );
  test("should render correctly", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("should dispatch authLogin",async ()=>{
    renderComponent();
    const email = screen.getByLabelText("E-mail")
    const password = screen.getByLabelText("Contraseña");
    const submit = screen.getByRole("button", { name: /enviar/i });
    
    await userEvent.type(email,'jairo@mail.com')
    await userEvent.type(password,'1234')
    
    await userEvent.click(submit)

    expect(authLogin).toHaveBeenCalledWith({
      email: "jairo@mail.com",
      password: "1234",
      remember: false,
    });
  })
});
