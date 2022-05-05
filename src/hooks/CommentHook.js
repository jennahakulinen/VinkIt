import {useState} from 'react';

const useCommentForm = (callback) => {
  const [inputs, setInputs] = useState({
    file_id: '',
    comment: '',
  });

  const handleSubmitComment = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChangeComment = (event) => {
    event.persist();
    setInputs((inputs) => {
      return {
        ...inputs,
        [event.target.name]: event.target.value,
      };
    });
  };

  return {
    handleSubmitComment,
    inputs,
    handleInputChangeComment,
  };
};

export default useCommentForm;
