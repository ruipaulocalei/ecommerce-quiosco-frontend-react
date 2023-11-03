import { FormEvent, createRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
export default function Login() {
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const [errors, setErrors] = useState([]);

  const { login } = useAuth({
    middleware: 'guest',
    url: '/',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    login({
      email: data.email as string,
      password: data.password as string,
      setErrors: setErrors as [],
    });
  };
  return (
    <>
      <h1 className="text-4xl font-black">Iniciar Sessão</h1>
      <p>Para criares um pedido deves criar sessão</p>
      <div
        className="bg-white shadow-md 
      rounded-md mt-10 px-5 py-10"
      >
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {errors ? errors.map((error, i) => <p key={i}>{error}</p>) : null}
          <div>
            <label htmlFor="email" className="text-slate-800">
              E-mail:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Teu E-mail"
              ref={emailRef}
              className="mt-2 w-full block p-3 bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-slate-800">
              Palavra-passe:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Tua palavra-passe"
              ref={passwordRef}
              className="mt-2 w-full block p-3 bg-gray-100"
            />
          </div>
          <input
            type="submit"
            value={'Entrar'}
            className="uppercase font-bold cursor-pointer
          bg-indigo-600 hover:bg-indigo-800 text-white
          w-full mt-5 p-3"
          />
        </form>
      </div>
      <nav className="mt-5">
        <Link to="/auth/registro">Não tens conta? Cria uma</Link>
      </nav>
    </>
  );
}
