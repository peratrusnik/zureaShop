import React, {useEffect, useState} from 'react';
import {GetTopTwoProducts} from '../../services/product.service';
import {Link} from 'react-router-dom';
import ContainerComponent from "../../UIkit/Container.Component";

const TopTwoProductsComponent = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        GetTopTwoProducts().then((res) => {
            setProducts(res.data);
        });
    }, []);

    const renderProducts = () => {
        return products.map((el) => {
            return (
                <div key={el._id} className='col-md-6 col-sm-6 col-xs-12r'>
                    <div className='row-hover'>
                        <div className='wrapper'>
                            <div className='left-holder'>
                                <div className='left-holder-wrapper'>
                                    <h4>{el.title}</h4>
                                    <Link
                                        className='btn-Shop'
                                        to={`/productDetails/${el._id}`}>
                                        <span>Shop now</span>
                                    </Link>
                                </div>
                            </div>
                            <div className='img-products'>
                                <img className='products' src={el.imgUrl} alt={el.title}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <>
            <ContainerComponent>
                <div className='two-links-main-container'>
                    <div className='two-links-container'>
                        <div className='row'>
                            {products.length > 0 && renderProducts()}
                        </div>
                    </div>
                </div>
            </ContainerComponent>

        </>
    );
};

export default TopTwoProductsComponent;
