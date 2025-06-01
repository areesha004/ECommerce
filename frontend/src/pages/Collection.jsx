import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const[visible,setVisible]=useState(false);
  const {products,search,showSearch}=useContext(ShopContext);
  const[filteredProducts,setFilteredProducts]=useState([]);
  const [category,setCategory]=useState([]);
  const[subCategory,setSubCategory]=useState([]);
  const[sort,setSort]=useState("");

  const sorting=(e)=>{
     setSort(e.target.value);
  }

const toggleCategory=(e)=>{
if(category.includes(e.target.value)){
  setCategory(prev=>prev.filter(item=> item!=e.target.value))
}
else{
  setCategory(prev=>[...prev,e.target.value])
}
}
const toggleSubCategory=(e)=>{
  if(subCategory.includes(e.target.value)){
    setSubCategory(prev=>prev.filter(item=> item!=e.target.value))
  }
  else{
    setSubCategory(prev=>[...prev,e.target.value])
  }
  }

  useEffect(() => {
    let updatedProducts = [...products];
  
    if (category.length > 0) {
      updatedProducts = updatedProducts.filter(item => category.includes(item.category));
    }
  
    if (subCategory.length > 0) {
      updatedProducts = updatedProducts.filter(item => subCategory.includes(item.subCategory));
    }
    if (showSearch && search) {
      updatedProducts = updatedProducts.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
  
    // Sort
    if (sort === "low-high") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }
  
    setFilteredProducts(updatedProducts);
  }, [category, subCategory, sort, products,search,showSearch]);
  
  return (
    <div className='flex flex-col sm:flex-row '>

  
        {/* left side */}

      <div className='flex flex-col gap-4  '>

<div className='flex gap-2 items-center justify-center cursor-pointer' onClick={()=> visible?setVisible(false):setVisible(true)}>
<h1 className='font-medium text-2xl'>Filters</h1>
<img src={assets.dropdown_icon}   className={`w-3 h-3 ${visible ? "rotate-90" : ""}`}  alt=""  />
</div>

<div className={`flex flex-col  ${visible ? "block" : "hidden"} sm:block`}>

      <div className='flex flex-col border px-8 py-4 border-gray-500 mb-4 '>
        <h1 className='font-medium text-md mb-3'>COLLECTION</h1>
        <p className='flex gap-2 mb-1'>
          <input type="checkbox" value={"Men"} onChange={toggleCategory} />Men
        </p>
        <p className='flex gap-2 mb-1'>
          <input type="checkbox" value={"Women"} onChange={toggleCategory}/>Women
        </p>
        <p className='flex gap-2 mb-1'>
          <input type="checkbox" value={"Kids"} onChange={toggleCategory} />Kids
        </p>
      </div>

      <div className='flex flex-col border px-8 py-4 border-gray-500 '>
        <h1 className='font-medium text-md mb-3'>CATEGORIES</h1>
        <p className='flex gap-2 mb-1'>
          <input type="checkbox" value={"Topwear"} onChange={toggleSubCategory} />Topwear
        </p>
        <p className='flex gap-2 mb-1'>
          <input type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory} />Bottomwear
        </p>
        <p className='flex gap-2 mb-1'>
          <input type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} />Winterwear
        </p>
      </div>
   
</div>
      </div>

  
        {/* right side*/}
         <div className='flex-1 px-5'>
         <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title title1={"All"} title2={"Collections"}></Title>
           <select onChange={sorting} className='border px-2 text-sm border-gray-300'>
            <option  value="relevant">Sort by: Relevant</option>
            <option  value="high-low">Sort by: high to low</option>
            <option  value="low-high">Sort by: low to high</option>
           </select>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
           {
            filteredProducts.map((item)=>(
              <ProductItem key={item._id} name={item.name} id={item._id} image={item.image} price={item.price}></ProductItem>

            ))
           }
        </div>
         </div>
      

      
    </div>
  )
}

export default Collection
