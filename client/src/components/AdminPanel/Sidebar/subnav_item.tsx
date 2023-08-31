import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// You are going to need to tell TypeScript that it is a functional component and that tells it what types the props are (any in this example)
const SubItem: React.FC<any> = ({ children, setShowSidebarMobile }) => {
    const dispatch = useDispatch()
    const [act, setAct] = useState(localStorage.getItem("child"))
    const setChildActive = (key: any) => {
        setAct(key)
        localStorage.setItem("child", key)
    }
    return (
        <ul className={`nav flex-column child-ul-container`}>
            {children.map((sub:any) => {
                return (
                    <li key={sub.subKey} className={`nav-item child-li-item ${act === sub.subKey ? "active" : ""}`} onClick={() => {
                        setChildActive(sub.subKey)
                        setShowSidebarMobile(false)
                    }}>
                        {sub.external ? <a href={sub.external}>{sub.name}</a> : <Link to={sub.path}>{sub.name}</Link>}
                    </li>
                )
            })}
        </ul>

    )
}
export default SubItem