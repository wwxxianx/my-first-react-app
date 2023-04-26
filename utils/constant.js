import { HiOutlineDesktopComputer } from 'react-icons/hi';
import { RiEBike2Line, RiPlantLine, RiShirtFill } from "react-icons/ri";
import { AiOutlineGift, AiFillFileText } from "react-icons/ai";
import { MdOutlineHeadsetMic, MdLocationPin } from "react-icons/md";
import { FaTshirt } from 'react-icons/fa';
import { GiConverseShoe, GiLoincloth, GiRunningShoe, GiClothes, GiMonclerJacket } from "react-icons/gi";
import { BsSunglasses, BsFillPersonFill, BsFillCreditCardFill } from "react-icons/bs";

export const categoryList = [
    {
        icon: <HiOutlineDesktopComputer />,
        title: "computer",
    },
    {
        icon: <RiEBike2Line />,
        title: "bike",
    },
    {
        icon: <RiPlantLine />,
        title: "home & garden",
    },
    {
        icon: <AiOutlineGift />,
        title: "gift",
    },
    {
        icon: <MdOutlineHeadsetMic />,
        title: "music",
    },
];

export const megaMenu = [
    {
        icon: <FaTshirt />,
        title: "t-shirt",
    },
    {
        icon: <RiShirtFill />,
        title: "formal shirt",
    },
    {
        icon: <GiConverseShoe />,
        title: "shoe",
    },
    {
        icon: <GiLoincloth />,
        title: "jacket",
    },
    {
        icon: <BsSunglasses />,
        title: "sunglass",
    },
    {
        icon: <GiRunningShoe />,
        title: "formal shoe",
    },
    {
        icon: <GiClothes />,
        title: "pant",
    },
    {
        icon: <GiClothes />,
        title: "formal pant",
    },
    {
        icon: <GiMonclerJacket />,
        title: "formal jacket",
    },
];

export const userMenu = [
    {
        icon: <AiFillFileText />,
        title: "order",
    },
    {
        icon: <BsFillPersonFill />,
        title: "my profile",
    },
];

export const profileSideBar = [
    // {
    //     icon: <BsFillPersonFill />,
    //     title: "profile info",
    // },
    {
        icon: <MdLocationPin />,
        title: "adresses",
    },
    {
        icon: <BsFillCreditCardFill />,
        title: "payment methods",
    },
];


