import { AuthView } from "@neondatabase/neon-js/auth/react";
import { useParams } from "react-router";

const authClassNames = {
  base: "border-white/10 bg-charcol rounded",
  title: "text-2xl text-cream",
  description: "text-[#b8b1a8]",
  form: {
    input: "border-white/10 bg-[#1f1b18] text-cream placeholder:text-[#8f877d]",
    label: "text-cream",
    button: "rounded h-11",
    primaryButton: "bg-[#9c9fe0] text-black hover:bg-[#b2b5f0]",
    providerButton: "border-white/10 bg-[#221e1a] hover:bg-[#2b2621]",
    error: "text-red-400",
  },
};
const Auth = () => {
  const { pathname } = useParams();
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center ">
      <div className="max-w-md w-full">
        <AuthView pathname={pathname} classNames={authClassNames}/>
      </div>
    </div>
  );
};

export default Auth;
