import WalletConnectButton from "@/components/button/ConnectWalletButton";
import PrimaryButton from "@/components/button/PrimaryButton";
import { useWallet } from "@/providers/WalletContext";
import Link from "next/link";

const MenuItems = [
    {
        value: "About",
        link: "about",
    },
    {
        value: "Team",
        link: "team",
    },
    {
        value: "Socials",
        link: "socials",
    },
];

const LandingHeader = () => {
    const {
        isConnected,
        stakeAddress,
        disconnect
      } = useWallet();
    return (
        <div className="fixed p-4 right-20 hidden md:block">
            <div className="flex gap-8 text-lg items-center">
                {MenuItems.map((item, index) => (
                    <Link key={index} className="" href={item.link}>
                        {item.value}
                    </Link>
                ))}
                {isConnected ? <PrimaryButton onClick={()=>{disconnect()}}>Disconnect</PrimaryButton> : <WalletConnectButton/>}
            </div>
        </div>
    )
}

export default LandingHeader;