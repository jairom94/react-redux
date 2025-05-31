import { useState, type ChangeEvent, type FormEvent } from "react";
import ButtonCustom from "../../components/ui/button";
import FormField from "../../components/ui/form-field";
import { AxiosError } from "axios";
import { LogIn, singUp } from "./service";
import type { User } from "./types";

const SignPage = () => {
  const [user, setUser] = useState<User>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const { name, username, email, password } = user;
  const isDisabled = !name || !username || !email || !password;

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
      await LogIn({ email, password });
      // console.log(newUser);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        alert(error);
      }
    }
  }
  return (
    <div className="md:container-md container flex min-h-dvh">
      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col justify-center gap-3"
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
          SignUp
        </ButtonCustom>
      </form>
    </div>
  );
};

export default SignPage;
