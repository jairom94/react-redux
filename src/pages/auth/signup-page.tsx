import { useEffect, useRef } from "react";
// import ButtonCustom from "../../components/ui/button";
// import FormField from "../../components/ui/form-field";
import { AxiosError } from "axios";
import { singUp } from "./service";
import type { User } from "./types";
import { Link, useNavigate } from "react-router";
// import { useAuth } from "./context";
import { createFormFactory } from "../../components/forms/FormFactory";
import { useNotification } from "../../components/ui/notification/context";
import { useUserInformation } from "./me/context";
import { useAppDispatch, useAppSelector } from "../../store";
import { getAuth } from "../../store/selectors";
import { authLogin } from "../../store/actions";

const SignPage = () => {
  const credentialsUser = useRef<User>({
    name: "",
    username: "",
    email: "",
    password: "",
  })
  const { Form, Input } = createFormFactory<User>()
  const { addNoti } = useNotification();  
  const { onUserLogged } = useUserInformation();

  // const { isLogged,onLogin } = useAuth()
  const isLogged = useAppSelector(getAuth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  useEffect(()=>{
    if (isLogged) {
      navigate("/", { replace: true });
    }
  },[])  

  async function handleSubmitForm(values:User) {
    try {
      await singUp(values);
      const { email, password } = values
      dispatch(authLogin({ email,password,remember:true }))
      // await LogIn({ email,password,remember:true });      
      // onLogin();
      onUserLogged();
      navigate("/", { replace: true });
      addNoti({
        message: "Singup success, ¡Welcome!",
        id: crypto.randomUUID(),
        type: "success",
        createdAt: Date.now(),
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        addNoti({
          message: error.response?.data?.message ?? error.message ?? "",
          type: "error",
          id: crypto.randomUUID(),
          createdAt: Date.now(),
        });
      }
    }
  }
  return (
    <div className="bg-gray-800 min-h-dvh flex flex-col justify-center items-center">
      <div className="bg-white px-5 py-8 rounded-lg md:container-md container flex flex-col justify-center gap-4">
        
        <h3 
        className="text-2xl font-medium text-gray-800">Formulario de registro</h3>
        <Form 
        className="flex flex-col gap-2"
        initialValue={credentialsUser.current} 
        onSubmit={handleSubmitForm}>
          <Input name="name" type="text" label="Nombres" />
          <Input name="username" type="text" label="Nombre de usuario" />
          <Input name="email" type="email" label="E-mail" />
          <Input name="password" type="password" label="Contraseña" />
          <Input name="enviar" type="submit" 
          className="bg-emerald-600 hover:bg-emerald-500 transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          />
        </Form>
        {/* <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-3"
        >
          <FormField
            id="name"
            label="Nombres"
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
          />
          <FormField
            id="username"
            label="Nombre de usuario"
            name="username"
            type="text"
            value={username}
            onChange={handleChange}
          />
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
          <ButtonCustom
            disabled={isDisabled}
            className="cursor-pointer rounded-lg bg-sky-700 py-3 font-bold tracking-wide text-white transition-colors duration-300 ease-linear hover:bg-sky-500 disabled:pointer-events-none disabled:opacity-50"
          >
            Registrar
          </ButtonCustom>
        </form> */}
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
