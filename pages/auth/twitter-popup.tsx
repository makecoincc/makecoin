import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

export default function TwitterPopup() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session)
    if (session?.user?.name) {
      window.opener.postMessage({ username: session.user.name }, window.location.origin);
      window.close();
    }
  }, [session]);

  return (
    <div>
      <p>正在登录 Twitter...</p>
      <button onClick={() => signIn("twitter")}>点击登录</button>
    </div>
  );
}