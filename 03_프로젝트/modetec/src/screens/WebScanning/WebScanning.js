import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FeedbackIcon from '@mui/icons-material/Feedback';
import './WSStyle.css';
import ItemPage from './ItemPage';

const Title = Styled.div`
  padding-top: 40px;
  padding-left: 10px;
`;

const Sidebar = Styled.div`
  width: 230px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  position: fixed;
  left: 250px;
  top: 75px;
  bottom: 10px;
`;

const ContentWrapper = Styled.div`
  position: absolute;
  top: 0;
  left: 240px; /* Always open, so set to a fixed value */
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

export const WebScanning = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    // 아이템 목록을 가져오는 비동기 로직을 작성하고 itemList 상태 업데이트
    fetch('http://52.79.201.187:8080/agents')
      .then(response => response.json())
      .then(data => {
        const infoMap = data.info.map;
        const newItems = Object.keys(infoMap).map(key => {
          const url = `http://3.36.169.149:5601/app/dashboards#/view/aa4a4aa0-379e-11ee-9fc5-9ddfb64e9cde?embed=true&_g=(time:(from:now-24h%2Fh,to:now))&_a=(filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'metricbeat-*',key:host.hostname,negate:!f,params:(query:${infoMap[key]}),type:phrase),query:(match_phrase:(host.hostname:${infoMap[key]})))))&hide-filter-bar=true`;
          return {
            name: key,
            nameValue: infoMap[key],
            url: url,
          };
        });
        setItemList(newItems);
      })
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  return (
    < div className='rContainer' >
      <Title>
        <h5 style={{ fontWeight: 'bold' }}>Web Vulnerabilty Scanning</h5>
      </Title>
      <div className='rCenter' style={{ position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ paddingLeft: '200px', paddingTop: '340px' }}>
            <FeedbackIcon color='disabled' sx={{ fontSize: 40 }} />
          </div>
          <h4 style={{ paddingLeft: '200px', paddingTop: '10px', color: 'grey' }}>Click a server in the list</h4>
        </div>

        <Sidebar>
          <h5 style={{ padding: '15px' }}>Server List</h5>
          {itemList.map(item => (
            <div className='AccordionButton' key={item.name} onClick={() => setSelectedItem(item)}>
              {item.name} <br /> ({item.nameValue})
            </div>
          ))}
        </Sidebar>

        <ContentWrapper>
          {selectedItem && <ItemPage selectedItem={selectedItem.nameValue} />}
        </ContentWrapper>
      </div>
    </div >
  );
}

export default WebScanning;
