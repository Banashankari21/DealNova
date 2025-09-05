import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (product && product.category) {
        try {
          const res = await fetch(`https://dummyjson.com/products/category/${product.category}`);
          const data = await res.json();
          const otherProducts = data.products.filter(p => p.id !== parseInt(id));
          setRecommendations(otherProducts.slice(0, 4));
        } catch (err) {
          console.error('Error fetching recommendations:', err);
        }
      }
    };
    fetchRecommendations();
  }, [product, id]);

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  if (!product) return <div className="text-center text-white mt-10">Loading...</div>;

  const galleryImages = product.images
    ? product.images.map(img => ({
        original: img,
        thumbnail: img,
      }))
    : [
        {
          original: product.thumbnail,
          thumbnail: product.thumbnail,
        }
      ];

  return (
    <div className="bg-[#f3f4f6] text-gray-800 min-h-screen px-4 py-8 flex flex-col items-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded shadow p-6 mb-10">
        {/* 🔷 Product Image Gallery */}
        <div>
          <ImageGallery
            items={galleryImages}
            showPlayButton={false}
            showFullscreenButton={true}
          />
        </div>

        {/* 🔷 Product Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

          <div className="flex items-center mb-2">
            <span className="text-yellow-400 mr-2">★ {product.rating}</span>
            <span className="text-sm text-gray-600">({product.stock} available)</span>
          </div>

          <p className="text-xl text-green-600 font-bold mb-2">${product.price}</p>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Select Size:</label>
            <div className="flex space-x-2">
              {['S', 'M', 'L', 'XL'].map(size => (
                <button
                  key={size}
                  className="border border-gray-400 rounded px-3 py-1 hover:bg-gray-200"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Select Color:</label>
            <div className="flex space-x-2">
              {['Red', 'Black', 'White'].map(color => (
                <div
                  key={color}
                  className={`w-6 h-6 rounded-full border-2 border-gray-400 cursor-pointer`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                ></div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4">
            <p className="font-semibold">Special Offer:</p>
            <p>Get 10% off on orders above $100. Use code: <span className="font-bold">FASHION10</span></p>
          </div>

          <p className="mb-4">{product.description}</p>

          <button
            onClick={handleAddToCart}
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition w-full md:w-1/2"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* 🔷 Recommendations */}
      <div className="max-w-5xl w-full">
        <h2 className="text-2xl font-bold mb-4">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-white text-gray-800 p-4 rounded shadow hover:scale-105 transition transform duration-200 cursor-pointer"
              onClick={() => navigate(`/product/${rec.id}`)}
            >
              <img
                src={rec.thumbnail}
                alt={rec.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <p className="text-sm font-semibold">{rec.title}</p>
              <p className="text-green-600 font-bold">${rec.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
