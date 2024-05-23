import './Nav.css';

function Nav(){
    const handleButtonClick = () => {
        // 여기에 버튼 클릭 시 수행할 동작을 작성합니다.
        console.log('Button clicked!');
    };

    return(
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
            </ul>
        </nav> 
    );
}

export default Nav;