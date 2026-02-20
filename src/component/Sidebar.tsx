
export default function Sidebar() {
    return(
        <aside>
            <div className="h-20 flex items-center px-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center font-bold">F</div>
                    <span className="text-lg font-semibold text-white tracking-wide">Tree Dashboard</span>
                </div>
            </div>

            <nav>
                <ul>
                    <li>
                        <a href="/">Dashboard</a>
                    </li>
                    <li>
                        <a href="/">Vault</a>
                    </li>
                    <li>
                        <a href="/">Revenue</a>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}