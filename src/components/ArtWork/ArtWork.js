import React, { useEffect } from 'react';
import "./ArtWork.css";

function ArtWork() {
    useEffect(() => {
        // Instagram embed script
        const script = document.createElement('script');
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return (
        <article className="artwork">
            <div className="mainArtwork">
                <img src="https://cdna.artstation.com/p/assets/images/images/070/687/252/large/minseok-doo-img-9302.jpg?1703178582" alt="Artwork" />
                <p></p>
                <h4>Title: Where is your home?</h4>
                <h4>Year: 2023</h4>
                <h4>Medium: Soapstone</h4>
            </div>
            <div className="SNS">
                <blockquote 
                    className="instagram-media" 
                    data-instgrm-permalink="https://www.instagram.com/tkakrdpahd/?utm_source=ig_embed&amp;utm_campaign=loading" 
                    data-instgrm-version="14" 
                    style={{ 
                        background: '#FFF', 
                        border: 0, 
                        borderRadius: '3px', 
                        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', 
                        margin: '1px', 
                        maxWidth: '540px', 
                        minWidth: '326px', 
                        padding: 0, 
                        width: 'calc(100% - 2px)'
                    }}
                ></blockquote>
            </div>
        </article>
    );
}

export default ArtWork;
