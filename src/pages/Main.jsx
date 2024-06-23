import { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";

import GamuxLogo from "../assets/gamux-logo.svg?react";

import { api } from "../services/api";

import { Checkmark } from "../components/Checkmark.jsx";
import { Input } from "../components/Input";

export function MainPage() {
  const { register, handleSubmit } = useForm();
  const [isAdded, setIsAdded] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await api.post(
        "",
        {},
        {
          headers: {
            Authorization: "Basic " + data.password,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Firewall atualizado com sucesso!");
        setIsAdded(true);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setIsWrong(true);
        toast.warning("Código incorreto, tente novamente.");
        setTimeout(() => {
          setIsWrong(false);
        }, 3000);
      } else {
        toast.error("O seguinte erro aconteceu: " + error.message);
      }
    }
  };

  useEffect(() => {
    async function verify() {
      let response;
      try {
        response = await api.get("");
        if (response.status === 200) {
          setIsAdded(true);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          return;
        }
        toast.error("Ocorreu um erro ao tentar a conexão com o servidor.")
      }
    }

    verify();
  }, []);

  return (
    <>
      {isAdded ? (
        <Checkmark />
      ) : (
        <div className="flex items-center justify-center h-screen bg-slate-100">
          <form
            autoComplete="off"
            className="flex flex-col justify-center items-center h-3/6 py-6 rounded-lg bg-gray-200 gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <GamuxLogo className="w-2/5 h-2/5" />
            <h1 id="title">Firewall Enabler</h1>
            <Input
              inputStyle={
                isWrong ? "border-red-700 border-[1px] animate-shake" : null
              }
              type="password"
              label="Insira o código"
              {...register("password")}
            />
            <button
              className="rounded-lg bg-primary-800 hover:bg-primary-900 text-white p-2"
              type="submit"
            >
              Adicionar
            </button>
          </form>
        </div>
      )}

      <ToastContainer
        position="top-right"
        theme="colored"
        style={{
          fontWeight: "bold",
        }}
        closeOnClick
        autoClose={3000}
        transition={Bounce}
        pauseOnHover={false}
      />
    </>
  );
}
