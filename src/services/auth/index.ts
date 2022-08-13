export const signIn = (auth: {
  token: string;
  firstName: string;
  avatar: string;
}) => {
  localStorage.setItem("auth", JSON.stringify(auth));
};

export const signOut = () => {
  localStorage.removeItem("auth");
};

export const isAuthenticated = (
  auth: any,
  isLoggedIn: () => void,
  isNotLoggedIn: () => void
) => {
  const authUser = localStorage.getItem("auth");
  if (authUser || auth) {
    return isLoggedIn();
  }
  return isNotLoggedIn();
};

export const getAuthenticatedUser = (): {
  avatar: string;
  firstName: string;
} | null => {
  const authUser = localStorage.getItem("auth");
  if (authUser) {
    const { avatar, firstName } = JSON.parse(authUser);
    return { avatar, firstName };
  }
  return null;
};
export const getToken = () => {
  const authUser = localStorage.getItem("auth");
  if (authUser) {
    const { token } = JSON.parse(authUser);
    return `Bearer ${token}`;
  }
};
