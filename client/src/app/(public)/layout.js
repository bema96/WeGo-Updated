// public/layout.js
"use client";

import { Footer }            from "@/components/_footer/footer";
import { Navigation }        from "@/components/Navigation/navigation";
import { AuthProvider }      from "@/providers/auth.provider";



export default function PublicLayout({ children }) {

	return (

	 <AuthProvider>
          <Navigation />
           <main className="flex-1">
            {children}
           </main>
          <Footer className="relative z-10 -mt-16" />
	 </AuthProvider>

	);
}
