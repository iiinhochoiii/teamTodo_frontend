import React from 'react';
import { DashboardCard } from '@/components/organisms';
import { useQuery } from '@tanstack/react-query';
import { getContent } from '@/apis/content';
import * as S from './style';

const DashBoardComponent = () => {
  const { isLoading, isError, data, error } = useQuery(
    ['contents'],
    getContent,
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  // const [data22] = useState(
  //   Array.from({ length: 10 }, (_, index) => index + 1)
  // );

  // const test = {
  //   id: 0,
  //   userName: '최인호',
  //   createdAt: '2022-04-25 09:00:00',
  //   data: {
  //     t: [
  //       { title: 'today test data1' },
  //       { title: 'today test data2' },
  //       { title: 'today test data3' },
  //     ],
  //     y: [
  //       { title: 'yesterday test data1' },
  //       { title: 'yesterday test data2' },
  //       { title: 'yesterday test data3' },
  //     ],
  //   },
  // };

  // const [items, setItems] = useState(
  //   data22.map((d) => {
  //     return {
  //       ...test,
  //       id: d,
  //     };
  //   })
  // );

  // remove Card
  // const remove = (id: number) => {
  //   console.log(id);
  //   if (window.confirm('작성하신 내용을 삭제하시겠습니까?')) {
  //     setItems((item) => item.filter((i) => i.id !== id));
  //   }
  // };

  // const add = (data: { id: number; dataType: string; title: string }) => {
  //   const { id, dataType, title } = data;
  //   if (id) {
  //     setItems(
  //       items.map((item) => {
  //         if (item.id === id) {
  //           return {
  //             ...item,
  //             data: {
  //               t:
  //                 dataType === 'today'
  //                   ? [...item.data.t, { title: title }]
  //                   : [...item.data.t],
  //               y:
  //                 dataType === 'yesterday'
  //                   ? [...item.data.y, { title: title }]
  //                   : [...item.data.y],
  //             },
  //           };
  //         } else {
  //           return {
  //             ...item,
  //           };
  //         }
  //       })
  //     );
  //   }
  // };

  // const update = (data: {
  //   id: number;
  //   dataType: string;
  //   title: string;
  //   updateId: number;
  // }) => {
  //   const { id, dataType, title, updateId } = data;
  //   if (id) {
  //     setItems(
  //       items.map((item) => {
  //         if (item.id === id) {
  //           return {
  //             ...item,
  //             data: {
  //               t:
  //                 dataType === 'today'
  //                   ? item.data.t.map((i, index) =>
  //                       index === updateId ? { ...i, title: title } : { ...i }
  //                     )
  //                   : [...item.data.t],
  //               y:
  //                 dataType === 'yesterday'
  //                   ? item.data.y.map((i, index) =>
  //                       index === updateId ? { ...i, title: title } : { ...i }
  //                     )
  //                   : [...item.data.y],
  //             },
  //           };
  //         } else {
  //           return {
  //             ...item,
  //           };
  //         }
  //       })
  //     );
  //   }
  // };

  // const removeItems = (data: {
  //   id: number;
  //   dataType: string;
  //   updateId: number;
  // }) => {
  //   const { id, dataType, updateId } = data;

  //   if (id) {
  //     setItems(
  //       items.map((item) => {
  //         if (item.id === id) {
  //           return {
  //             ...item,
  //             data: {
  //               t:
  //                 dataType === 'today'
  //                   ? item.data.t.filter((_, index) => updateId !== index)
  //                   : [...item.data.t],
  //               y:
  //                 dataType === 'yesterday'
  //                   ? item.data.y.filter((_, index) => updateId !== index)
  //                   : [...item.data.y],
  //             },
  //           };
  //         } else {
  //           return {
  //             ...item,
  //           };
  //         }
  //       })
  //     );
  //   }
  // };

  if (!data) return <>test</>;

  return (
    <S.Container>
      {data.map((item) => (
        <DashboardCard
          key={item.id}
          item={item}
          remove={(id: number) => console.log(id)}
          add={(data: { id: number; dataType: string; title: string }) =>
            console.log(data)
          }
          update={(data: {
            id: number;
            dataType: string;
            title: string;
            updateId: number;
          }) => console.log(data)}
          removeItems={(data: {
            id: number;
            dataType: string;
            updateId: number;
          }) => console.log(data)}
        />
      ))}
    </S.Container>
  );
};

export default DashBoardComponent;
