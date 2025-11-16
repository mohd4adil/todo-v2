import Profile from "./avatar";

const Header = ({title, paragraph, user, logout}) => {
    return (
        <div className="relative w-[100%] h-[20vh]">
            <div className=" text-white text-left px-12 space-y-2">
                <h1 className="font-bold">{title}</h1>
                <p className="font-semibold">{paragraph}</p>
            </div>
            <Profile
                user={user}
                logout={logout}
            />
        </div>
    )
}

export default Header;