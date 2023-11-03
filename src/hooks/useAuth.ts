import { useEffect } from 'react';
import apiClient from '../services/api-client';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';

type AuthProps = {
  middleware: 'guest' | 'authenticated' | 'admin';
  url: string;
};

type LoginResponseProps = {
  token?: string;
  user?: {
    name: string;
  };
};

type LoginProps = {
  email: string;
  password: string;
  setErrors: Object[];
};

type RegisterProps = {
  token?: string;
  user?: {
    name: string;
  };
};
type RegisterFieldProps = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  setErrors: Object[];
};
export type UserProps = {
  id: number;
  name: string;
  email: string;
  admin: boolean;
  error: any;
};

export const useAuth = ({ middleware, url }: AuthProps) => {
  const token = localStorage.getItem('AUTH_TOKEN');
  const navigate = useNavigate();

  const {
    data: user,
    error,
    mutate,
  } = useSWR<UserProps>('/api/user', () =>
    apiClient('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.data)
      .catch((err) => {
        throw Error(err?.response?.data?.errors);
      })
  );

  const register = async ({
    name,
    email,
    password,
    password_confirmation,
    setErrors,
  }: RegisterFieldProps) => {
    try {
      const { data: dados } = await apiClient.post<RegisterProps>(
        '/api/register',
        {
          name,
          email,
          password,
          password_confirmation,
        }
      );
      localStorage.setItem('AUTH_TOKEN', dados.token as string);
      setErrors([]);
      await mutate();
    } catch (error: any) {
      setErrors(Object.values(error.response.data.errors));
    }
  };
  const login = async ({ email, password, setErrors }: LoginProps) => {
    try {
      const { data: dados } = await apiClient.post<LoginResponseProps>(
        '/api/login',
        { email, password }
      );
      localStorage.setItem('AUTH_TOKEN', dados.token as string);
      setErrors([]);
      await mutate();
    } catch (error: any) {
      setErrors(Object.values(error.response.data.errors));
    }
  };
  const logout = async () => {
    try {
      await apiClient.post('/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('AUTH_TOKEN');
      await mutate(undefined);
    } catch (error) {}
  };

  useEffect(() => {
    if (middleware === 'guest' && url && user) {
      navigate(url);
    }
    if (middleware === 'guest' && user && user.admin) {
      navigate('/admin');
    }
    // if (middleware === 'authenticated' && user && user.admin) {
    //   navigate('/admin');
    // }
    if(middleware==='authenticated' && user && !user.admin){
      navigate('/')
    }
    if (middleware === 'authenticated' && error) {
      navigate('/auth/login');
    }
  }, [user, error]);

  return {
    register,
    login,
    logout,
    user,
    error,
  };
};
