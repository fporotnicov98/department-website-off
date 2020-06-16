import React from 'react';
import Slider from "react-slick";
import style from './Slider.module.scss';
// import space1 from './../../asets/image/slider/1.jpg';
// import space2 from './../../asets/image/slider/2.jpg';
// import space3 from './../../asets/image/slider/3.jpg';
// import space4 from './../../asets/image/slider/4.jpg';
// import space5 from './../../asets/image/slider/5.jpg';
// import logo from './../../asets/image/logo.png'
import korpus from './../../asets/image/korpus.png'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Carousel extends React.Component {
    settings = {
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        pauseOnDotsHover: true,
    };
    render() {
        return (
            <div className={style["wrapper"]} style={{ background: `url(${korpus})` }}>
                <Slider {...this.settings}>
                    {this.props.sliderNews && this.props.sliderNews.map((item, index) =>
                            <div key={index} className={style['item']}>
                                <div className={style['body']}>

                                    <div className={style['content']}>
                                        <div className={style['news']}>
                                            <div className={style['title']}>{item.theme}</div>
                                            <div className={style['text']}>{item.newsText}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                </Slider>
            </div>
        );
    };
}


export default Carousel; 