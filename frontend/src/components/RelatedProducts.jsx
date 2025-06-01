import React, { useContext, useEffect ,useState} from 'react'
import { ShopContext } from '../context/shopContext'
import ProductItem from './ProductItem';
import Title from './Title';

const RelatedProducts = ({category,subCategory}) => {
    const {products} =useContext(ShopContext);
    const [relatedProducts,setProducts]=useState([]);
    useEffect(() => {
        let newproducts = products.filter((item) => item.category === category);
        newproducts = newproducts.filter((item) => item.subCategory === subCategory);
        setProducts(newproducts.slice(0, 5));
      }, [products, category, subCategory]);
      
  return (
    <div  className='flex flex-col gap-3 mt-10'>
        <Title title1={"RELATED"} title2={"PRODUCTS"}></Title>
        <div className='grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5'>
      {
        relatedProducts.map((item,index)=>(
           <ProductItem key={item._id} id={item._id} name={item.name} image={item.image} price={item.price}></ProductItem>
        ))
      }
      </div>
    </div>
  )
}

export default RelatedProducts
