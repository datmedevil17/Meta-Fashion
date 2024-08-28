import React, { useEffect, useState } from 'react';
import { createClient } from 'urql';

const Home = () => {
  const [tokens, setTokens] = useState([]);
  const QueryURL = "https://api.studio.thegraph.com/query/87423/metafashion/v0.1";
  const query =  `{
    designUploaded(id: "") {
      amount
      blockNumber
      blockTimestamp
      category
      creator
      id
      name
      price
      royalty
      tokenId
      transactionHash
    }
  }`;
  
  const client = createClient({
    url: QueryURL,
    fetchOptions: {
      headers: {
        'Authorization': `Bearer 2b34fcb4a2fc3519c7c91ee9f5ecf1cc`,
      },
    },
  });

  useEffect(() => {
    const getTokens = async () => {
      const { data } = await client.query(query).toPromise();
      setTokens(data.designUploaded ? [data.designUploaded] : []);
    };
    console.log(client.query(query).toPromise())
    getTokens();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Graph Protocol</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Creator</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Royalty</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Token ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Block Number</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Block Timestamp</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Transaction Hash</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{token.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{token.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{token.category}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{token.creator}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{token.price}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{token.royalty}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{token.amount}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{token.tokenId}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{token.blockNumber}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{token.blockTimestamp}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{token.transactionHash}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
