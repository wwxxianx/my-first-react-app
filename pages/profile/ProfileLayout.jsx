import React, { useEffect } from 'react'
import ProfileSideBar from './ProfileSideBar';

const ProfileLayout = ({
    children,
    showSideBar,
    setShowSideBar,
    validWishListProductLength,
}) => {
    return (
        <div className="max-w-[1300px] m-auto px-5 lg:flex lg:px-0 gap-5 md:pb-10 md:pt-6">
            <ProfileSideBar
                showSideBar={showSideBar}
                setShowSideBar={setShowSideBar}
                validWishListProductLength={validWishListProductLength}
            />

            {children}
        </div>
    );
};

export default ProfileLayout