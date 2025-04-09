export default class ProductResDTO {
    constructor(product){
        this.title = product.title + ' (' + product.platform + ')';
        this.precio = product.precio;
        this.plataforma = product.platform
    }
}