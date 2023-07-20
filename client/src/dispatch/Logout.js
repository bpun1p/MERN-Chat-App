// import redux

export const Logout = () => {
  // const dispatch to store

  const logout = () => {
    localStorage.removeItem('user')

    // dispatch settings for store
  };

  return { logout };
};