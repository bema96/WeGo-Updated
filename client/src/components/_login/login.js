//components/login.js
"use client";
// Imports
import Link from "next/link";


export const Login = ({ register, handleSubmit, onSubmit, errors, loading, error }) => {

  return (

    <section className={"rounded-xl shadow p-8 w-full max-w-lg flex flex-col gap-6"}>
      <h2 className="text-2xl font-bold text-[var(--teal)] text-center">Login</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        
        {/* Email */}
        <input
          className="border border-gray-300 rounded px-4 py-2 text-base"
          id="username"
          type="text"
          placeholder="Brugernavn eller email"
          disabled={loading}
          {...register("username", { required: true })}
        />
        {errors?.username && <span className="text-red-500 text-xs">Påkrævet</span>}

        {/* Password */}
        <input
          className="border border-gray-300 rounded px-4 py-2 text-base"
          id="password"
          type="password"
          placeholder="Adgangskode"
          disabled={loading}
          {...register("password", { required: true })}
        />
        {errors?.password && <span className="text-red-500 text-xs">Påkrævet</span>}

        {/* Error Message fra serverkode */}
        {error && (
          <span className="text-red-500 text-xs text-center">
            {error.message}
          </span>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="bg-[var(--teal)] text-white rounded px-4 py-2 font-semibold hover:bg-[var(--sky)] transition-all disabled:opacity-60 shadow"
          disabled={loading}
        >
          {loading ? "Logger ind..." : "Login"}
        </button>
      </form>

      {/* Signup redirect */}
      <div className="text-center text-sm">
        <span className="text-gray-600">Ingen konto?</span>
        <Link href="/signup" className="ml-1 text-[var(--sky)] font-semibold hover:underline">Opret bruger</Link>
      </div>
    </section>
  );
};

// Named arrow-function med props-destructuring. Dette er login formularen med validering og fejlmeddelelser.
// Formularen bruger react-hook-form til håndtering af input og validering. Der er også en loading state og fejlmeddelelser fra serveren.

// handleSubmit er en funktion fra react-hook-form, der håndterer formularindsendelse.

// register er en funktion fra react-hook-form, der forbinder inputfelter med formularens tilstand og validering. Den kommer med spread operatoren {...} for at tilføje nødvendige props til inputfelterne. Vi bruger kun i dette tilfælde required validering.

// onSubmit er en brugerdefineret funktion, der kaldes, når formularen indsendes korrekt.

// error med && operatoren bruges til betinget rendering af fejlmeddelelser, hvis error på dette objekt eksisterer, så vis denne error.

// ternary operator bruges til at vise "Logger ind..." tekst på knappen, når loading er sand, ellers vises "Login".

// disabled attribut bruges til at deaktivere inputfelter og knappen, når loading er sand, for at forhindre flere indsendelser.
