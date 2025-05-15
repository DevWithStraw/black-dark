import React, { useState, useRef, useEffect } from 'react';
import './newProduct.scss';
import axios from 'axios';
import { baseUrl, IMAGEBBKEY, IMAGEBBURL } from '@app/helpers/variables';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function NewProduct() {
    const queryClient = useQueryClient();
    const [imageSrc, setImageSrc] = useState("");
    const [categoryInput, setCategoryInput] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const dropdownRef = useRef(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post(`${IMAGEBBURL}?key=${IMAGEBBKEY}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        setImageSrc(response.data.data.url);
    };

    const queryFn = async () => {
        const { data } = await axios.get(`${baseUrl}/categories`);
        return data;
    };

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn
    });

    const filteredCategories = categories.filter(cat =>
        cat.category.toLowerCase().includes(categoryInput.toLowerCase())
    );

    const handleSelectCategory = (value) => {
        setCategoryInput(value);
        setShowSuggestions(false);
    };

    const mutationFn = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const selectedCategory = formData.get('categories');

        const isNewCategory = !categories.some(
            (cat) => cat.category.toLowerCase() === selectedCategory.toLowerCase()
        );

        if (selectedCategory && isNewCategory) {
            await axios.post(`${baseUrl}/categories`, { category: selectedCategory });
        }

        await axios.post(`${baseUrl}/products`, {
            title: formData.get('title'),
            enTitle: formData.get('en-title'),
            brand: formData.get('brand'),
            sizeSM: formData.get('sizeSM'),
            sizeS: formData.get('sizeS'),
            sizeM: formData.get('sizeM'),
            sizeL: formData.get('sizeL'),
            sizeXL: formData.get('sizeXL'),
            sizeXS: formData.get('sizeXS'),
            colorB: formData.get('colorB'),
            colorBe: formData.get('colorBe'),
            colorR: formData.get('colorR'),
            colorG: formData.get('colorG'),
            colorP: formData.get('colorP'),
            originalPrice: formData.get('originalPrice'),
            offerPrice: formData.get('offerPrice'),
            percentage: formData.get('percentage'),
            imageSrc,
            category: selectedCategory,
            slug: formData.get('en-title'),
        });

        queryClient.invalidateQueries({ queryKey: ['product-detail'] });
        queryClient.invalidateQueries({ queryKey: ['categories'] });
    };

    const { mutate } = useMutation({ mutationFn });

    // Close suggestions on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <form onSubmit={mutate}>
            <section className='rightSide'>
                <fieldset>
                    <legend>اطلاعات کلی محصول</legend>
                    <input className="newPrInput" name='title' type="text" placeholder='عنوان محصول شما' />
                    <input className="newPrInput" name='en-title' type="text" placeholder='عنوان انگیلیسی محصول شما' />
                    <input className="newPrInput" name='brand' type="text" placeholder='برند محصول شما' />

                    <div className="category-wrapper" ref={dropdownRef}>
                        <input
                            className="newPrInput"
                            name="categories"
                            type="text"
                            placeholder="دسته‌بندی محصول شما"
                            value={categoryInput}
                            onChange={(e) => {
                                setCategoryInput(e.target.value);
                                setShowSuggestions(true);
                            }}
                            autoComplete="off"
                        />
                        {showSuggestions && categoryInput && (
                            <ul className="suggestions">
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((cat, i) => (
                                        <li key={i} onClick={() => handleSelectCategory(cat.category)}>
                                            {cat.category}
                                        </li>
                                    ))
                                ) : (
                                    <li onClick={() => handleSelectCategory(categoryInput)}>
                                        {categoryInput}
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>
                </fieldset>

                <fieldset>
                    <legend>رنگ و سایزبندی</legend>
                    <div className="sizes">
                        <label>سایز های موجود:</label>
                        {['SM', 'S', 'M', 'L', 'XL', 'XS'].map((size) => (
                            <label key={size}>
                                {size} <input type="checkbox" name={`size${size}`} />
                            </label>
                        ))}
                    </div>
                    <div className="colors">
                        <label>رنگ‌های موجود:</label>
                        <label>Blue <input type="checkbox" name="colorB" /></label>
                        <label>Beige <input type="checkbox" name="colorBe" /></label>
                        <label>Red <input type="checkbox" name="colorR" /></label>
                        <label>Green <input type="checkbox" name="colorG" /></label>
                        <label>Pink <input type="checkbox" name="colorP" /></label>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>قیمت و تخفیف</legend>
                    <input className="newPrInput" name='originalPrice' type="text" placeholder='قیمت اصلی محصول' />
                    <input className="newPrInput" name='offerPrice' type="text" placeholder='قیمت بعد از تخفیف' />
                    <input className="newPrInput" name='percentage' type="text" placeholder='درصد تخفیف' />
                </fieldset>
            </section>

            <section className='leftSide'>
                <fieldset>
                    <legend>عکس محصول</legend>
                    <input type="file" name="image-product" onChange={handleImageChange} />
                    {imageSrc && <img src={imageSrc} alt='product' />}
                </fieldset>

                <div className="row">
                    <button type='submit'>ایجاد محصول</button>
                </div>
            </section>
        </form>
    );
}
