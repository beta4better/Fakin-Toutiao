import React, {Component} from 'react';
import Swiper from 'swiper/dist/js/swiper'
import "swiper/dist/css/swiper.min.css"
import {Link} from 'react-router-dom'
import './swiper.styl'
class Banner extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        new Swiper('.swiper-container', {
            direction: 'vertical',
            effect: 'fade',
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: true,
            loop: true, // 循环模式选项
        })
    }

    render() {
        return (
            <div className="swiper">
                <div className='swiper-container'>
                    <div className="swiper-wrapper">
                        {
                            this.props.list.map((item) => {
                                return <div key={item.id} className="swiper-slide">
                                    <div className="swiper-item">
                                        <img src={item.image} alt="" className="banner-img"/>
                                        <p className="swiper-title">{item.title}</p>
                                    </div>

                                </div>
                            })
                        }
                    </div>
                    <div className="swiper-pagination">

                    </div>
                </div>
            </div>
        )
    }
}
export default Banner