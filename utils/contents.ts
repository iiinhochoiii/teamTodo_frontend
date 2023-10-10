import { Content } from '@/interfaces/models/content';

export const groupContent = (contents: Content[]) => {
  const groupData = contents.reduce(
    (
      groups: {
        [filed: string]: Content[];
      },
      item
    ) => {
      const date = new Date(item.createdAt);
      date.setDate(date.getDate() + 1);
      date.setHours(0, 0, 0, 0); // 시간 정보 제거
      const formattedDate = date.toISOString().split('T')[0];

      if (!groups[formattedDate]) {
        groups[formattedDate] = [];
      }

      groups[formattedDate].push(item);
      return groups;
    },
    {}
  );

  return groupData;
};
