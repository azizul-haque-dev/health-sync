"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

function SignInWithGoogle() {
  const signIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google"
    });
    console.log(data);
  };

  return (
    <div className="mt-4 ">
      <button
        onClick={signIn}
        className="w-full cursor-pointer flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
      >
        <Image
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          width={20}
          height={20}
          className="w-5 h-5"
        />
        Sign in with Google
      </button>
    </div>
  );
}

export default SignInWithGoogle;
