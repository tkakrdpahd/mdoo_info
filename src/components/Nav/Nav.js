import './Nav.css';
import React, { useEffect } from 'react';

function setCssForMobile() {
    const h4Elements = document.querySelectorAll('nav li h4');
    h4Elements.forEach(h4 => {
        h4.addEventListener('click', event => {
            if (window.innerWidth <= 1079) {
                const listItems = h4.parentElement.querySelectorAll('ul');
                listItems.forEach(ul => {
                    ul.style.display = 'flex';
                });

                const button = document.getElementById('ulButton');
                if (button) {
                    button.style.display = 'block';
                    button.onclick = () => {  // Add a click event listener to the button
                        listItems.forEach(ul => {
                            ul.style.display = 'none';
                        });
                        button.style.display = 'none';
                    };
                }
            }
        });
    });
}

function Nav() {
    useEffect(() => {
        setCssForMobile();
    }, []);

    const handleButtonClick = () => {
        setCssForMobile();
    };

    return (
        <nav>
            <ul>
                {/* button for mobile */}
                <button id="ulButton" onClick={handleButtonClick}>
                    <span>X</span>
                </button>

                <li id="profileAndSns">
                    <h4>Profile & SNS</h4>
                    <ul className="subMenu">
                        <li><a href="file/Resume.pdf">Curriculum Vitae</a></li>
                        <li><a href="https://www.linkedin.com/in/minseok-doo/">LinkedIn</a></li>
                    </ul>
                </li>
                <li id="blog">
                    <h4>Blog</h4>
                    <ul className="subMenu">
                        <li><a href="https://blog.mdoo.info">EN Blog</a></li>
                        <li><a href="https://blog.mdoo.pe.kr">KR Blog</a></li>
                    </ul>
                </li>
                <li id="portfolios">
                    <h4>Portfolios</h4>
                    <ul className="subMenu">
                        <li><a href="https://mdoo_pri.artstation.com">ArtStation</a></li>
                        <li><a href="https://github.com/tkakrdpahd">GitHub</a></li>
                        <li><a href="https://mdoo12.itch.io">Itch.io</a></li>
                    </ul>
                </li>
                <li id="shop">
                    <h4>Shop</h4>
                    <ul className="subMenu">
                        <li><a href="https://kmong.com/@%EC%82%AC%EB%AA%BD%54%41" target="_blank" rel="noreferrer noopener">Kmong</a></li>
                        <li><a href="https://www.paypal.com/ncp/payment/CQF7NLNYYKTKE" target="_blank" rel="noreferrer noopener">PayPal</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
