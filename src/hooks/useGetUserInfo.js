export const useGetUserInfo = () => {
    const storedAuthInfo = localStorage.getItem("auth");
    let name, profilePhoto, userID, isAuth;

    if (storedAuthInfo) {
        const parsedAuthInfo = JSON.parse(storedAuthInfo);
        name = parsedAuthInfo.name;
        profilePhoto = parsedAuthInfo.profilePhoto;
        userID = parsedAuthInfo.userID;
        isAuth = parsedAuthInfo.isAuth;
    }

    return {name, profilePhoto, userID, isAuth};
}