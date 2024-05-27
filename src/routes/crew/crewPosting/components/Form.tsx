import React, { ChangeEvent, FormEvent } from 'react';
import styles from './Form.module.scss';
import instance from '../../../../libs/api/axios';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageAdd: () => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  title: string;
  content: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}
const Form = ({
  fileInputRef,
  handleImageAdd,
  handleFileChange,
  title, setTitle,
  content, setContent
}: Props) => {
  const { crewId } = useParams();
  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await instance.post(`/crew/${crewId}/board`)
      console.log(response);
    } catch (error) {
      console.error(error);
    }

  }
  return (
    <>
      <div className={styles.posting__main_container}>
        <div className={styles.posting__backspace}>
          <img src="/icons/Expand_left.png" alt="returnBtn"
            onClick={() => navigate(-1)}
          />
        </div>
        <form className={styles.posting__form} onSubmit={submitHandler}>
          <input className={styles.posting__title} type='text' placeholder='제목을 입력해주세요.' value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className={styles.posting_content} placeholder='내용을 입력해주세요.' value={content} onChange={(e) => setContent(e.target.value)} />
          <input
            className={styles.posting__input_img}
            ref={fileInputRef}
            type='file'
            multiple
            onChange={handleFileChange}
          />
          <button
            type="button"
            className={styles.posting__img_btn}
            onClick={handleImageAdd}
          >
            <img src="/icons/Img_box.png" alt="upload icon" />
          </button>
          <button className={styles.posting__btn} type='submit'>등록하기</button>
        </form>
      </div>
    </>

  );
}
export default Form
