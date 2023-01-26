import React,{useState, useEffect} from 'react'
import { Navbar } from './Navbar'
import { Products } from './Products'
import { FilteredProduct } from './FilteredProduct'

export const Home = (props) => {
    const [spans,setSpans]=useState([]);
    const [cartProduct,setCartProduct] = useState([]);
    const [products, setProducts]=useState([]);
    const [category, setCategory]=useState('');
    const [filteredProducts, setFilteredProducts]=useState([]);
  
    // getting products function
    const getProducts = ()=>{
        let cato = [];
        fetch('https://dummyjson.com/products?limit=100').
        then(res=>res.json()).
        then(data=>{
            if(data && data.products){
              var categories =   [...new Map(data.products.map(item => [item["category"], item])).values()]  
            }
          categories.forEach(cat=>cato.push({"id":cat.category,text:cat.category}));
            setProducts(data.products)});
            setSpans(cato);
        
    }

    useEffect(()=>{
        let cartProducts = JSON.parse(sessionStorage.getItem('cartProducts'));
        if(cartProducts && cartProducts.length>0){
            setCartProduct(cartProducts);
        }
        getProducts();
    },[])

    // getting cart products   
    useEffect(()=>{ 
        getProducts();      
    },[])  

    // globl variable
    let Product;

    // add to cart
    const addToCart = (product)=>{
            Product=product;
            let cartProducts = cartProduct;
            Product['qty']=1;
            Product['TotalProductPrice']=Product.qty*Product.price;
           let sameCartProducts = cartProducts.filter(prod=>prod.id==product.id);
           if(sameCartProducts.length==0){
            setCartProduct([...cartProduct,Product]);
            cartProducts.push(Product);
            sessionStorage.setItem('cartProducts',JSON.stringify(cartProduct));
           }
    }

    // handle change ... it will set category and active states
    const handleChange=(individualSpan)=>{
        setCategory(individualSpan.text);
        filterFunction(individualSpan.text);
    }


    // filter function
    const filterFunction = (text)=>{
        if(products.length>1){
            const filter=products.filter((product)=>product.category===text);
            setFilteredProducts(filter);
        }
        else{
            console.log('no products to filter')
        } 
    }

    // return to all products
    const returntoAllProducts=()=>{
        setCategory('');
        setFilteredProducts([]);
    }

    return (
        <>
            <Navbar totalProducts={cartProduct.length}/>           
            <br></br>
            <div className='container-fluid filter-products-main-box'>
                <div className='filter-box'>
                    <h6>Filter by category</h6>
                    {spans.map((individualSpan,index)=>(
                        <span key={index} id={individualSpan.id}
                        onClick={()=>handleChange(individualSpan)}
                        >{individualSpan.text}</span>
                    ))}
                </div>
              
                {filteredProducts.length > 0&&(
                  <div className='my-products'>
                      <h1 className='text-center'>{category}</h1>
                      <a href="javascript:void(0)" onClick={returntoAllProducts}>Return to All Products</a>
                      <div className='products-box'>
                          {filteredProducts.map(individualFilteredProduct=>(
                              <FilteredProduct key={individualFilteredProduct.ID}
                              individualFilteredProduct={individualFilteredProduct}
                              addToCart={addToCart}/>
                          ))}
                      </div>
                  </div>  
                )}
                {filteredProducts.length < 1&&(
                    <>
                        {products.length > 0&&(
                            <div className='my-products'>
                                <h1 className='text-center'>All Products</h1>
                                <div className='products-box'>
                                    <Products products={products} addToCart={addToCart}/>
                                </div>
                            </div>
                        )}
                        {products.length < 1&&(
                            <div className='my-products please-wait'>Please wait...</div>
                        )}
                    </>
                )}
            </div>       
        </>
    )
}
