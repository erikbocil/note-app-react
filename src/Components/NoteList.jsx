import { Col, Divider, Empty, Row } from 'antd';
import NoteCard from './NoteCard';
import { DeleteOutlined, InboxOutlined } from '@ant-design/icons';
import { showFormattedDate } from '../utils';

export default function NoteList({
  query,
  notes,
  handleArchive,
  handleDelete,
  archived,
}) {
  return (
    <>
      <Divider orientation="left" orientationMargin="left">
        {archived ? 'Arsip' : 'Catatan Aktif'}
      </Divider>
      {notes.find(
        (note) =>
          note.archived === archived &&
          (note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.body.toLowerCase().includes(query.toLowerCase())),
      ) ? (
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          {notes
            .filter(
              (note) =>
                note.title.toLowerCase().includes(query.toLowerCase()) ||
                (note.body.toLowerCase().includes(query.toLowerCase()) && note),
            )
            .filter((note) => note.archived === archived)
            .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
            .map((note) => (
              <Col xs={24} sm={12} md={8} lg={6} key={note.id}>
                <NoteCard
                  title={note.title}
                  createdAt={note.createdAt}
                  body={note.body}
                  actions={[
                    <InboxOutlined
                      key="archive"
                      onClick={() => handleArchive(note.id)}
                      title="Archive"
                    />,
                    <DeleteOutlined
                      key="delete"
                      onClick={() => handleDelete(note.id)}
                      title="Delete"
                    />,
                  ]}
                  bordered
                >
                  {showFormattedDate(note.createdAt)}
                  {note.body}
                </NoteCard>
              </Col>
            ))}
        </Row>
      ) : (
        <Empty description="Tidak ada catatan" />
      )}
    </>
  );
}
