import { useEffect, useRef } from "react";
import type { User } from "./types";
import { Link } from "react-router";
import { createFormFactory } from "../../components/forms/FormFactory";
import { useNotification } from "../../components/ui/notification/context";
import { useAppDispatch, useAppSelector } from "../../store";
import { getUi } from "../../store/selectors";
import { authSignup, uiResetError } from "../../store/actions";
import { getErrorMessage } from "../../api/client";

const SignPage = () => {
  const credentialsUser = useRef<User>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const { Form, Input } = createFormFactory<User>();
  const { addNoti } = useNotification();
  const { error } = useAppSelector(getUi)
  
  const dispatch = useAppDispatch();  

  useEffect(()=>{
    if(error){
      addNoti({
          message: getErrorMessage(error),
          type: "error",          
      });
      dispatch(uiResetError()) 
    }
  },[error])

  async function handleSubmitForm(values: User) {    
    await dispatch(authSignup(values));
    addNoti({
      message: "Singup success, ¡Welcome!",
      type: "success",
    });
  }
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gray-800">
      <div className="md:container-md container flex flex-col justify-center gap-4 rounded-lg bg-white px-5 py-8">
        <h3 className="text-2xl font-medium text-gray-800">
          Formulario de registro
        </h3>
        <Form
          className="flex flex-col gap-2"
          initialValue={credentialsUser.current}
          onSubmit={handleSubmitForm}
        >
          <Input id="name" name="name" type="text" label="Nombres" />
          <Input id="username" name="username" type="text" label="Nombre de usuario" />
          <Input id="email" name="email" type="email" label="E-mail" />
          <Input id="password" name="password" type="password" label="Contraseña" />
          <Input
            name="enviar"
            type="submit"
            value="enviar"
            className="cursor-pointer bg-emerald-600 transition-colors duration-300 hover:bg-emerald-500 disabled:pointer-events-none disabled:opacity-50"
          />
        </Form>
        <div className="flex justify-center">
          <p className="font-light text-gray-700">
            ¿Ya tienes una cuenta?{" "}
            <Link
              className="text-md font-medium text-emerald-600 underline"
              to="/login"
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignPage;
