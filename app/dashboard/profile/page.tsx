import { redirect } from 'next/navigation';

// 프로필 첫 화면은 하단 내용이 비어 보이므로 Information 탭으로 바로 이동
const ProfilePage = () => {
  redirect('/dashboard/profile/information');
};

export default ProfilePage;
