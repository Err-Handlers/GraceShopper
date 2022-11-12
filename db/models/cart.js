

const client = require('../client')

async function createCart ({userId}) {
    try {
        const { rows: [cart] } = await client.query(`
            INSERT INTO carts("userId")
            VALUES ($1)
            RETURNING *
        `, [userId])
        return cart
    } catch (error) {
        console.log(error);
    }
}

async function getCartByUserId ({id}) {
    try {
        const { rows: [cart] } = await client.query(`
            SELECT * FROM carts
            WHERE "userId" = $1
        `, [id])
        console.log('cart :>> ', cart);
        return cart;
    } catch (error) {
        console.log(error);
    }
}

async function addPastryToCartPastries (quantity, pastryId, cartId) {
    try {
        const { rows: [cartPastry] } = await client.query(`
            INSERT INTO cart_pastries(quantity, "pastryId", "cartId")
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [quantity, pastryId, cartId])
        return cartPastry
    } catch (error) {
        console.log(error);
    }
}

async function getPastriesByCartId (cartId) {
    try {
        const { rows } = await client.query(`
            SELECT * FROM cart_pastries
            JOIN pastries ON cart_pastries."pastryId" = pastries.id
            WHERE "cartId" = $1;
        `, [cartId])
        return rows
    } catch (error) {
        console.log(error)
    }
}

//get cartPastriesbyCartId 
//(cartId: 1, pastryId: 1, quantity: 3)
//(cartId: 1, pastrId: 2, quantity: 2)

//need to get pastries by cartId through cart_pastries

module.exports = {
    getCartByUserId,
    createCart,
    addPastryToCartPastries,
    getPastriesByCartId
}