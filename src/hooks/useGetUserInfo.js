export const useGetUserInfo = () => {
    const storedAuthInfo = localStorage.getItem("auth");
    let name, profilePhoto, userID, isAuth;

    if (storedAuthInfo) {
        const parsedAuthInfo = JSON.parse(storedAuthInfo);
        name = parsedAuthInfo.name;
        userID = parsedAuthInfo.userID;
        isAuth = parsedAuthInfo.isAuth;
        try {
            profilePhoto = parsedAuthInfo.profilePhoto;
            profilePhoto = profilePhoto ? profilePhoto : 'path/to/default.svg';
        } catch (err) {
            console.error("Error parsing profile photo", err);
            console.error(profilePhoto);
        }
    }

    return {name, profilePhoto, userID, isAuth};
}