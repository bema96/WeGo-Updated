"use client";

import { Button }     from "@/components/UI/UniversalButton/button";
import { useAuth }    from "@/providers/auth.provider";
import { useRouter }  from "next/navigation";
import { LogoutIcon } from "@/assets/icons/logout";   



export default function DashboardPage () {
    const auth = useAuth();                         
    const loginData = auth?.loginData;
    const setLoginData = auth?.setLoginData;
    const router = useRouter();

    const handleLogout = () => {
        
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("user_id");
        setLoginData(null);
        router.replace("/login");
    };

    return (

        <div className="flex text-black">

            {/* Section Left */}
            <div className="border-r-4 bg-gray-200 border-gray-300 py-5 px-5 h-screen w-[350px]">
                {/* <ProfilePicture /> */}
                
                <h1 className="text-2xl font-bold">
                    Hej {loginData?.user?.firstname}
                </h1>
                <Button
                    className="text-red-500 flex items-center gap-1.5 mt-3"
                    onClick={handleLogout}
                    type="button"
                    title={"afslut session"}
                >
                Log ud
                    <LogoutIcon className="w-4 h-4 fill-current text-red-500" />
                </Button>
            </div>

            {/* Section Right */}
            <div className="bg-gray-200 h-screen w-full">

            </div>

        </div>
    );
};