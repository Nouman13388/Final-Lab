import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryData, setCategoryData] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const categories = [
    'smileys-and-people',
    'animals-and-nature',
    'food-and-drink',
    'travel-and-places',
    'activities',
    'objects',
    'symbols',
    'flags',
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = {};
      for (const category of categories) {
        try {
          const response = await axios.get(`https://emojihub.yurace.pro/api/all/category/${category}`);
          data[category] = response.data;
        } catch (error) {
          data[category] = { error: error.message };
        }
      }
      setCategoryData(data);
    };

    fetchData();
  }, [categories]);

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Categories</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="list-group">
        {filteredCategories.map((category) => (
          <li className="list-group-item" key={category}>
            <Link to={`/details/${category}`}>{category}</Link>
            {categoryData[category]?.error && <span className="text-danger"> - Error: {categoryData[category].error}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
