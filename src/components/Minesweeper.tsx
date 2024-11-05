import Banner from "./Banner";
import Tiles from "./Tiles";





function Minesweeper() {

    return (
        <div className="bg-gray-200 border-solid border-4 border-gray-500">
            <Banner />
            <Tiles />
        </div>
    );
}


export default Minesweeper;