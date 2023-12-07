import React, { useState, useEffect } from 'react';
import { InputComponent } from '../InputComponent';
import { LongButtonComponent } from '../LongButtonComponent';
import { RecommendGenreComponent } from '../RecommendGenreComponent';
import {
  StyledChoiceButton,
  StyledSelectedGenre,
  StylePasswordToggleIcon,
} from '../SignUpComponent/styles';
import { StyledPasswordWrapper } from './styles';
import { User } from '../../types';
import { useNavigate } from 'react-router-dom';

interface EditComponentProps {
  profile?: User;
  onUpdate?: (updatedInfo: {
    userPassword: string;
    userNickname: string;
    userPreference: string[];
  }) => Promise<void>;
}

export default function EditComponent({
  profile,
  onUpdate,
}: EditComponentProps) {
  const navigate = useNavigate();

  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);
  const openGenreModal = () => setIsGenreModalOpen(true);
  const closeGenreModal = () => setIsGenreModalOpen(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string[]>(
    profile?.userPreference || [],
  );
  const [userPassword, setUserPassword] = useState(profile?.userPassword || '');
  const [userNickname, setUserNickname] = useState(profile?.userNickname);

  useEffect(() => {
    if (userPassword !== verifyPassword && verifyPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [userPassword, verifyPassword]);

  if (!profile) {
    return <p>no profile</p>;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleGenreSelect = (selectedGenre: string[]) => {
    setSelectedGenre(selectedGenre);
  };
  const handleClick = () => {
    if (userPassword !== verifyPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const updatedInfo = {
      userPassword: userPassword,
      userNickname: userNickname!,
      userPreference: selectedGenre,
    };
    if (onUpdate) {
      onUpdate(updatedInfo);
      navigate('/');
    }
  };
  return (
    <>
      <label className="block mb-2 text-lg font-bold text-gray-900">
        이메일
      </label>
      <div className="mb-6">{profile.userEmail}</div>
      <StyledPasswordWrapper>
        <InputComponent
          id={profile._id}
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호를 입력하세요"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <StylePasswordToggleIcon
          src="./img/view-password.png"
          alt="비밀번호 보기"
          onClick={togglePasswordVisibility}
        />
      </StyledPasswordWrapper>
      <StyledPasswordWrapper>
        <InputComponent
          id={profile._id}
          label="비밀번호 재확인"
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호를 재입력하세요"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
        />
        <StylePasswordToggleIcon
          src="./img/view-password.png"
          alt="비밀번호 보기"
          onClick={togglePasswordVisibility}
        />
        {passwordError && (
          <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>
        )}
      </StyledPasswordWrapper>
      <InputComponent
        id={profile._id}
        label="닉네임"
        type="text"
        onChange={(e) => setUserNickname(e.target.value)}
        value={userNickname}
      />
      <div className="flex mb-2">
        <label className="block text-lg font-bold text-gray-900">
          음악 취향
        </label>
        <StyledChoiceButton onClick={openGenreModal}>
          고르러 가기
        </StyledChoiceButton>
      </div>

      {selectedGenre.length > 0 && (
        <div style={{ position: 'relative', width: '100%' }}>
          <StyledSelectedGenre>
            {selectedGenre.map((item) => {
              return <>{`${item}, `}</>;
            })}
          </StyledSelectedGenre>
        </div>
      )}
      <RecommendGenreComponent
        isOpen={isGenreModalOpen}
        onClose={closeGenreModal}
        onSelect={handleGenreSelect}
      />
      <LongButtonComponent text={'변경하기'} onClick={handleClick} />
    </>
  );
}
