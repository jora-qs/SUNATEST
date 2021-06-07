import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
// import PostContent from "./PostContent";
// import AddPost from "./AddPost";

function Position(props) {
  const {
    selectPosition
    // EmojiTextArea,
    // ImageCropper,
    // Dropzone,
    // DateTimePicker,
    // pushMessageToSnackbar,
    // posts,
    // setPosts
  } = props;
  // const [isAddPostPaperOpen, setIsAddPostPaperOpen] = useState(false);

  // const openAddPostModal = useCallback(() => {
  //   setIsAddPostPaperOpen(true);
  // }, [setIsAddPostPaperOpen]);

  // const closeAddPostModal = useCallback(() => {
  //   setIsAddPostPaperOpen(false);
  // }, [setIsAddPostPaperOpen]);

  useEffect(() => {
    selectPosition();
  }, [selectPosition]);

  // if (isAddPostPaperOpen) {
  //   return <AddPost
  //     onClose={closeAddPostModal}
  //     EmojiTextArea={EmojiTextArea}
  //     ImageCropper={ImageCropper}
  //     Dropzone={Dropzone}
  //     DateTimePicker={DateTimePicker}
  //     pushMessageToSnackbar={pushMessageToSnackbar}
  //   />
  // }
  return <div>Position</div>;
}

Position.propTypes = {
  // EmojiTextArea: PropTypes.elementType,
  // ImageCropper: PropTypes.elementType,
  // Dropzone: PropTypes.elementType,
  // DateTimePicker: PropTypes.elementType,
  // posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  // setPosts: PropTypes.func.isRequired,
  // pushMessageToSnackbar: PropTypes.func,
  selectPosition: PropTypes.func.isRequired
};

export default Position;
