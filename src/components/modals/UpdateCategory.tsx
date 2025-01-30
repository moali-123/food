import React, { ReactNode } from 'react';
import { Modal } from 'antd';
import './modals.scss';

interface ConfirmDeleteProps {
  isModalOpen: boolean;
  //handleOk: () => void;
  handleCancel: () => void;
  modalContent: ReactNode;
}

const UpdateCategory: React.FC<ConfirmDeleteProps> = ({ isModalOpen, handleCancel, modalContent }) => {
  return (
    <Modal 
      title=""
      open={isModalOpen} 
      //onOk={handleOk} 
      onCancel={handleCancel}
      modalRender={(modal) => (
        <div id="update_catug_modal">
          {modal}
        </div>
      )}
      footer={[]}
    >
      <h3>update modal</h3>
      {modalContent}
    </Modal>
  );
};

export default UpdateCategory;
