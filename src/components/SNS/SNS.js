import React, { useEffect } from 'react';
import './SNS.css';

export default function SNS() {
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

    return(
    <div className="SNS">
        <blockquote 
            className="instagram-media" 
            data-instgrm-permalink="https://www.instagram.com/tkakrdpahd/?utm_source=ig_embed&amp;utm_campaign=loading" 
            data-instgrm-version="14" 
        ></blockquote>
    </div>
    );
}