import { useState } from "react"
import emailValidator from 'email-validator'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useUser } from "../hooks/useUser"
import { fetchBase } from "../utils/fetchbase"

export default function (props) {
    const _ax = axios.create({
        baseURL: 'http://localhost:8080'
        // baseURL: 'http://25.40.36.163:8080'
    })

    const { setUser } = useUser()
    const { darkMode } = props
    const navigate = useNavigate();

    const minPassLength = 5
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')
    const [msg, setMsg] = useState('')
    const [signInMode, setSignInMode] = useState(true)
    const [isLoading, setLoading] = useState(false)

    const validate = async () => {
        if (signInMode) {
            setError('')
            setMsg('')

            if (!emailValidator.validate(email)) return setError('Please input a valid email.')
            if (password.length < minPassLength) return setError(`Please input a password greater than ${minPassLength} characters.`)
            setLoading(true);

            const res = await fetchBase({
                controller: 'users',
                endpoint: 'login',
                body: {
                    email: email,
                    password: password
                }
            })

            setLoading(false)
            const { token, msg } = res
            if (msg !== '' && msg !== undefined) {
                setError(msg)
                return
            }
            console.log(token)
            const userData = JSON.parse(atob(token.split('.')[1]))
            localStorage.setItem('token', token)
            setUser(userData)
            setLoading(true)
            setTimeout(() => {
                navigate('/feed')
            }, 1500)
        } else {
            setError('')
            setMsg('')
            if (!emailValidator.validate(email)) return setError('Please input a valid email.')
            if (username.length < 1) return setError('Please input a username.')
            if (password.length < minPassLength) return setError(`Please input a password greater than ${minPassLength} characters.`)
            setLoading(true);

            const res = await fetchBase({
                controller: 'users',
                endpoint: 'create',
                body: {
                    email: email,
                    username: username,
                    password: password,
                }
            })
            setLoading(false)
            console.log(res)
            console.log(res.msg)
            if (res.error === true) {
                return setError(res.msg)
            }
            
            setMsg(res.msg)

            const { token, msg } = res
            const userData = JSON.parse(atob(token.split('.')[1]))
            localStorage.setItem('token', token)
            setUser(userData)
            setLoading(false)
            setTimeout(() => {
                navigate('/feed')
            }, 150)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        // setError('')
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        } else {
            setUsername(value)
        }
    }

    return (
        <section className={`w-screen h-screen dark bg-gradient-to-br from-purple-600 to-blue-600`}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    daydream
                </a>
                <div className="w-full bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {signInMode ? 'Sign in to your account' : 'Sign up for daydream'}

                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onChange={(e) => handleChange(e)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                            </div>
                            {!signInMode &&
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                                    <input onChange={(e) => handleChange(e)} type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="johndeer" required="" />
                                </div>
                            }
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={(e) => handleChange(e)} type="password" name="password" id="password" placeholder="•••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            {signInMode &&
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>

                                    {/* <a href="#" className="text-sm font-medium text-gray-600 hover:underline dark:text-gray-500">Forgot password?</a> */}
                                </div>
                            }
                            {isLoading &&
                                <div className="flex justify-center">
                                    <div role="status" className="">
                                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }
                            {error !== '' && <p className="text-red-400 text-center">{error}</p>}
                            {msg !== '' && <p className="text-green-400 text-center">{msg}</p>}
                            <button onClick={validate} className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">{signInMode ? 'Sign in' : 'Sign up'}</button>
                            {signInMode
                                ? <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don't have an account yet? <a href="#" className="font-medium text-gray-600 hover:underline dark:text-gray-500" onClick={() => setSignInMode(false)}>Sign up</a>
                                </p>
                                : <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="#" className="font-medium text-gray-600 hover:underline dark:text-gray-500" onClick={() => setSignInMode(true)}>Sign in</a>
                                </p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}