import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

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
                    button.onclick = () => {
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
                        <li><Link to='/SNS'>SNS</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                    </ul>
                </li>
                <li id="blog">
                    <h4>Blog</h4>
                    <ul className="subMenu">
                        <li><a href="https://blog.mdoo.info" target="_blank" rel="noreferrer noopener">EN Blog</a></li>
                        <li><a href="https://blog.mdoo.pe.kr" target="_blank" rel="noreferrer noopener">KR Blog</a></li>
                    </ul>
                </li>
                <li id="portfolios">
                    <h4>Portfolios</h4>
                    <ul className="subMenu">
                        <li><a href="https://mdoo_pri.artstation.com" target="_blank" rel="noreferrer noopener">ArtStation</a></li>
                        <li><a href="https://github.com/tkakrdpahd" target="_blank" rel="noreferrer noopener">GitHub</a></li>
                        <li><a href="https://mdoo12.itch.io" target="_blank" rel="noreferrer noopener">Itch.io</a></li>
                    </ul>
                </li>
                <li id="shop">
                    <h4><Link to='/shop'>Shop</Link></h4>
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
