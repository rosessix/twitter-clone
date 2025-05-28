import { useEffect, useState } from "react";
const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(false)
    useEffect(() => {
        const saved = localStorage.getItem('darkmode') === 'true'
        console.log(saved)
        setDarkMode(saved)
    }, [])

    const toggleDarkMode = (bool) => {
        setDarkMode(bool)
        localStorage.setItem('darkmode', bool)
    }

    return { darkMode, toggleDarkMode };
}

export default useDarkMode;