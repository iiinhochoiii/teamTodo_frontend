import React, { useState } from 'react';
import { DashboardCard } from '@/components/organisms';
import { Container } from './style';

const DashBoardComponent = () => {
  const [data, setData] = useState(
    Array.from({ length: 10 }, (_, index) => index + 1)
  );

  const test = {
    id: 0,
    userName: '최인호',
    createdAt: '2022-04-25 09:00:00',
    data: {
      t: [
        { title: 'today test data1' },
        { title: 'today test data2' },
        { title: 'today test data3' },
      ],
      y: [
        { title: 'yesterday test data1' },
        { title: 'yesterday test data2' },
        { title: 'yesterday test data3' },
      ],
    },
  };

  const remove = (id: number) => {
    if (window.confirm('작성하신 내용을 삭제하시겠습니까?')) {
      setData((item) => item.filter((i) => i !== id));
    }
  };

  return (
    <Container>
      {data.map((item) => (
        <DashboardCard
          key={item}
          item={{ ...test, id: item }}
          remove={(id: number) => remove(id)}
        />
      ))}
    </Container>
  );
};

export default DashBoardComponent;
