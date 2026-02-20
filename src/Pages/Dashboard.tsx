import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useConnections, useConnection } from "wagmi"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Dashboard() {
    const navigate = useNavigate()
    const connections = useConnections()
    const { address } = useConnection()

    useEffect(() => {
        if(connections.length == 0) {
            navigate('/')
        }
    }, [connections, navigate])

    return(
        <div>
            <h1>WELCOME TO DASHBOARD {address?.slice(0, 10)}...{address?.slice(-10)}</h1>
            <ConnectButton showBalance={false}/>
        </div>
    )
}