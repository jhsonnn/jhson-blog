import Image from 'next/image';

const Profile = () => {
  return (
    <div className="mb-3">
      <div className="font-bold text-base">Profile</div>

      <div className="text-sm mb-4">
        안녕하세요.
        <br />
        게임회사 주니어 개발PM에서 웹 프론트엔드 개발자로의 전향을 준비하고 있는
        &apos;손지형&apos;입니다.
      </div>
      <div className="relative w-50 h-60 mx-auto overflow-hidden rounded-full">
        <Image
          src={'/images/profile/profile_image.jpg'}
          layout="fill"
          objectFit="cover"
          alt="profile image"
        />
      </div>
    </div>
  );
};

export default Profile;
