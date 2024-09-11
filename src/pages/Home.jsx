import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Card, CardFooter, CardBody, CardHeader, Typography, Button, Input } from '@material-tailwind/react'
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaSearch, FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify"

export default function Home() {
	const [products, setProducts] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalProducts, setTotalProducts] = useState(0)
	const [search, setSearch] = useState("")
	const pageSize = 12

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const skip = (currentPage - 1) * pageSize
				const response = await axios.get(`https://dummyjson.com/products?limit=${pageSize}&skip=${skip}`);
				setProducts(response.data.products);
				setTotalProducts(response.data.total);
			} catch (error) {
				console.error('Error fetching products: ', error)
			}

		}
		fetchProducts()
	}, [currentPage])


	const totalPages = totalProducts > 0 ? Math.ceil(totalProducts / pageSize) : 1

	const handleDelete = async (id) => {
		try {
			const product = await axios.delete(`https://dummyjson.com/products/${id}`)
			toast.success("Product deleted successfully");
			const filteredProducts = products.filter((product) => product.id !== id);
			const productId = pageSize + currentPage
			const response = await axios.get(`https://dummyjson.com/products/${productId}`)
			const newProduct = response.data
			setProducts([...filteredProducts, newProduct])
		} catch (error) {
			toast.error(`Error in deleting product, ${error.response.data.error}`)
			console.error("Error in deleting product", error);
		}
	}

	const handleSearch = async () => {
		const response = await axios.get(`https://dummyjson.com/products/search?q=${search}`);
		setProducts(response.data.products)
		setTotalProducts(response.data.products.length)
	}

	const handleSort = async (param, order = "asc") => {
		const skip = (currentPage - 1) * pageSize
		const response = await axios.get(`https://dummyjson.com/products?sortBy=${param}&order=${order}&limit=${pageSize}&skip=${skip}`);
		setProducts(response.data.products)
	}
	return (
		<div className="flex flex-col items-center">
			<Typography variant='h1' className='ml-4 text-center'>Welcome to E-commerce website</Typography>
			<Typography variant='h2' >Browse or search for various products</Typography>
			<Link to="/create/product"> <Button className='mb-3'>Create new Product</Button></Link>
			<div className="flex items-center justify-center mb-4 w-[67%] border border-gray-500 px-4 py-2 rounded ">
				<input value={search} onChange={({ target }) => setSearch(target.value)} className='w-full  focus:outline-none' placeholder='Search Products' />
				<button onClick={handleSearch}>
					<FaSearch />
				</button>
			</div>
			<div className="flex items-center mb-16 w-[67%] px-4 py-2 gap-4">
				Sort By :
				<Button variant='text' onClick={() => handleSort("category")}>Category</Button>
				<Button variant='text' onClick={() => handleSort("price")}>Price</Button>
				<Button variant='text' onClick={() => handleSort("discountPercentage","desc")}>Discount</Button>
				<Button variant='text' onClick={() => handleSort("rating","desc")}>Rating</Button>
			</div>
			{products.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
					{
						products.map((product) => (
							<Card className='ransition-transform transform hover:scale-105 hover:shadow-lg glow-on-hover relative overflow-hidden w-64' key={product.id}>
								<CardHeader className="flex justify-center my-4" shadow={false}>
									<img src={product.thumbnail} alt={product.title} className="object-contain h-44" />
								</CardHeader>
								<CardBody>
									<Typography className="text-lg">
										{product.title}
									</Typography>
									<Typography className="flex items-center gap-1 text-sm font-semibold">
										<BiSolidCategoryAlt />
										{product.category}
									</Typography>
									<Typography className="flex text-sm font-semibold  text-white  ">
										<span className='bg-green-500 px-2 rounded flex items-center gap-1'>
											{product.rating} <FaStar className='text-xs' />
										</span>
									</Typography>
									<Typography className="text-sm">
										<span className="font-semibold mr-2 text-lg">
											₹{(product.price - product.price * (product.discountPercentage * 0.01)).toFixed(2)}
										</span>
										<span className="line-through text-gray-600 mr-2">
											₹{product.price}
										</span>
										<span className='text-green-500 font-semibold'>
											{product.discountPercentage}% off
										</span>
									</Typography>
								</CardBody>
								<CardFooter>
									<Button onClick={() => handleDelete(product.id)} className='absolute bottom-4'>Delete</Button>
								</CardFooter>
							</Card>

						))
					}
				</div>
			) : (<Typography variant='h2' className='text-center mb-16' color='red'>"No products found"</Typography>)}

			<div className="flex justify-center items-center space-x-4 mb-4">
				<Button variant='text' disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
				<Typography>{currentPage} / {totalPages}</Typography>
				<Button variant='text' disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
			</div>
		</div>
	)
}
