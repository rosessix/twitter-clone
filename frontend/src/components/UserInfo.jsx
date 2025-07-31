import React from 'react'
import { useUser } from '../hooks/useUser';

const UserInfo = ({openModal}) => {
    const { user, setUser } = useUser();
    
    return (
        <div className='lg:col-span-1'>
            <div className='bg-white/10 backdrop-blur-sm border border-white/20 text-white sticky top-8 p-6 rounded-md text-center'>
                <div className='max-w-24 max-h-24 flex items-center justify-self-center border-4 border-white/20 rounded-full mb-2'>
                    <img src={user.img} className='rounded-full min-w-24 min-h-24 max-w-24 max-h-24 object-cover' />
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
                <div className='backdrop-blur-sm border border-white/40 text-white flex items-center justify-center rounded-md gap-2 p-2 mt-2 cursor-pointer bg-white/20 hover:bg-white/30 transition-all' onClick={openModal}>
                    <i className='fas fa-pen-to-square' />
                    <p className="font-bold text-sm">Edit Profile</p>
                </div>
            </div>
        </div>
    )
}

export default UserInfo