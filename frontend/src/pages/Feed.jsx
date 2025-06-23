import { useCallback, useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { FeedInput } from '../components/FeedInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchBase } from '../utils/fetchbase';
import NavBar from '../components/NavBar';
import FeedNavBar from '../components/FeedNavBar';
import { formatDistanceToNow } from 'date-fns'
import Modal from '../components/Modal/Modal';

export const Feed = ({ darkMode }) => {
    const navigate = useNavigate();
    const [tweet, setTweet] = useState('');
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [welcomeMsg, setWelcomeMsg] = useState('');
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    const { user, setUser } = useUser();

    const [userProfile, setUserProfile] = useState({
        username: user.username || "mcadmin",
        // displayName: "MC Admin",
        bio: user.bio || "No known bio.",
        location: user.location || 'No location set.',
        link: user.link || "No website found." ,
        // joinDate: "January 2024",
        // following: 127,
        // followers: 1543,
        // posts: 89,
    })

    const [editForm, setEditForm] = useState(userProfile)

    useEffect(() => {
        console.log(user)
        if (!user) {
            navigate('/login');
        } else {
            setLoading(false);
            setWelcomeMsg(randomWelcome());
            fetchAllPosts();
        }
    }, [user, navigate]);

    const postTweet = async () => {
        const MAX_CHARS = 255;
        if (tweet.length > MAX_CHARS) {
            return toast.error(
                `There can only be ${MAX_CHARS} characters inside of a post. Please lower your character use.`
            );
        }

        const res = await fetchBase({
            controller: 'posts',
            endpoint: 'create',
            authorize: true,
            body: {
                authorId: user.id,
                text: tweet,
            },
        });

        if (res.error) {
            toast.error(res.errorMsg);
            return;
        }

        toast.success(res.message);

        const post = {
            authorId: user.id,
            username: user.username,
            text: tweet,
            likes: 0,
            comments: [],
            img: user.img,
            created_at: Date.now(),
            likeCount: 0,
        };

        setPosts((prev) => [post, ...prev]);
        setTweet('');
    };

    const fetchAllPosts = async () => {
        setLoading(true);

        const res = await fetchBase({
            controller: 'posts',
            endpoint: '',
            method: 'GET',
        });

        if (Array.isArray(res)) {
            setPosts(res);
        }

        setLoading(false);
    };

    const handleLike = async (post) => {
        const res = await fetchBase({
            method: 'POST',
            controller: 'posts',
            endpoint: `${post.post_id}/like`,
            authorize: true,
            body: {},
        });

        if (res?.liked === undefined) return;

        setPosts((prevPosts) =>
            prevPosts.map((p) =>
                p.post_id === post.post_id
                    ? { ...p, likeCount: p.likeCount + (res.liked ? 1 : -1) }
                    : p
            )
        );
    };

    const randomWelcome = () => {
        const msgs = [
            'Good to see you',
            'Welcome back',
            'Glad to have you back',
            'Long time no see',
        ];
        const rnd = Math.floor(Math.random() * msgs.length);
        return msgs[rnd];
    };

    const handleSaveProfile = async (form) => {
        const res = await fetchBase({
            method: 'POST',
            controller: 'users',
            endpoint: `update`,
            authorize: true,
            body: {
                bio: editForm.bio,
                location: editForm.location,
                link: editForm.link,
            },
        });

        if (res.updated) {
            setUser(prevUser => ({
                ...prevUser,
                bio: editForm.bio,
                location: editForm.location,
                link: editForm.link,
            }));

            setProfileModalOpen(false);
            toast.success("Profile updated!");
        }
        // setEditForm(editForm)

    }

    const handleCloseProfileModal = useCallback(() => {
        setProfileModalOpen(false)
    }, [])

    if (!user) {
        return <h1>No user found...</h1>
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white'>
            <FeedNavBar className='bg-white/10' />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-12'>
                    <div className='lg:col-span-1'>
                        <div className='bg-white/10 backdrop-blur-sm border border-white/20 text-white sticky top-8 p-6 rounded-md text-center'>
                            <div className='w-24 h-24 flex items-center justify-self-center border-4 border-white/20 rounded-full mb-2'>
                                <img src={user.img} className='rounded-full w-24' />
                            </div>
                            <h1 className='font-bold text-xl text-center mb-1'>@{user.username}</h1>
                            <p className='text-sm text-center text-white/80 mb-1'>{user.bio ? user.bio : 'No known bio.'}</p>
                            {(user.location && user.location.length > 0) && (
                                <div className='flex flex-row items-center justify-center text-sm text-white/70 mb-1 gap-2'>
                                    <i className='fas fa-map-pin'></i>
                                    <p>{user.location}</p>
                                </div>
                            )}
                            {(user.link && user.link.length > 0) && (
                                <div className='flex flex-row items-center justify-center text-sm text-white/70 mb-1 gap-2'>
                                    <i className='fas fa-link'></i>
                                    <p>{user.link}</p>
                                </div>
                            )}
                            <div className='backdrop-blur-sm border border-white/40 text-white flex items-center justify-center rounded-md gap-2 p-2 mt-2 cursor-pointer bg-white/20 hover:bg-white/30 transition-all' onClick={() => setProfileModalOpen(true)}>
                                <i className='fas fa-pen-to-square' />
                                <p className="font-bold text-sm">Edit Profile</p>
                            </div>
                        </div>
                    </div>
                    <div className='lg:col-span-3'>
                        <div className='gap-2 text-center mb-2'>
                            <h1 className='font-bold text-2xl text-center'>{welcomeMsg} <span className='text-yellow-200'>{user.username}</span></h1>
                            <p className='text-white/80 text-sm'>Share your thoughts and connect with minds that matter.</p>
                        </div>
                        {/* tweet section */}
                        {/* post section */}
                        <FeedInput img={user.img} onSend={postTweet} onUpdate={setTweet} value={tweet} />
                        <div className='space-y-4'>
                            {posts.map((post) => {
                                const date = new Date(post.created_at)
                                const timeAgo = formatDistanceToNow(new Date(post.created_at), { addSuffix: false })
                                return (
                                    <div className='bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all rounded-lg p-6'>
                                        <div className='flex flex-col space-x-4'>
                                            <div className='flex flex-row space-x-4'>
                                                <div className='flex flex-col items-center justify-center'>
                                                    <img src={post.img} className='w-12 h-12 border-2 border-white/30 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold' />
                                                </div>
                                                <div>
                                                    <div className='flex gap-2 items-center'>
                                                        <p className='font-bold text-md'>@{post.username}</p> <span className='text-white/60 text-xs'>·  {timeAgo}</span>
                                                    </div>
                                                    <p>{post.text}</p>
                                                    <div className='flex items-center flex-row gap-4'>
                                                        <div className='items-center text-white/80 cursor-pointer hover:bg-white/20 rounded-md' onClick={() => handleLike(post)}>
                                                            <div className='flex flex-row gap-2 items-center'>
                                                                <i className='fa-regular fa-heart' />
                                                                <h1>{post.likeCount} Likes</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer theme='dark' pauseOnHover={false} />
            <Modal isOpen={isProfileModalOpen} onClose={handleCloseProfileModal} title={"Edit profile"}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            value={editForm.bio}
                            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                        </label>
                        <input
                            id="location"
                            type="text"
                            value={editForm.location}
                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                            Website
                        </label>
                        <input
                            id="website"
                            type="text"
                            value={editForm.link}
                            onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex space-x-3 pt-4">
                        <button
                            onClick={handleSaveProfile}
                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={() => setProfileModalOpen(false)}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
