import Reccords2 from '../elements/Reccords2'


  const fetchProducts = async () => {
  const res = await fetch('http://localhost:8080/api/products')
  if (!res.ok) throw new Error('Failed to load products')
  return res.json()
}


