import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const [loginData, setLoginData] = useState(null);

  const saveLoginData = () => {
    const encodedToken = localStorage.getItem("userToken");
    const decodedToken = jwtDecode(encodedToken);
    setLoginData(decodedToken);
    //console.log(decodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveLoginData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loginData, saveLoginData }}>
      {props.children}
    </AuthContext.Provider>
  );
}

// import { jwtDecode } from "jwt-decode";// Updated import statement
// import { createContext, useEffect, useState, ReactNode } from "react";

// interface DecodedToken {
//   userId: string; 
//   email: string;
//   exp: number;
// }

// // Define the type for the AuthContext
// interface AuthContextType {
//   loginData: DecodedToken | null;
//   saveLoginData: () => void;
// }

// // Initialize AuthContext with null for the value
// export const AuthContext = createContext<AuthContextType | null>(null);

// interface AuthContextProviderProps {
//   children: ReactNode;
// }

// export default function AuthContextProvider({ children }: AuthContextProviderProps) {
//   const [loginData, setLoginData] = useState<DecodedToken | null>(null);

//   const saveLoginData = () => {
//     const encodedToken = localStorage.getItem("userToken");
//     if (encodedToken) {
//       const decodedToken = jwtDecode<DecodedToken>(encodedToken);
//       setLoginData(decodedToken);
//     }
//   };

//   useEffect(() => {
//     if (localStorage.getItem("userToken")) {
//       saveLoginData();
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ loginData, saveLoginData }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
