//components/signup.js
"use client";
// Imports
import { Button } from "../UI/UniversalButton/button";
import Link from "next/link";


export const Signup = ({ register, handleSubmit, onSubmit, errors, loading, error, success, password }) => {

  return (
    
    <section className={"rounded-xl shadow p-8 w-full max-w-lg flex flex-col gap-6"}>
      <h2 className="text-2xl font-bold text-[var(--teal)] text-center">Opret bruger</h2>

      {/* Signup Form */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Fornavn */}
        <input
          className="border border-gray-300 rounded px-4 py-2 text-base"
          id="firstname"
          type="text"
          placeholder="Fornavn"
          disabled={loading}
          {...register("firstname", { required: true })}
        />
        {errors?.firstname && <span className="text-red-500 text-xs">Fornavn er påkrævet</span>}
        {/* Efternavn */}
        <input
          className="border border-gray-300 rounded px-4 py-2 text-base"
          id="lastname"
          type="text"
          placeholder="Efternavn"
          disabled={loading}
          {...register("lastname", { required: true })}
        />
        {errors?.lastname && <span className="text-red-500 text-xs">Efternavn er påkrævet</span>}
        {/* Email */}
        <input
          className="border border-gray-300 rounded px-4 py-2 text-base"
          id="email"
          type="email"
          placeholder="Email"
          disabled={loading}
          {...register("email", { required: true })}
        />
        {errors?.email && <span className="text-red-500 text-xs">Email er påkrævet</span>}
        {/* Password */}
        <input
          className="border border-gray-300 rounded px-4 py-2 text-base"
          id="password"
          type="password"
          placeholder="Adgangskode"
          disabled={loading}
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors?.password && <span className="text-red-500 text-xs">Adgangskode skal være mindst 6 tegn</span>}
        {/* Confirm Password */}
        <input
          className="border border-gray-300 rounded px-4 py-2 text-base"
          id="confirmPassword"
          type="password"
          placeholder="Gentag adgangskode"
          disabled={loading}
          {...register("confirmPassword", {
            required: true,
            validate: value => value === password || "Adgangskoderne matcher ikke"
          })}
        />
        {errors?.confirmPassword && ( <span className="text-red-500 text-xs">{errors.confirmPassword.message || "Gentag adgangskode"}</span> )}
        {error && <span className="text-red-500 text-xs text-center">{error.message || error}</span>}

        {/* Submit og se om valideret */}
        {success && <span className="text-green-600 text-xs text-center">Bruger oprettet! Du viderestilles til login...</span>}

        <Button
          type="submit"
          className="bg-[var(--teal)] text-white rounded px-4 py-2 font-semibold hover:bg-[var(--sky)] transition-all disabled:opacity-60 shadow"
          disabled={loading}
        >
          {loading ? "Opretter..." : "Opret bruger"}
        </Button>
      </form>

      {/* Signup Gateway */}
      <div className="text-center text-sm">
        <span className="text-gray-600">Har du allerede en konto?</span>
        <Link href="/login" className="ml-1 text-[var(--sky)] font-semibold hover:underline">Login</Link>
      </div>

    </section>
  );
};
