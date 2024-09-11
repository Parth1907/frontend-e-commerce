import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input, Textarea, Button, Typography, Card, CardHeader, CardBody } from '@material-tailwind/react';
import { toast } from "react-toastify"
import axios from 'axios';


export default function CreateProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    console.log(category);

    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const product = await axios.post('https://dummyjson.com/products/add', JSON.stringify({
                title, description, category, price, discountPercentage: discount, rating: 0
            }));
            console.log(product);

            toast.success("Product created successfully");
            navigate("/")
        } catch (error) {
            toast.error(`Error in creating product, ${error.response.data.error}`)
            console.error("Error in creating product", error);
        }
    }
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products/categories');
                const data = await response.json();
                console.log(data);

                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className='grid grid-cols-1 justify-items-center mt-8'>
            <Card className="w-96">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Create Product
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <Input
                                label='Title'
                                type="text"
                                value={title}
                                name="title"
                                onChange={({ target }) => setTitle(target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <Textarea
                                label='Description'
                                value={description}
                                name="description"
                                onChange={({ target }) => setDescription(target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <select onChange={({ target }) => setCategory(target.value)} className='w-full p-2 rounded border border-gray-400 text-sm text-gray-600 focus:border-gray-300 focus:ring-0 focus:outline-none'>
                                <option value="">Category</option>
                                {categories.map((category, index) => (
                                    <option value={category.slug} key={index}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2">
                            <Input
                                label='Price'
                                type="number"
                                value={price}
                                name="price"
                                onChange={({ target }) => setPrice(target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <Input
                                label='Discount'
                                type="number"
                                value={discount}
                                name="discount"
                                onChange={({ target }) => setDiscount(target.value)}
                            />
                        </div>
                        <Button
                            variant="gradient"
                            className="mb-4"
                            type="submit"
                            fullWidth
                        >
                            Create
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>

    )
}
