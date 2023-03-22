import ProductListComponent from "../components/productList/ProductList.Component";
import ContainerComponent from "../UIkit/Container.Component";
import HeaderComponent from "../UIkit/Header.Component";

const ShopPageComponent = () => {

    return (
        <>
            <HeaderComponent title="Shop" subtitle="Shop" titlePosition='left-center' banner='shop' />
            <ContainerComponent>
                <ProductListComponent />
            </ContainerComponent>
        </>
    )
}

export default ShopPageComponent