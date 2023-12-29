import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAllEmojis } from '../redux/metricsSlice'; 
import Table from 'react-bootstrap/Table';

const Details = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { allEmojis, isLoadingAll, errorAll } = useSelector((state) => state.metrics);

  useEffect(() => {
    dispatch(fetchAllEmojis(category)); 
  }, [dispatch, category]);

  const groupEmojis = (emojis) => {
    const groupedEmojis = {};
    emojis.forEach((emoji) => {
      if (!groupedEmojis[emoji.group]) {
        groupedEmojis[emoji.group] = [];
      }
      groupedEmojis[emoji.group].push(emoji);
    });
    return groupedEmojis;
  };

  const groupedEmojis = groupEmojis(allEmojis);

  return (
    <div>
      <h2>Emojis for Category: {category}</h2>
      {isLoadingAll ? (
        <p>Loading...</p>
      ) : errorAll ? (
        <p>Error: {errorAll}</p>
      ) : (
        <div>
          {Object.keys(groupedEmojis).map((group) => (
            <div key={group}>
              <h3>{group}</h3>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedEmojis[group].map((emoji) => (
                    <tr key={emoji.unicode}>
                      <td>{emoji.name}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Details;
