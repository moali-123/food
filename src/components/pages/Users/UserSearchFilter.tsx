import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface Item {
    setNameValue?: (value: string) => void;
    //setEmailValue?: (value: string) => void;
}

const UserSearchFilter = ({ setNameValue, setEmailValue }: Item) => {
    const getNameValue = (input: React.ChangeEvent<HTMLInputElement>) => {
        if (setNameValue) {
          setNameValue(input.target.value);
        }
        // else if (setEmailValue) {
        //     setEmailValue(input.target.value);
        // }
      };
    
      return (
        <div id="user_filter_input">
          <Input
            placeholder="Search by name ..."
            onChange={getNameValue}
            prefix={<SearchOutlined />}
            allowClear
          />
        </div>
    );
}

export default UserSearchFilter;
