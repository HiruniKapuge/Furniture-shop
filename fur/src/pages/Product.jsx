
import React, { useContext, useState, useEffect, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RelatedProducts from '../components/RelatedProducts';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

// Helper: format date nicely
const formatDate = (dateString) => new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric'
});

const Product = () => {
    const { productId } = useParams();
    const { backendUrl, currency, addToCart, token, user } = useContext(ShopContext);

    const [productData, setProductData] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('description');
    const [reviewText, setReviewText] = useState('');
    const [reviewImage, setReviewImage] = useState(null);
    const fileInputRef = useRef();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await axios.post(`${backendUrl}/api/product/single`, { productId });
                if (res.data.success) {
                    setProductData(res.data.product);
                    setSelectedImage(res.data.product.image?.[0] || '');
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                console.error(err);
                setError('Failed to fetch product data');
            } finally {
                setLoading(false);
            }
        };
        if (productId) fetchProduct();
    }, [productId, backendUrl]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!reviewText.trim()) {
            return toast.error('Please write a comment before submitting.', {
                position: "top-right",
                autoClose: 3000,
                className: "bg-red-100 text-red-800 rounded-lg shadow-md",
                progressClassName: "bg-red-600",
            });
        }   
        if (!token) {
            return toast.error('You must be logged in to leave a review.', {
                position: "top-right",
                autoClose: 3000,
                className: "bg-red-100 text-red-800 rounded-lg shadow-md",
                progressClassName: "bg-red-600",
            });
        }

        const formData = new FormData();
        formData.append('productId', productId);
        formData.append('comment', reviewText);
        formData.append('username', user?.name || 'Anonymous');
        formData.append('imageUrl', user?.imageUrl || '');
        if (reviewImage) {
            formData.append('reviewImage', reviewImage);
        }

        try {
            const response = await axios.post(
                `${backendUrl}/api/product/reviews/add`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                toast.success("Review submitted!", {
                    position: "top-right",
                    autoClose: 3000,
                    className: "bg-pink-100 text-pink-800 rounded-lg shadow-md",
                    progressClassName: "bg-pink-600",
                });
                
                const updatedProductRes = await axios.post(`${backendUrl}/api/product/single`, { productId });
                if (updatedProductRes.data.success) {
                    setProductData(updatedProductRes.data.product);
                }

                setReviewText('');
                setReviewImage(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            } else {
                toast.error(response.data.message || 'Review submission failed.', {
                    position: "top-right",
                    autoClose: 3000,
                    className: "bg-red-100 text-red-800 rounded-lg shadow-md",
                    progressClassName: "bg-red-600",
                });
            }
        } catch (err) {
            console.error("Review submission error:", err.response?.data || err.message);
            toast.error('Failed to submit review.', {
                position: "top-right",
                autoClose: 3000,
                className: "bg-red-100 text-red-800 rounded-lg shadow-md",
                progressClassName: "bg-red-600",
            });
        }
    };

    const handleLikeReview = async (reviewId) => {
        if (!token) {
            toast.error('Please log in to like reviews.', {
                position: "top-right",
                autoClose: 3000,
                className: "bg-red-100 text-red-800 rounded-lg shadow-md",
                progressClassName: "bg-red-600",
            });
            return;
        }

        setProductData((prev) => ({
            ...prev,
            reviews: prev.reviews.map((rev) =>
                rev._id === reviewId ? { ...rev, likeCount: rev.likeCount + 1 } : rev
            ),
        }));

        try {
            await axios.post(
                `${backendUrl}/api/product/reviews/like`,
                { productId, reviewId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (err) {
            console.error("Like review error:", err.response?.data || err.message);
            toast.error('Failed to like review.', {
                position: "top-right",
                autoClose: 3000,
                className: "bg-red-100 text-red-800 rounded-lg shadow-md",
                progressClassName: "bg-red-600",
            });
            setProductData((prev) => ({
                ...prev,
                reviews: prev.reviews.map((rev) =>
                    rev._id === reviewId ? { ...rev, likeCount: rev.likeCount - 1 } : rev
                ),
            }));
        }
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error('Please select a size before adding to cart.', {
                position: "top-right",
                autoClose: 3000,
                className: "bg-red-100 text-red-800 rounded-lg shadow-md",
                progressClassName: "bg-red-600",
            });
            return;
        }

        addToCart(productData._id, selectedSize);
        toast.success(`${productData.name} (Size: ${selectedSize}) added to cart!`, {
            position: "top-right",
            autoClose: 3000,
            className: "bg-pink-100 text-pink-800 rounded-lg shadow-md",
            progressClassName: "bg-pink-600",
        });
    };

    if (loading) return <div className="text-center p-10">Loading product details...</div>;
    if (error) return <div className="text-center text-red-500 p-10">{error}</div>;
    if (!productData) return null;

    // Calculate net value and discount
    const originalPrice = parseFloat(productData.price) || 0;
    const discount = parseFloat(productData.discount) || 0;
    const netValue = originalPrice - (originalPrice * discount / 100);

    return (
        <div className="border-t-2 pt-10">
            {/* Product Layout */}
            <div className="flex gap-12 flex-col md:flex-row">
                {/* Images */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18.7%] w-full">
                        {productData.image?.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                onClick={() => setSelectedImage(img)}
                                className={`cursor-pointer border-2 sm:mb-3 w-[24%] sm:w-full ${selectedImage === img ? 'border-pink-500' : 'border-transparent'}`}
                                alt={`Product image ${i + 1}`}
                            />
                        ))}
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img src={selectedImage || 'https://placehold.co/400x400/E0E0E0/9E9E9E?text=No+Image'} className="w-full h-auto" alt={productData.name} />
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h1 className="font-medium text-2xl">{productData.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        <img src={assets.star_icon} alt="Star rating" className="w-4" />
                        <span className="pl-2 text-gray-600">({productData.reviews?.length || 0} Reviews)</span>
                    </div>
                    <div className="mt-4">
                        {discount > 0 ? (
                            <div className="flex items-center gap-3">
                                <span className="text-xl font-semibold text-pink-600">{currency}{netValue.toFixed(2)}</span>
                                <span className="text-lg text-red-500 line-through">{currency}{originalPrice.toFixed(2)}</span>
                                <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                    <img src="https://placehold.co/20x20/4CAF50/FFFFFF?text=%" alt="Discount icon" className="w-4 h-4" />
                                    <span className="text-sm font-medium">{discount}% OFF</span>
                                </div>
                            </div>
                        ) : (
                            <span className="text-xl font-semibold">{currency}{originalPrice.toFixed(2)}</span>
                        )}
                    </div>
                    <p className="text-gray-600 mt-4">{productData.description}</p>

                    {/* Size Selection */}
                    <div className="mt-6">
                        <p className="mb-2 font-medium">Select Size</p>
                        <div className="flex gap-2 flex-wrap">
                            {productData.sizes?.map((size, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedSize(size)}
                                    className={`border px-3 py-1 rounded ${selectedSize === size ? 'border-pink-500 bg-gray-200' : 'bg-gray-100'}`}
                                    aria-label={`Select size ${size}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={!selectedSize}
                        className="mt-6 bg-black text-white px-4 py-2 rounded hover:bg-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        aria-label="Add to cart"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Tabs: Description / Reviews */}
            <div className="mt-20">
                <div className="flex border-b">
                    <span
                        className={`px-5 py-3 cursor-pointer text-sm ${activeTab === 'description' ? 'border-b-2 border-black' : ''}`}
                        onClick={() => setActiveTab('description')}
                        role="tab"
                        aria-selected={activeTab === 'description'}
                        aria-controls="description-panel"
                    >
                        Description
                    </span>
                    <span
                        className={`px-5 py-3 cursor-pointer text-sm ${activeTab === 'reviews' ? 'border-b-2 border-black' : ''}`}
                        onClick={() => setActiveTab('reviews')}
                        role="tab"
                        aria-selected={activeTab === 'reviews'}
                        aria-controls="reviews-panel"
                    >
                        Reviews ({productData.reviews?.length || 0})
                    </span>
                </div>

                <div className="p-6 border border-t-0" id={activeTab === 'description' ? 'description-panel' : 'reviews-panel'}>
                    {activeTab === 'description' ? (
                        <p className="text-sm text-gray-600">{productData.description}</p>
                    ) : (
                        <>
                            {/* Review List */}
                            <div className="mb-6">
                                {productData.reviews?.length > 0 ? (
                                    productData.reviews.map((review) => (
                                        <div key={review._id} className="mb-4 pb-4 border-b last:border-none">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={review.imageUrl || assets.profile_icon}
                                                    alt={review.username}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <div>
                                                    <p className="font-semibold">{review.username}</p>
                                                    <p className="text-xs text-gray-400">{formatDate(review.createdAt)}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm mt-2 text-gray-700">{review.comment}</p>
                                            {review.reviewImage && (
                                                <div className="mt-2">
                                                    <img
                                                        src={review.reviewImage}
                                                        alt="Review"
                                                        className="w-full max-w-xs rounded border"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => handleLikeReview(review._id)}
                                                    className="text-gray-500 hover:text-pink-600"
                                                    aria-label={`Like review by ${review.username}`}
                                                >
                                                    👍
                                                </button>
                                                <span className="text-sm">{review.likeCount}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews yet. Be the first to write one!</p>
                                )}
                            </div>

                            {/* Write a Review */}
                            {token && (
                                <form onSubmit={handleReviewSubmit} aria-label="Write a review form">
                                    <h3 className="font-semibold text-lg mb-2">Write a Review</h3>
                                    <textarea
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        className="w-full border rounded p-2 mb-3"
                                        placeholder="Share your thoughts..."
                                        rows={4}
                                        aria-label="Review text"
                                    />
                                    <div className="mb-3">
                                        <label htmlFor="review-image-upload" className="cursor-pointer text-sm text-pink-600 hover:underline">
                                            {reviewImage ? `Selected: ${reviewImage.name}` : "Add a photo (optional)"}
                                        </label>
                                        <input
                                            ref={fileInputRef}
                                            id="review-image-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setReviewImage(e.target.files[0])}
                                            className="hidden"
                                            aria-label="Upload review image"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-black text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors"
                                        aria-label="Submit review"
                                    >
                                        Submit Review
                                    </button>
                                </form>
                            )}
                        </>
                    )}
                </div>
            </div>

            <RelatedProducts
                category={productData.category}
                subCategory={productData.subCategory}
            />
        </div>
    );
};

export default Product;