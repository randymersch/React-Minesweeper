

function Banner() {

    return (

        <div className="border-solid border-gray-400 border-4 p-4 grid grid-cols-3">
            <span className="text-red-700 font-bold">
                score
            </span>

            <button>
                start
            </button>

            <span className="text-red-700 font-bold">timer</span>
        </div>

    );
}

export default Banner;