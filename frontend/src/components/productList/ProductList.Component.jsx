import {useEffect, useState} from 'react';
import {
    GetAllProducts,
    SearchProducts,
} from '../../services/product.service';
import ProductListItemComponent from './components/ProductListItem.Component';
import {useParams, useSearchParams} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {toggleLoader} from "../../redux/loader.slicer";
import ContainerComponent from '../../UIkit/Container.Component';

const perPageNums = [4, 8, 12, 16, 20, 24];
const ProductListComponent = () => {
    const dispatch = useDispatch();
    const [productList, setProductList] = useState([]);
    const [errMsg, setErrMsg] = useState();
    const params = useParams();
    const [queryParams, setQueryParams] = useSearchParams()
    const [paginationObject, setPaginationObject] = useState({
        page: queryParams.has("page") ? queryParams.get("page") - 1 : 0,
        totalItems: 0,
        elPerPage: queryParams.has("limit") ? queryParams.get("limit") : 12
    });

    useEffect(() => {
        dispatch(toggleLoader(true));
        setProductList([]);
        setErrMsg('');
        if (!params.searchParam) {
            loadAllProducts()
        } else {
            onSearch()
        }
    }, [params])

    useEffect(() => {
        // isNaN = is not a number
        !isNaN(paginationObject.page) && loadAllProducts()
        setQueryParams({
            limit: paginationObject.elPerPage,
            page: paginationObject.page + 1
        })
    }, [paginationObject.page, paginationObject.elPerPage])

    // DRY - don't repeat yourself
    const loadAllProducts = () => {
        GetAllProducts(paginationObject.elPerPage, paginationObject.page)
            .then(response => {
                setProductList(response.data.elements);
                setPaginationObject(response.data.pagination);
            })
            .catch(error => {
                console.log(error);
                setErrMsg(error.message);
            })
            .finally(() => {
                dispatch(toggleLoader(false));
            });
    }

    const onSearch = () => {
        SearchProducts(params.searchParam.replaceAll('-', ' '))
            .then(response => {
                if (response.status === 209) {
                    return setErrMsg(`No products for key: ${params.searchParam.replaceAll('-', ' ')}`);
                }
                setProductList(response.data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                dispatch(toggleLoader(false));
            });
    }

    const renderProductListView = () => {
        if (productList.length) {
            return productList.map((item, index) => {
                return (
                    <ProductListItemComponent product={item} key={index} />
                );
            });
        }
        return <h2>No products.</h2>;
    };

    const renderPaginationNums = () => {
        let pagesNum = Math.ceil(
            paginationObject.totalItems / paginationObject.elPerPage
        );
        let pagesArray = [...Array(pagesNum).keys()];

        return pagesArray.map((number) => (
            <li
                className={(number + 1 == queryParams.get("page") ? "active " : "") + "page-item"}
                key={number}
                onClick={() => {
                    setPaginationObject((prevState) => ({
                        ...prevState,
                        page: number,
                    }));
                }}>
                <p className='page-link'>{number + 1}</p>
            </li>
        ));
    };

    const renderPerPageDropDown = () =>
        perPageNums.map((number, index) => (
            <p
                className='dropdown-item'
                key={index}
                onClick={() =>
                    setPaginationObject((prevState) => ({
                        ...prevState,
                        elPerPage: number,
                    }))
                }>
                {number}
            </p>
        ));
    return (
        <>
        {errMsg ? <p>{errMsg}</p> : null}
            {renderProductListView()}
                <div className='col-12 my-3 d-flex justify-content-center'>
                    <div className='dropdown'>
                        <button
                            className='btn btn-secondary dropdown-toggle'
                            type='button'
                            id='dropdownMenuButton'
                            data-bs-toggle='dropdown'
                            aria-haspopup='true'
                            aria-expanded='false'>
                            Per page: {paginationObject.elPerPage}
                        </button>
                        <div
                            className='dropdown-menu'
                            aria-labelledby='dropdownMenuButton'>
                            {renderPerPageDropDown()}
                        </div>
                    </div>
                    <nav
                        aria-label='Page navigation example'
                        className='d-flex justify-content-center'>
                        <ul className='pagination'>
                            <li
                                className='page-item'
                                onClick={() => {
                                    // if (paginationObject.page) -> same code
                                    if (paginationObject.page > 0)
                                    setPaginationObject((prevState) => ({
                                        ...prevState,
                                        page: prevState.page - 1,
                                    }));
                                }}>
                                <p className='page-link'>Previous</p>
                            </li>
                            {renderPaginationNums()}
                            <li
                                className='page-item'
                                onClick={() => {
                                    let pagesNum = Math.ceil(
                                        paginationObject.totalItems /
                                        paginationObject.elPerPage
                                        );
                                        if (paginationObject.page + 1 < pagesNum)
                                        setPaginationObject((prevState) => ({
                                            ...prevState,
                                            page: prevState.page + 1,
                                        }));
                                    }}>
                                <p className='page-link'>Next</p>
                            </li>
                        </ul>
                    </nav>
                </div>
        </>
    );
};

export default ProductListComponent;
