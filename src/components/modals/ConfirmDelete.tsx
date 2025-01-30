import React from 'react';
import { Button, Modal } from 'antd';
import IMAGES from '@assets/images/images';
import './modals.scss';

interface ConfirmDeleteProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  loading: boolean; 
  deleteItem: string;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ isModalOpen, handleOk, handleCancel, loading, deleteItem }) => {
  return (
    <Modal 
      title=""
      open={isModalOpen} 
      onOk={handleOk} 
      onCancel={handleCancel}
      modalRender={(modal) => (
        <div id="confirm_delete_modal">
          {modal}
        </div>
      )}
      footer={[
        <Button className='confirm_btn' key="submit" type="primary" loading={loading} onClick={handleOk}>
          Delete this item
        </Button>
      ]}
    >
      <div className="img_holder">
        <img src={IMAGES.deleteImg} alt='pic' />
      </div>
      <h3>Delete This Item?</h3>
      <p>Are you sure you want to delete this {deleteItem}? If you are sure, just click on "Delete."</p>
    </Modal>
  );
};

export default ConfirmDelete;
