import React from 'react';

interface CatugTitleSectionProps {
  showAddModal: () => void;
}

const CatugTitleSection: React.FC<CatugTitleSectionProps> = ({ showAddModal }) => {
  return (
    <div className="title_bx">
      <div className="text">
        <h3>Categories Table Details</h3>
        <p>You can check all details</p>
      </div>

      <button className="add_btn" onClick={showAddModal}>Add New Category</button>
    </div>
  )
}

export default CatugTitleSection