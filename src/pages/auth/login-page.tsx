import { useEffect, useRef } from "react";
// import FormField from "../../components/ui/form-field";
import type { Login } from "./types";
// import ButtonCustom from "../../components/ui/button";
import LoginLoader from "../../components/ui/login-loader";
// import { useAuth } from "./context";
// import { useNavigate } from "react-router";
import { useNotification } from "../../components/ui/notification/context";
import { createFormFactory } from "../../components/forms/FormFactory";
import { useAppDispatch, useAppSelector } from "../../store";
import { getAuth, getUi } from "../../store/selectors";
import { authLogin, uiResetError } from "../../store/actions";
import { getErrorMessage } from "../../api/client";


const LoginPage = () => {  
  const credentials =  useRef<Login>({
    email: "",
    password: "",
    remember:false
  })

  const isLogged = useAppSelector(getAuth)
  const dispatch = useAppDispatch()

  const { pending:isLoading,error } = useAppSelector(getUi)

  const { addNoti } = useNotification();  

  useEffect(()=>{
    if(error){
      addNoti({
          message: getErrorMessage(error),
          type: "error",          
      });
      dispatch(uiResetError()) 
      // credentials.current = {...values}
    }
  },[error])

  const { Form, Input } = createFormFactory<Login>();  

  async function handleLogin(values:Login){    
    await dispatch(authLogin(values))      
    addNoti({
      message: "Login success",
      type: "success",        
    });           
  }

  if (isLoading) {
    return <LoginLoader />;
  }

  return (
    <>
      {isLogged ? (
        <LoginLoader />
      ) : (
        <div className="min-h-dvh flex justify-center items-center bg-gray-800">
          <div className="flex flex-col gap-3 rounded-lg bg-white px-6 py-8">
           <h3 className="text-2xl font-medium text-gray-800">
              Formulario de inicio de sesión
          </h3>
          <Form
            initialValue={credentials.current}
            onSubmit={handleLogin}
            className="flex flex-col gap-2"
          >
            <Input name="email" type="email" id="email" label="E-mail" />
            <Input name="password" type="password" id="password" label="Contraseña" />
            <Input name="remember" type="checkbox" id="remember" label="Recordar contraseña" />            
            <Input 
            name="enviar" 
            type="submit"
            value="enviar" 
            className="bg-emerald-600 hover:bg-emerald-500 transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            />
          </Form>
          </div>          
        </div>
      )}
    </>
  );
};

export default LoginPage;
