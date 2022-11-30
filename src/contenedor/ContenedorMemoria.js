class ContenedorMemoria {
    constructor(arr) {
        this.arr = arr;
    }

    async getItems(){
        return this.arr;  
    }

    async getById(id) {
        return this.arr.find(prod => prod.id === id) || { error: 'producto no encontrado' };
    }

    async save(objItem) {
        if(this.arr.length == 0){
            objItem.id = 1;
        }else{
            let id = this.arr[this.arr.length-1].id
            objItem.id = id + 1;
        }
        this.arr.push(objItem);
        return this.arr;
    }

    async deleteById(id) {
        const nuevaLista = this.arr.filter(prod => prod.id !== id);
        this.arr = nuevaLista;
        return this.arr;
    }
 
}
export default ContenedorMemoria;