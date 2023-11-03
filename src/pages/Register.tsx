import { Link } from 'react-router-dom';
import apiClient from '../services/api-client';
import { FormEvent, createRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
export default function Register() {
  const nameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const passwordConfirmationRef = createRef<HTMLInputElement>();
  const [errors, setErrors] = useState([]);

  const { register } = useAuth({ middleware: 'guest', url: '/' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      password_confirmation: passwordConfirmationRef.current?.value,
    };
    await register({name: data.name as string, email: data.email as string, 
      password: data.password as string, 
      password_confirmation: data.password_confirmation as string, setErrors: setErrors as []})
  };
  return (
    <>
      <h1 className="text-4xl font-black">Cria tua conta</h1>
      <p>Cria tua conta preenchendo o formulário</p>
      <div
        className="bg-white shadow-md 
      rounded-md mt-10 px-5 py-10"
      >
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {errors ? errors.map((error, i) => <p key={i}>{error}</p>) : null}
          <div>
            <label htmlFor="name" className="text-slate-800">
              Nome:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Teu nome"
              ref={nameRef}
              className="mt-2 w-full block p-3 bg-gray-100"
            />
          </div>
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
          <div>
            <label htmlFor="password_confirmation" className="text-slate-800">
              Confirmar Palavra-passe:
            </label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              placeholder="Confirmar palavra-passe"
              ref={passwordConfirmationRef}
              className="mt-2 w-full block p-3 bg-gray-100"
            />
          </div>
          <input
            type="submit"
            value={'Criar Conta'}
            className="uppercase font-bold cursor-pointer
          bg-indigo-600 hover:bg-indigo-800 text-white
          w-full mt-5 p-3"
          />
        </form>
      </div>
      <nav className="mt-5">
        <Link to="/auth/login">Já tens conta? Inicia Sessão</Link>
      </nav>
    </>
  );
}
