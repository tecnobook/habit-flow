
import Perfil from "@/components/perfil";
import "@/styles/globals.css";
import styles from '@/styles/Home.module.css'
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Perfil />
      <Component {...pageProps} />
    </>
  );
}
