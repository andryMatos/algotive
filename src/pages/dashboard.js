import { useState } from "react";
import data from '../data/data.json';

const Dashboard = () => {

    const [videos, setVideos] = useState(data);

    const handlePlay = () => {

        const newVideos = [...videos];
        let arrayNew = newVideos.map(function(element){
            return {
                ...element,
                select: 1
            }
        })
        setVideos(arrayNew);

    }

    return(
        <>
            <div className="container">
                <h1 className="text-center mb-5 mt-5">Cualquier usuario logueado puede ver esto</h1>
                <div className="row text-center">
                    {
                        videos.map((item, idx) => (
                            <div className="col-12 col-md-6 col-lg-4 mt-4 mb-4 ml-4" key={idx}>
                                <iframe className="videos" title={`${item.name} - ${idx}`}
                                src={`https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=${item.select}`}>
                                </iframe>
                            </div>
                        ))
                    }
                </div>
                <div className="row text-center">
                    <div className="col-12 col-md-12 col-lg-12 text-center">
                        <button className="btn btn-primary" onClick={handlePlay}>Play Stream</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Dashboard;
