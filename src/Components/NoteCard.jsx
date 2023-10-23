import { Card } from 'antd';
import { showFormattedDate } from '../utils';
import Title from 'antd/es/typography/Title';

export default function NoteCard({
  title,
  actions,
  createdAt,
  body,
  bordered,
}) {
  return (
    <Card
      title={title}
      actions={actions}
      bordered={bordered}
      headStyle={{ backgroundColor: 'gray' }}
    >
      <Title level={5}>{showFormattedDate(createdAt)}</Title>
      <p>{body}</p>
    </Card>
  );
}
