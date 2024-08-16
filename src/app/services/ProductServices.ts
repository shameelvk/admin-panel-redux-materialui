export class ProductServices{
    static async getProducts() {
         const response = await fetch('https://api.escuelajs.co/api/v1/products',{ cache: 'no-store' });
         const data = await response.json();
         return data;
       }

       static async addProduct({ title, price, description, categoryId, image }:any){
        const response = await fetch('https://api.escuelajs.co/api/v1/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, price, description, categoryId, images: [image] }),
        });
    
        return response
       }

       static async fetchProductById(id:any) {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, { cache: 'no-store' });
        const data = await response.json();
        return data;
      }
    
      static async updateProduct({ id, title, price, description }:any) {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({title,price,description}),
        });
    
        if (!response.ok) {
          throw new Error('Failed to update product');
        }
    
        const data = await response.json();
        return data;
      }
    }




    
export class CategorieServices{
  static async getCategories() {
    const response = await fetch('https://api.escuelajs.co/api/v1/categories',{ cache: 'no-store' });
    const data = await response.json();
    return data;
  }

  static async updateCategorie({ id, name }:any) {
    const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name}),
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    const data = await response.json();
    return data;
  }

  static async addcategory({name, image }:any){
    const response = await fetch('https://api.escuelajs.co/api/v1/categories/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, image }),
    });

    return response
  }
   
}
    