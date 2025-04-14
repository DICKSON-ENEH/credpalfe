import { useState, useEffect } from 'react';
import axios from 'axios';

// import { jwtDecode } from "jwt-decode";
import { useSelector } from 'react-redux';
import { RootState } from '../Global/store';
import { useNavigate } from "react-router-dom";

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetchById<T >( endpoint:string, id: string | number): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = useSelector((state: RootState) => state.user.token);
  const nav = useNavigate();

  useEffect(() => {
    if (!id) return;
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<T>(`${import.meta.env.VITE_DEVE_URL}/${endpoint}/${id}`,


          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        )
        setData(response.data);
      } catch (err:unknown) {
  //@ts-expect-error ignore response exception

      if( err?.response.data.statusCode === 401){
        nav("/auth/login");

      }
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, id,token]);

  return { data, loading, error };
}

export default useFetchById;
