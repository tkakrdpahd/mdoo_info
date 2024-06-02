import './SNS.css';

export default function SNSPage() {
    return(
        <div className='SNSPage'>
            <div className="LinkedIn">
                <a href="https://www.linkedin.com/in/minseok-doo/" target="_blank" rel="noreferrer noopener">
                    <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F5bJFg%2FbtsHKJ3Amqs%2FHD9a6kOAva2dFxBKWf1GPK%2Ftfile.svg"/>
                    <h4>LinkedIn Account</h4>
                </a>
            </div>
            <div className='Instagram'>
                <a href='https://www.instagram.com/tkakrdpahd/' target="_blank" rel="noreferrer noopener">
                    <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbeNSBW%2FbtsHKirVtUU%2FEiTyBktR1VORiXr1FC21mK%2Fimg.png'/>
                    <h4>Instagram Account</h4>
                </a>
            </div>
        </div>
    );
}