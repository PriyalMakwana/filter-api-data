import { useState,useEffect } from 'react';
import './App.css';

function App() {
  const [data,setData] = useState([])
  const [filtervalue,setFilterValue] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('');

useEffect(()=>{
   fetch('https://dummyjson.com/products')
   .then((res)=>res.json())
   .then((result)=>{
    setData(result.products)
    console.log(result.products)
 
  })

   .catch((err)=>{console.log(err)})
},[])
  
const Filter=(e)=>{
 
 const filterData = data.filter((item)=>item.brand.toLowerCase().includes(e.target.value))
 setFilterValue(filterData);
 //console.log(filterdata2);

}

const imagesFilter = (item)=>{
  const titleData = data.filter((item) =>
  item.title.toLowerCase().includes(selectedCategory.toLowerCase()));
setFilterValue(titleData);
console.log(titleData);
console.log(setFilterValue(titleData));
}


const handleprice = (min,max) => {
   let filterPrice = data.filter((item) =>item.price >= min && item.price <= max)
  setFilterValue(filterPrice);

  
  //console.log(filterPrice);
}


  return (
   <>
 
  <div className="container mt-5 ">
  <input type='text' onChange={Filter} />
  <button type="button" className="btn btn-outline-primary mx-2" onClick={()=>handleprice(0,300)}>0-300</button>
<button type="button" className="btn btn-outline-secondary" onClick={()=>handleprice(300,600)}>300-600</button>
<button type="button" className="btn btn-outline-success mx-2" onClick={()=>handleprice(600,900)}>600-900</button>
<button type="button" className="btn btn-outline-danger" onClick={()=>handleprice(900,1200)}>900-1200</button>
<button type="button" className="btn btn-outline-warning mx-2" onClick={()=>handleprice(1200,1500)}>1200-1500</button>
<button type="button" className="btn btn-outline-info" onClick={()=>handleprice(1500,1800)}>1500-1800</button>
<button type="button" className="btn btn-outline-light mx-2" onClick={()=>handleprice(1800,2000)}>1800-2000</button>

<select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="all">All</option>
          <option value="iphone">Iphone</option>
          <option value="laptop">Laptop</option>
          <option value="Key Holder">Key holder</option>
          <option value="perfume">Perfume</option>
          <option value="serum">Serum</option>~
          {/* Add more options as needed */}
        </select>
        <button type="button" className='mx-2 btn btn-outline-dark' onClick={imagesFilter}>
          Apply Filter
        </button>
  <div className="row ">
   {
    filtervalue.length>0 ?
    filtervalue.map((item,index)=> {
      
      return(
        <div className="col bg-secondary-subtle mx-2 my-2" key={index}>
          <img src={item.images[0]} className='img' alt={item.title}/><br/>
          <span className='text-break'>{item.id}</span><br/>
          <span>{item.title}</span><br/>
          <span>{item.brand}</span><br/>
          <span>{item.price} Rs</span><br/>
          <span>{item.rating}</span><br/>
          <span>{item.description}</span><br/>
    </div>
      )
    }):data.map((item,index)=> {
      
      return(
        <div className="col bg-secondary-subtle mx-2 my-2" key={index}>
          <img src={item.images[0]} className='img' alt={item.title}/><br/>
          <span className='text-break'>{item.id}</span><br/>
          <span>{item.title}</span><br/>
          <span>{item.brand}</span><br/>
          <span>{item.price} Rs</span><br/>
          <span>{item.rating}</span><br/>
          <span>{item.description}</span><br/>
        </div>

      )
    })
  }
   
  </div>
</div>
  
   </>
  );
}

export default App;