import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./SearchFilter.scss";

interface Item {
  setNameValue?: (value: string) => void;
}

const SearchFilter = ({ setNameValue }: Item) => {
  const { t } = useTranslation();
  
  const getNameValue = (input: React.ChangeEvent<HTMLInputElement>) => {
    if (setNameValue) {
      setNameValue(input.target.value);
    }
  };

  return (
    <div id="filter_input">
      <Input
        placeholder={t('search_by')}
        onChange={getNameValue}
        prefix={<SearchOutlined />}
        allowClear
      />
    </div>
  );
};

export default SearchFilter;
