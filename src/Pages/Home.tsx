import { useEffect } from "react"
import Navbar from "../component/Navbar"
import { useNavigate } from "react-router-dom"
import { useConnections } from "wagmi"

export default function Home() {
    const connection = useConnections()
    const navigate = useNavigate()

    useEffect(() => {
        if(connection.length > 0) {
            navigate('/dashboard')
        }
    }, [connection, navigate])

    return(
        <div>
            <div className="my-5">
                <Navbar/>
            </div>
            
            <h1 className="text-2xl font-semibold text-blue-500">HOME</h1>
        </div>
    )
}