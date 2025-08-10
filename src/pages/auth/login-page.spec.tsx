import { render } from "@testing-library/react";
import LoginPage from "./login-page";
import { Provider } from "react-redux";
import { NotificationContext } from "../../components/ui/notification/context";
import { Router } from "react-router";

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

  test("")
});
