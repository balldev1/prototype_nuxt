import { jwtDecode } from "jwt-decode";

interface DecodedUser {
  userId: string;
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  role: string;
  iat: number;
  exp: number;
}

export const currentUser = () => {
  const token = useCookie("auth_token");
  const user = ref<DecodedUser | null>(null);

  if (token.value) {
    try {
      user.value = jwtDecode<DecodedUser>(token.value);
    } catch (err) {
      console.error("Failed to decode token:", err);
    }
  }

  return { user };
};
