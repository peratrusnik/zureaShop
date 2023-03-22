import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        totalCount: 0,
        totalPrice: 0,
        user: {}
    },
    reducers: {
        addToCart: (state, action) => {
            let copyArray = [...state.cart];
            let findIndex = null;
            copyArray.find((el, index) => {
                if (el._id === action.payload._id) {
                    findIndex = index;
                    return;
                }
            });

            if (findIndex === null) {
                copyArray.push({
                    ...action.payload,
                    count: action.payload.count || 1,
                    cartTotal:
                        action.payload.price * action.payload.count ||
                        action.payload.price * 1,
                });
                state.totalPrice +=
                    action.payload.price * action.payload.count ||
                    action.payload.price * 1;
                state.totalCount++;
            } else {
                copyArray[findIndex].count += action.payload.count || 1;
                copyArray[findIndex].cartTotal +=
                    action.payload.price * action.payload.count ||
                    action.payload.price * 1;
                state.totalPrice +=
                    action.payload.price * action.payload.count ||
                    action.payload.price * 1;
            }
            state.cart = copyArray;
            cartSlice.caseReducers.updateLocalStorage(state)
            // localStorage.setItem(
            //     'cart',
            //     JSON.stringify({
            //         cart: state.cart,
            //         totalCount: state.totalCount,
            //         totalPrice: state.totalPrice,
            //     })
            // );
        },
        restoreCart: (state, action) => {
            state.cart = action.payload.cart;
            state.totalPrice = action.payload.totalPrice;
            state.totalCount = action.payload.totalCount;
        },
        deleteFromCart: (state, action) => {
            let {id, index} = action.payload;
            console.log(id, index);
            let copyCart = [...state.cart];

            // copyCart.splice(index, 1);
            state.totalCount--;
            state.cart = copyCart.filter((el) => {
                return el._id !== id
            });
            state.totalPrice = subTotal(copyCart);
            cartSlice.caseReducers.updateLocalStorage(state)
            // localStorage.setItem(
            //     'cart',
            //     JSON.stringify({
            //         cart: state.cart,
            //         totalPrice: state.totalPrice,
            //         totalCount: state.totalCount,
            //     })
            // );
        },

        setPrice: (state, action) => {
            const {increment, index} = action.payload;

            let copyArray = [...state.cart];

            copyArray[index].cartTotal +=
                copyArray[index].price * increment;

            state.totalPrice = subTotal(copyArray);

            if (copyArray[index].count === 1 && increment === -1) {
                copyArray.splice(index, 1);
                state.totalPrice = subTotal(copyArray);
                state.totalCount--;
            } else {
                copyArray[index].count += increment;
            }

            state.cart = copyArray;
            cartSlice.caseReducers.updateLocalStorage(state)
            // localStorage.setItem(
            //     'cart',
            //     JSON.stringify({
            //         cart: state.cart,
            //         totalCount: state.totalCount,
            //         totalPrice: state.totalPrice,
            //     })
            // );
        },

        updateLocalStorage: (state) => {

            localStorage.setItem(
                'cart',
                JSON.stringify({
                    cart: state.cart,
                    totalCount: state.totalCount,
                    totalPrice: state.totalPrice,
                })
            );
        },


        setCustomer: (state, action) => {
            state.user = action.payload
        }
    },
});

function subTotal(cart) {
    return cart.reduce((acc, current) => {
        return acc + current.cartTotal;
    }, 0);
}

export const {addToCart, restoreCart, deleteFromCart, setPrice, setCustomer} =
    cartSlice.actions;
export default cartSlice.reducer;
