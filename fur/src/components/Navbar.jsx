import React, { useContext, useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showCollectionDropdown, setShowCollectionDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
    products,
  } = useContext(ShopContext);
  const dropdownRef = useRef(null);
  const collectionRef = useRef(null);
  const timeoutRef = useRef(null);
  const searchRef = useRef(null);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  // Categories and Subcategories
  const categories = [
    { name: 'Chair', subCategories: ['Cushion', 'Timber', 'Plastic'] },
    { name: 'Table', subCategories: ['Timber', 'Glass', 'Plastic'] },
    { name: 'Bed', subCategories: ['Cushion', 'Timber'] },
    { name: 'Cupboard', subCategories: ['Timber', 'Glass'] },
  ];

  // Filter products for collection dropdown
  const getFilteredProducts = (category, subCategory) => {
    let filtered = products;
    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }
    if (subCategory) {
      filtered = filtered.filter((item) => item.subCategory === subCategory);
    }
    return filtered;
  };

  // Filter products for search autocomplete
  const getSearchSuggestions = () => {
    if (!searchQuery.trim()) return [];
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5); // Limit to 5 suggestions
  };

  // Handle category/subcategory click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory === selectedSubCategory ? null : subCategory);
  };

  // Handle product click in dropdown
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setShowCollectionDropdown(false);
    setVisible(false);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setShowSearch(false);
    setSearchQuery('');
  };

  // Handle mouse enter/leave for collection dropdown
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowCollectionDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowCollectionDropdown(false);
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    }, 300);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collection?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  // Handle search suggestion click
  const handleSuggestionClick = (productId) => {
    navigate(`/product/${productId}`);
    setShowSearch(false);
    setSearchQuery('');
  };

  // Close dropdowns and search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        collectionRef.current &&
        !collectionRef.current.contains(event.target)
      ) {
        setShowCollectionDropdown(false);
        setSelectedCategory(null);
        setSelectedSubCategory(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle Escape key to close search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowSearch(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-36" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-pink-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
        </NavLink>
        <li
          className="relative"
          ref={collectionRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1"
            onClick={() => setShowCollectionDropdown(!showCollectionDropdown)}
            aria-expanded={showCollectionDropdown}
            aria-haspopup="true"
          >
            <p>COLLECTION</p>
          </NavLink>
          {showCollectionDropdown && (
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-lg shadow-xl z-20 w-96 sm:w-[600px] border border-gray-200"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 p-6 border-b sm:border-b-0 sm:border-r border-gray-200">
                  {categories.map((category, index) => (
                    <div key={category.name} className={`mb-3 ${index < categories.length - 1 ? 'border-b border-gray-100 pb-3' : ''}`}>
                      <button
                        onClick={() => handleCategoryClick(category.name)}
                        className={`w-full text-left py-2 px-4 font-semibold text-gray-800 hover:bg-pink-50 rounded-md transition-colors text-base ${
                          selectedCategory === category.name ? 'bg-pink-50' : ''
                        }`}
                        aria-label={`Toggle ${category.name} subcategories`}
                        tabIndex={0}
                      >
                        {category.name}
                      </button>
                      {selectedCategory === category.name && (
                        <div className="ml-4 mt-2 flex flex-col gap-2">
                          {category.subCategories.map((subCategory) => (
                            <button
                              key={subCategory}
                              onClick={() => handleSubCategoryClick(subCategory)}
                              className={`text-sm text-left py-1.5 px-4 hover:text-pink-700 hover:bg-pink-50 rounded-md transition-colors ${
                                selectedSubCategory === subCategory ? 'bg-pink-50 text-pink-700' : 'text-gray-600'
                              }`}
                              aria-label={`Show ${subCategory} products`}
                              tabIndex={0}
                            >
                              {subCategory}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="w-full sm:w-1/2 p-6 max-h-96 overflow-y-auto">
                  {selectedCategory ? (
                    getFilteredProducts(selectedCategory, selectedSubCategory).length > 0 ? (
                      getFilteredProducts(selectedCategory, selectedSubCategory).map((product, index) => (
                        <button
                          key={product._id}
                          onClick={() => handleProductClick(product._id)}
                          className={`flex justify-between items-center gap-4 p-3 hover:bg-pink-50 rounded-md w-full text-left transition-colors ${
                            index < getFilteredProducts(selectedCategory, selectedSubCategory).length - 1 ? 'border-b border-gray-100' : ''
                          }`}
                          aria-label={`View ${product.name}`}
                          tabIndex={0}
                        >
                          <p className="text-base font-medium text-gray-800 truncate max-w-[250px] sm:max-w-[400px]">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">{`LKR ${product.price}`}</p>
                        </button>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic">No products available</p>
                    )
                  ) : (
                    <p className="text-sm text-gray-500 italic">Select a category</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </li>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative" ref={searchRef}>
          <img
            onClick={() => setShowSearch(!showSearch)}
            src={assets.search}
            className="w-5 cursor-pointer"
            alt="Search"
            aria-label="Toggle search"
          />
          {showSearch && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-20 border border-gray-200">
              <div className="p-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
                  placeholder="Search products..."
                  className="w-full px-3 py-2 text-sm text-gray-800 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-700"
                  aria-label="Search products"
                  autoFocus
                />
                {searchQuery.trim() && getSearchSuggestions().length > 0 && (
                  <div className="mt-2 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md">
                    {getSearchSuggestions().map((product) => (
                      <button
                        key={product._id}
                        onClick={() => handleSuggestionClick(product._id)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-800 hover:bg-pink-50 transition-colors"
                        aria-label={`View ${product.name}`}
                        tabIndex={0}
                      >
                        <p className="truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">{`LKR ${product.price}`}</p>
                      </button>
                    ))}
                  </div>
                )}
                {searchQuery.trim() && getSearchSuggestions().length === 0 && (
                  <p className="text-sm text-gray-500 italic p-2">No results found</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Login/User Icon with dropdown */}
        <div className="group relative">
          <img
            src={assets.login}
            alt="User-Account"
            onClick={() => !token && navigate('/login')}
            className="w-5 cursor-pointer"
            aria-label={token ? 'User menu' : 'Login'}
          />
          {token && (
            <div className="group-hover:block hidden absolute right-0 pt-4 z-10">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-pink-100 text-gray-500 rounded shadow">
                <p className="cursor-pointer hover:text-black" onClick={() => navigate('/profile')}>
                  My Profile
                </p>
                <p
                  onClick={() => navigate('/myorders')}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-black"
                >
                  Log Out
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative" aria-label="View cart">
          <img src={assets.cart} alt="Cart" className="w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-3 text-center leading-3 bg-black text-white aspect-square rounded-full text-[6px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
          aria-label="Open menu"
        />
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`absolute top-10 left-0 right-0 bg-white transition-all duration-300 overflow-hidden ${
          visible ? 'h-auto py-4' : 'h-0'
        }`}
      >
        <div className="flex flex-col text-black">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-6 cursor-pointer"
            aria-label="Close menu"
          >
            <img className="h-4 rotate-180" src={assets.back} alt="Back" />
            <span>Back</span>
          </div>
          <NavLink
            to="/"
            className="py-2 pl-6 hover:bg-pink-200"
            onClick={() => setVisible(false)}
          >
            Home
          </NavLink>
          <div className="py-2 pl-6">
            <NavLink
              to="/collection"
              className="w-full text-left hover:bg-pink-200 block"
              onClick={() => setShowCollectionDropdown(!showCollectionDropdown)}
              aria-expanded={showCollectionDropdown}
              aria-label="Toggle collection menu"
            >
              Collection
            </NavLink>
            {showCollectionDropdown && (
              <div className="pl-4 flex flex-col gap-2 mt-2">
                {categories.map((category, index) => (
                  <div key={category.name} className={`mb-3 ${index < categories.length - 1 ? 'border-b border-gray-100 pb-3' : ''}`}>
                    <button
                      onClick={() => handleCategoryClick(category.name)}
                      className={`w-full text-left py-2 px-4 font-semibold text-gray-800 hover:bg-pink-50 rounded-md transition-colors text-base ${
                        selectedCategory === category.name ? 'bg-pink-50' : ''
                      }`}
                      aria-label={`Toggle ${category.name} subcategories`}
                      tabIndex={0}
                    >
                      {category.name}
                    </button>
                    {selectedCategory === category.name && (
                      <div className="pl-4 mt-2 flex flex-col gap-2">
                        {category.subCategories.map((subCategory) => (
                          <button
                            key={subCategory}
                            onClick={() => handleSubCategoryClick(subCategory)}
                            className={`text-sm text-left py-1.5 px-4 hover:text-pink-700 hover:bg-pink-50 rounded-md transition-colors ${
                              selectedSubCategory === subCategory ? 'bg-pink-50 text-pink-700' : 'text-gray-600'
                            }`}
                            aria-label={`Show ${subCategory} products`}
                            tabIndex={0}
                          >
                            {subCategory}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {selectedCategory && (
                  <div className="pl-4 mt-2">
                    <div className="max-h-96 overflow-y-auto">
                      {getFilteredProducts(selectedCategory, selectedSubCategory).length > 0 ? (
                        getFilteredProducts(selectedCategory, selectedSubCategory).map((product, index) => (
                          <button
                            key={product._id}
                            onClick={() => handleProductClick(product._id)}
                            className={`flex justify-between items-center gap-4 p-3 hover:bg-pink-50 rounded-md w-full text-left transition-colors ${
                              index < getFilteredProducts(selectedCategory, selectedSubCategory).length - 1 ? 'border-b border-gray-100' : ''
                            }`}
                            aria-label={`View ${product.name}`}
                            tabIndex={0}
                          >
                            <p className="text-base font-medium text-gray-800 truncate max-w-[250px]">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500">{`LKR ${product.price}`}</p>
                          </button>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 italic">No products available</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <NavLink
            to="/about"
            className="py-2 pl-6 hover:bg-pink-200"
            onClick={() => setVisible(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="py-2 pl-6 hover:bg-pink-200"
            onClick={() => setVisible(false)}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;