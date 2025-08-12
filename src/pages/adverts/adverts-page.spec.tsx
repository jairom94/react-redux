import { render, screen } from "@testing-library/react";
import AdvertsPage from "./adverts-page";
import RequireAuth from "../auth/require-auth";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { NotificationContext } from "../../components/ui/notification/context";

describe("Adverts Page", () => {
  const state = {
    auth: true,
    session: "test",
    adverts: {
      loaded: false,
      data: [
        {
          id: "a1",
          createdAt: "2025-08-11T18:00:00.000Z",
          name: "Bicicleta de montaña",
          sale: true,          
          price: 150.0,
          tags: ["lifestyle", "motor"],
          photo: "bicicleta.jpg",          
        },
        {
          id: "a2",
          createdAt: "2025-08-12T18:00:00.000Z",
          name: "Cámara réflex",
          sale: false,          
          price: 500.0,
          tags: ["lifestyle", "mobile"],
          photo: "camara-reflex.jpg",
        },
      ],
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
            <RequireAuth>
              <AdvertsPage />
            </RequireAuth>
          </Router>
        </NotificationContext.Provider>
      </Provider>,
    );
  test("should render adverts list", async () => {
    renderComponent();

    expect(screen.getByText("Bicicleta de montaña")).toBeInTheDocument();
    expect(screen.getByText("Cámara réflex")).toBeInTheDocument();
        
  });
});
