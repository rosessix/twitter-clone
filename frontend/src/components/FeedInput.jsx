export const FeedInput = (props) => {
    const {img, onSend, onUpdate} = props;  
    return (
        <>
            <div className="flex">
                <div className="m-2 w-10 py-1">
                    <img className="inline-block h-10 w-10 rounded-full" src={img} alt="" />
                </div>
                <div className="flex-1 px-2 pt-2 mt-2">
                    <textarea className="bg-transparent text-white font-medium text-lg w-full placeholder:text-gray-400" rows="2" cols="50" placeholder="What's happening?" onChange={e => onUpdate(e.target.value)}></textarea>
                </div>                    
            </div>
            <div className="flex p-3">
                <div className="flex-1">
                    <button className="bg-slate-500 mt-1 hover:bg-slate-400 text-white font-bold py-2 px-8 mr-5 rounded-full float-right" onClick={onSend}>Tweet</button>
                </div>
            </div>
        </>
    )
}