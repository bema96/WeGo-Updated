// authenticated/layout.js
"use client";

import { useEffect }               from "react";
import { Navigation }              from "@/components/Navigation/navigation";
import { AuthProvider, useAuth }   from "@/providers/auth.provider";
import { useRouter, usePathname }  from "next/navigation";

function ProtectedContent({ children }) {

  const { loginData, loading } = useAuth();
  const router = useRouter();
  const path = usePathname();


  useEffect(() => {
    if (!loading && !loginData) {
      router.replace(`/login?from=${encodeURIComponent(path)}`);
    }
  }, [loading, loginData, path, router]);

  if (loading || !loginData) return null;
  return <>{children}</>;
}

export default function ProtectedLayout({ children }) {
  
  return (
    <AuthProvider>
      <Navigation />
      <ProtectedContent>
        {children}
      </ProtectedContent>
    </AuthProvider>
  );
}
