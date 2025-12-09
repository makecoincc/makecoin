"use client";

import { useEffect } from "react";
import { createClient } from '@/utils/supabase/client';
import useAuthStore from '@/store/useAuthStore';
function SupbabaseProvider({ children }: { children: React.ReactNode }) {
    const supabase = createClient();
    const { setAuth } = useAuthStore();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) {
                    console.log(error)
                } else {
                    console.log(data)
                    setAuth(data.session)
                }
            } catch (e) {
                console.log(e)
            }
        }
        checkSession()
    }, []);

    return <>{children}</>;
}

export { SupbabaseProvider };
