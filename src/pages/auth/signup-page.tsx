import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import ButtonCustom from "../../components/ui/button";
import FormField from "../../components/ui/form-field";
import { AxiosError } from "axios";
import { LogIn, singUp } from "./service";
import type { User } from "./types";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./context";

const SignPage = () => {
  const [user, setUser] = useState<User>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const { name, username, email, password } = user;
  const isDisabled = !name || !username || !email || !password;

  const { isLogged } = useAuth()
  const navigate = useNavigate();
  useEffect(()=>{
    if (isLogged) {
      navigate("/", { replace: true });
    }
  },[])
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { email } = await singUp(user);
      await LogIn({ email, password }, true);
      // console.log(newUser);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        alert(error);
      }
    }
  }
  return (
    <div className="bg-gray-800 min-h-dvh flex flex-col justify-center items-center">
      <div className="bg-white px-5 py-8 rounded-lg md:container-md container flex flex-col justify-center gap-4">
        
        <h3 
        className="text-2xl font-medium text-gray-800">Formulario de registro</h3>
        <form
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
        </form>
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
