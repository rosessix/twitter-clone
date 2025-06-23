export const FeedInput = ({img, onSend, onUpdate, value}) => {
    return (
        <div className='backdrop-blur-sm border border-white/20 rounded-md bg-white/10 p-6 mb-4'>
            <div className="flex gap-4">
                <div className="">
                    <img src={img} className='w-12 h-12 border-2 border-white/30 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold'/>
                </div>
                <div className="flex-1">
                    <textarea className="bg-white/10 border border-white/20 rounded-md p-2 text-white text-lg w-full placeholder:text-white/40 outline-none focus:ring-2 focus:ring-white/30" rows="2" cols="50" placeholder="What's happening?" onChange={e => onUpdate(e.target.value)} value={value}></textarea>
                </div>                    
            </div>
            <div className="flex">
                <div className="flex-1">
                    <button className="bg-yellow-300 mt-1 hover:bg-yellow-400 text-purple-600 font-bold p-2 w-24 rounded-md float-right" onClick={onSend}>Tweet</button>
                </div>
            </div>
        </div>
    )
}