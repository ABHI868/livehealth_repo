import React from "react";
import { List} from 'antd';

// const IconText = ({ type, text }) => (
//     <span>
//       <Icon type={type} style={{ marginRight: 8 }} />
//       {text}
//     </span>
//   );

const Note=(props)=>
{
    return (
    <List
        itemLayout="vertical"
        size="large"
        pagination={{
        onChange: (page) => {
            console.log(page);
        },
        pageSize: 3,
        }}
        dataSource={props.data}
        renderItem={item => (

        <List.Item
            key={item.note_title}
        >
            <List.Item.Meta
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
            />
            Note_Title:         {item.note_title}<br/>
            Note_description:   {item.note_description}<br/>
            Note_created_date:  {item.note_created_date}<br/>
            Receiver_id:        {item.receiver}<br/>
            Receiver_firstname: {item.receiver_details.first_name}
        </List.Item>
        )}
    />
);
}


export default Note;