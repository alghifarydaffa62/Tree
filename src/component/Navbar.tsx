import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function Navbar() {
    return(
        <nav className="flex justify-around items-center">
            <h1>Tree</h1>

            <ul className="flex gap-6 items-center">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Features</a>
                </li>
            </ul>

            <ConnectButton/>
        </nav>
    )
}