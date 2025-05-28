import { useEffect, useState } from "react"
import { useUser } from "../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { FeedInput } from "../components/FeedInput"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import fetchBase from "../utils/fetchBase"

// DESIGN IDEA: https://dribbble.com/shots/16842379-Social-Feed

export const Feed = (props) => {
    const { darkMode } = props;
    const navigate = useNavigate();
    const [tweet, setTweet] = useState('');
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([{}])
    const [welcomeMsg, setWelcomeMsg] = useState('')

    const { user, setUser } = useUser();

    useEffect(() => {
        if (!user) {
            navigate('/login')
        } else {
            setLoading(false)
            setWelcomeMsg(randomWelcome())
            fetchAllPosts()
        }
    }, [user, navigate])

    const postTweet = async () => {
        const MAX_CHARS = 255;
        const overLimit = tweet.length > MAX_CHARS
        if (overLimit) {
            return toast.error(`There can only be ${MAX_CHARS} characters inside of a post. Please lower your character use.`)
        }

        const res = await fetchBase({
            controller: 'posts',
            endpoint: 'create',
            authorize: true,
            body: {
                authorId: user.id,
                text: tweet
            }
        })

        if (res.error == true) {
            toast.error(res.errorMsg)
            return
        }

        toast.success(res.message)
        let post = newPost(user, tweet, undefined, undefined)
        setTweet('')
    }

    const newPost = (user, text, likes, comments) => {
        let post = {
            authorId: user.id,
            username: user.username,
            text: text,
            likes: likes,
            comments: comments,
            img: user.img
        }
        let postsArray = [post, ...posts]
        setPosts(postsArray)
        return post
    }

    const randomWelcome = () => {
        const msgs = [
            'Good to see you',
            'Welcome back',
            'Glad to have you back',
            'Long time no see'
        ]
        const rnd = Math.floor(Math.random() * msgs.length)
        return `${msgs[rnd]}`
    }

    const fetchAllPosts = async () => {
        setLoading(true)

        const posts = await fetchBase({
            controller: 'posts',
            endpoint: '',
            method: 'GET',
        })

        setPosts([...posts].reverse())
        setLoading(false)
    }

    const handleLike = async (post) => {
        const postIndex = posts.findIndex((_post) => _post.post_id === post.post_id)

        const res = await fetchBase({
            method: 'POST',
            controller: 'posts',
            endpoint: `${post.post_id}/like`,
            authorize: true,
            body: {}
        })

        if (res?.liked == undefined) return

        setPosts((prevPosts) =>
            prevPosts.map((p) =>
                p.post_id === post.post_id
                    ? { ...p, likeCount: p.likeCount + (res.liked ? 1 : -1) }
                    : p
            )
        )
    }

    if (loading) {
        return (
            <div className="flex justify-center align-center items-center h-screen w-screen bg-slate-900">
                <div role="status" className="scale-150">
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="flex bg-slate-900 min-h-screen h-auto text-white">
            <div className="w-full lg:w-2/5 border border-gray-600 mx-auto h-auto border-t-1">
                <div className="flex p-3">
                    <div className="flex-1">
                        <h1 className="text-xl">{welcomeMsg} <span className="font-bold">{user.username}</span>!</h1>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-xl float-right">Go to top!</h1>
                    </div>
                </div>
                <hr className="border-gray-600"></hr>
                <div>
                    <FeedInput img={user.img} onSend={postTweet} onUpdate={setTweet} />
                </div>
                <hr className="border-gray-600"></hr>

                {posts.map((post, key) => (
                    <div key={key}>
                        <div className="flex">
                            <div className="m-2 w-10 py-1">
                                <img className="inline-block h-10 w-10 rounded-full" src={post.img} alt="" />
                            </div>
                            <div className="flex-1 px-2 pt-2 mt-2">
                                <h1 className="text-md text-gray-400 font-bold">@{post.username}</h1>
                                <p className="text-xl">{post.text}</p>
                            </div>
                        </div>
                        <div className="flex p-3 border-b-2 border-b-gray-600">
                            <div className="flex-1">
                                <button>{post.likeCount} Likes</button>
                            </div>
                            <div className="flex-1">
                                <button onClick={() => handleLike(post)}>Like</button>
                            </div>
                            <div className="flex-3">
                                <button>Comment</button>
                            </div>
                        </div>
                        <div className="flex row-auto">
                            {/* comments */}
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer theme="dark" pauseOnHover={false} />
        </div>
    )
}
