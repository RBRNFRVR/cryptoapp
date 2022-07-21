import React,{ useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'

const { Text, Title } = Typography;
const {Option} = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const {data: cryptosNews } = useGetCryptosNewsQuery({newsCategory, count: simplified? 6 : 12});
  const {data} = useGetCryptosQuery(100);

  if(!cryptosNews?.value) return 'Loading...';

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a News Category"
            optionFilterProp="children"
            onChange={(value)=> setNewsCategory(value)}
            filterOption={(input, option)=> option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
          >
            <Option value="Cryptocurrency">CryptoCurrency</Option>
            {data?.data?.coins.map((coin)=> <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      {cryptosNews.value.map((news, index)=>(
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{ news.name }</Title>
                <img style={{maxWidth: '200px', maxHeight: '100px'}} src={news?.image?.thumbnail?.contentUrl}  alt="news" />
              </div>
              <p>
                {news.description > 50 ? `${news.description.substring(0,50)}...`: news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl}  alt="news"/>
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News