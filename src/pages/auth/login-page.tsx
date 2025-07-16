import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import FormField from "../../components/ui/form-field";
import type { Login } from "./types";
import ButtonCustom from "../../components/ui/button";
import { AxiosError } from "axios";
import { LogIn } from "./service";
import LoginLoader from "../../components/ui/login-loader";
import { useAuth } from "./context";
import { useLocation, useNavigate } from "react-router";
import { useUserInformation } from "./me/context";
// import useNotifications from "../../components/ui/notification/useNotifications";
// import Notfications from "../../components/ui/notification/notifications";
import { useNotification } from "../../components/ui/notification/context";

const LoginPage = () => {
  const [credentials, setCredentials] = useState<Login>({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const { isLogged, onLogin } = useAuth();
  const { onUserLogged } = useUserInformation();
  const [isLoading,setIsLoading] = useState(false);  

  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = credentials;

  const { addNoti } = useNotification()
  // const { notifications,addNoti,handleNotifications } = useNotifications()

  useEffect(() => {
    if (isLogged) {
      navigate("/", { replace: true });
    }
  }, [isLogged,navigate]);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      //   setIsLogin(true);
      setIsLoading(true)
      await LogIn({ email, password }, rememberMe);
      onLogin();
      onUserLogged();      
      addNoti({
        message:'Login success',
        id:crypto.randomUUID(),
        type:'success',
        createdAt:Date.now()
      })
      const to = location.state?.from ?? "/";
      navigate(to, { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {        
        addNoti({
          message:`${error.response?.data.message} - ${error.response?.data.statusCode}`,
          type:'error',
          id:crypto.randomUUID(),
          createdAt: Date.now()
        })
        // alert(error);

      }
    } finally {
      setIsLoading(false)
    }
  }
  const isDisabled = !email || !password;
  // console.log(isLogged);  

  if(isLoading){
    return <LoginLoader />
  }  
  
  return (
    <>      
      {isLogged ? (
        <LoginLoader />
      ) : (
        <div className="min-h-dvh bg-gray-800 flex justify-center items-center">
          <div className="bg-white rounded-lg px-5 py-8 md:container-md container flex flex-col gap-3">
            <h3
            className="text-2xl font-medium text-gray-800"
            >Formulario de inicio de sesión</h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col justify-center gap-3"
            >
              <FormField
                id="email"
                label="E-mail"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
              />
              <FormField
                id="password"
                label="Contraseña"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
              />
              <div>
                <label htmlFor="remenber">
                  Recordar contraseña
                  <input
                    checked={rememberMe}
                    onChange={(e) => {
                      setRememberMe(e.target.checked);
                    }}
                    type="checkbox"
                    name="remenber"
                    id="remenber"
                  />
                </label>
              </div>
              <ButtonCustom
                disabled={isDisabled}
                className="cursor-pointer rounded-lg bg-emerald-400 py-3 font-bold tracking-wide text-white transition-colors duration-300 ease-linear hover:bg-emerald-700 disabled:pointer-events-none disabled:opacity-50"
              >
                Login
              </ButtonCustom>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
