import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface Item {
    setEmailValue?: (value: string) => void;
}

const EmailSearchFilter = ({ setEmailValue }: Item) => {
    const getNameValue = (input: React.ChangeEvent<HTMLInputElement>) => {
        if (setEmailValue) {
          setEmailValue(input.target.value);
        }
      };
    
      return (
        <div id="user_filter_input">
          <Input
            placeholder="Search by Email ..."
            onChange={getNameValue}
            prefix={<SearchOutlined />}
            allowClear
          />
        </div>
    );
}

export default EmailSearchFilter;
